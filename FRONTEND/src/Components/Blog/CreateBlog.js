import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../../services/blogService';
import { AuthContext } from '../../context/AuthContext';
import ReactQuill from 'react-quill'; // You'll need to install this package
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    coverpic: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // Redirect if not authenticated - now using useEffect to handle this
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Please login to create a blog' } });
    }
  }, [isAuthenticated, navigate]);

  // Predefined categories
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Specific handler for the rich text editor
  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      content
    });
    
    if (errors.content) {
      setErrors({
        ...errors,
        content: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const blog = await createBlog(formData);
      setIsSubmitting(false);
      
      // Redirect to the newly created blog
      navigate(`/blogs/${blog._id}`);
    } catch (err) {
      setSubmitError('Failed to create blog. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h1 className="text-center mb-4">Create New Article</h1>
          
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
                    isInvalid={!!errors.category}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
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
                {isSubmitting ? 'Publishing...' : 'Publish Article'}
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/blogs')}
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

export default CreateBlog;