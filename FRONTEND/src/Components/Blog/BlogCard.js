import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  // Extract date in a more readable format
  const formattedDate = blog._id 
    ? new Date(parseInt(blog._id.substring(0, 8), 16) * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Unknown date';

  return (
    <Card className="h-100 shadow-sm hover-card border-0">
      <Card.Img 
        variant="top" 
        src={blog.coverpicurl || "/api/placeholder/400/250"} 
        alt={blog.title} 
        className="card-img"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Badge bg="success" className="mb-2">{blog.category}</Badge>
        <Card.Title as={Link} to={`/blog/${blog._id}`} className="text-decoration-none text-dark">
          {blog.title}
        </Card.Title>
        <Card.Text className="text-muted small">{formattedDate}</Card.Text>
        <Card.Text>
          {truncateText(blog.content, 120)}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white border-0">
        <Link to={`/blog/${blog._id}`} className="text-success text-decoration-none">
          Read More <i className="bi bi-arrow-right"></i>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;