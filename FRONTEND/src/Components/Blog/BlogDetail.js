import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBlogById, deleteBlog } from '../../services/blogService';
import { AuthContext } from '../../context/AuthContext';

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await getBlogById(id);
        setBlog(fetchedBlog);
      } catch (err) {
        setError('Failed to load blog. It may have been removed or is unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    
    try {
      await deleteBlog(id);
      navigate('/blogs', { state: { message: 'Blog has been deleted successfully' } });
    } catch (err) {
      setError('Failed to delete blog. Please try again.');
      setDeleteConfirm(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(false);
  };

  // Check if user is the author of the blog
  const isAuthor = user && blog && user.id === blog.author;

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button as={Link} to="/blogs" variant="outline-primary">
          Back to Blogs
        </Button>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container className="py-5">
        <Alert variant="info">Blog not found</Alert>
        <Button as={Link} to="/blogs" variant="outline-primary">
          Back to Blogs
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm">
        {blog.coverpic && (
          <div className="text-center">
            <img 
              src={blog.coverpic} 
              alt={blog.title} 
              className="img-fluid rounded-top" 
              style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }} 
            />
          </div>
        )}
        
        <Card.Body className="p-4">
          <Row className="mb-3">
            <Col>
              <h1 className="mb-3">{blog.title}</h1>
              <div className="d-flex mb-4 text-muted">
                <div className="me-3">
                  <i className="bi bi-person-circle me-2"></i>
                  {blog.authorName || 'Anonymous'}
                </div>
                <div className="me-3">
                  <i className="bi bi-calendar3 me-2"></i>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
                {blog.category && (
                  <div>
                    <i className="bi bi-tag me-2"></i>
                    {blog.category}
                  </div>
                )}
              </div>
            </Col>
          </Row>
          
          {/* Blog content rendered as HTML */}
          <Row>
            <Col>
              <div 
                className="blog-content" 
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </Col>
          </Row>
        </Card.Body>
        
        <Card.Footer className="bg-white border-0 p-4">
          <Row>
            <Col>
              <Button 
                as={Link} 
                to="/blogs" 
                variant="outline-secondary"
              >
                Back to Blogs
              </Button>
            </Col>
            
            {isAuthor && (
              <Col className="text-end">
                {!deleteConfirm ? (
                  <>
                    <Button 
                      as={Link} 
                      to={`/edit-blog/${id}`} 
                      variant="outline-success"
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="me-2">Are you sure?</span>
                    <Button 
                      variant="danger" 
                      onClick={handleDelete}
                      className="me-2"
                    >
                      Yes, Delete
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={cancelDelete}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Col>
            )}
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default BlogDetail;