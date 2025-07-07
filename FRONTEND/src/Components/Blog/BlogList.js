import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { getAllBlogs } from '../../services/blogService';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([
    {
      _id: "dummy1",
      title: "Healthy Living Tips",
      content: "Learn how to maintain a healthy lifestyle with these simple tips...",
      coverpicurl: "https://via.placeholder.com/400x200?text=Healthy+Living",
      category: "Health",
    },
    {
      _id: "dummy2",
      title: "Delicious Summer Recipes",
      content: "Explore some refreshing recipes perfect for summer...",
      coverpicurl: "https://via.placeholder.com/400x200?text=Summer+Recipes",
      category: "Food",
    },
    {
      _id: "dummy3",
      title: "Top Travel Destinations",
      content: "Discover the best places to visit this year...",
      coverpicurl: "https://via.placeholder.com/400x200?text=Travel",
      category: "Travel",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        if (data && Array.isArray(data)) {
          setBlogs((prevBlogs) => [...prevBlogs, ...data]);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load additional blogs from the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading blogs...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Latest Blogs</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Col key={blog._id}>
              <Card className="h-100 shadow-sm">
                {blog.coverpicurl && (
                  <Card.Img 
                    variant="top" 
                    src={blog.coverpicurl} 
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x200?text=Blog+Image";
                    }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>
                    {blog.content.length > 100
                      ? `${blog.content.slice(0, 100)}...`
                      : blog.content}
                  </Card.Text>
                  <Link to={`/blogs/${blog._id}`}>
                    <Button variant="primary">Read More</Button>
                  </Link>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{blog.category}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
        {error && (
          <Alert variant="warning" className="mt-3">
            {error}
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default BlogList;