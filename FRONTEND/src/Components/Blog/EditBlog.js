import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, updateBlog } from '../../services/blogService';
import { AuthContext } from '../../context/AuthContext';
import ReactQuill from 'react-quill'; // You'll need to install this package
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const EditBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    coverpic: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const categories = ['Health', 'Food', 'Fitness', 'Travel', 'Fashion', 'Wellness', 'Productivity', 'Mindfulness'];

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // headers
      ['bold', 'italic', 'underline', 'strike'], // text formatting
      [{ 'list': 'ordered'}, { 'list': 'bullet' }], // lists
      [{ 'align': [] }], // text alignment
      ['link', 'image'], // links and images
      ['clean'] // remove formatting
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Please login to edit blogs' } });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlogById(id);
        setFormData({
          title: blog.title || '',
          content: blog.content || '',
          category: blog.category || '',
          coverpic: blog.coverpic || ''
        });
        setIsLoading(false);
      } catch (err) {
        setSubmitError('Failed to fetch blog details');
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBlog();
    }
  }, [id, isAuthenticated]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      newErrors.content = 'Content is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Specific handler for the rich text editor
  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
    
    if (errors.content) {
      setErrors(prev => ({
        ...prev,
        content: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await updateBlog(id, {
        title: formData.title,
        content: formData.content,
        coverpic: formData.coverpic
        // Category remains unchanged as per your previous implementation
      });
      setIsSubmitting(false);
      navigate(`/blogs/${id}`);
    } catch (err) {
      setSubmitError('Failed to update blog. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="success" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h1 className="text-center mb-4">Edit Article</h1>

          {submitError && (
            <Alert variant="danger">{submitError}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter title"
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Category cannot be changed after publication
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Cover Image URL</Form.Label>
              <Form.Control
                type="text"
                name="coverpic"
                value={formData.coverpic}
                onChange={handleChange}
                placeholder="Enter image URL (optional)"
              />
              <Form.Text className="text-muted">
                Add a URL to an image that represents your article
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Content</Form.Label>
              <div className={errors.content ? 'is-invalid' : ''}>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleEditorChange}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your article here..."
                  style={{ minHeight: '300px', marginBottom: '50px' }}
                />
              </div>
              {errors.content && (
                <div className="invalid-feedback d-block">
                  {errors.content}
                </div>
              )}
            </Form.Group>

            <div className="d-grid gap-2 mt-5">
              <Button
                variant="success"
                type="submit"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate(`/blogs/${id}`)}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditBlog;