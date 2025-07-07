import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllBlogs } from '../../services/blogService';
import './Home.css';

const Home = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([
    {
      _id: "dummy1",
      title: "Healthy Living Guide",
      content: "Tips for a healthier you...",
      coverpicurl: "https://i.pinimg.com/736x/a7/9e/24/a79e247594fc3d059e685296e344476f.jpg",
      category: "Health",
    },
    {
      _id: "dummy2",
      title: "Tasty Recipes",
      content: "Delicious meals to try today...",
      coverpicurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRsouY0K9hAV85TAhEKa6M0hfgh6s00pSJXg&s",
      category: "Food",
    },
    {
      _id: "dummy3",
      title: "Adventure Awaits",
      content: "Explore new travel spots...",
      coverpicurl: "https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?cs=srgb&dl=pexels-julieaagaard-1374064.jpg&fm=jpg",
      category: "Travel",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const data = await getAllBlogs();
        if (data && Array.isArray(data)) {
          setFeaturedBlogs(data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching featured blogs:', err);
        setError('Failed to load featured content from the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const categories = [
    {
      title: "Health & Wellness",
      description: "Discover fitness routines, mental health tips, and wellness practices for a balanced lifestyle.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      link: "/blogs?category=Health",
    },
    {
      title: "Food & Recipes",
      description: "Explore delicious recipes, cooking techniques, and food inspiration from around the world.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      link: "/blogs?category=Food",
    },
    {
      title: "Travel & Adventure",
      description: "Journey through captivating destinations, travel tips, and adventure stories.",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      link: "/blogs?category=Travel",
    },
    {
      title: "Fashion & Style",
      description: "Stay updated with the latest trends, style guides, and fashion inspirations.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      link: "/blogs?category=Fashion",
    },
  ];

  if (loading) {
    return (
      <Container className="py-5 text-center loading-container">
        <Spinner animation="border" variant="primary" className="spinner-lg" />
        <p className="mt-3 loading-text">Loading amazing content for you...</p>
      </Container>
    );
  }

  return (
    <div className="home-wrapper">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Explore Life's Inspirations</h1>
          <p className="hero-subtitle">Discover stories that inspire, inform, and entertain</p>
          <Link to="/blogs">
            <Button variant="light" size="lg" className="hero-button">Begin Your Journey</Button>
          </Link>
        </div>
      </div>

      <Container fluid className="py-5">
        <section className="mb-5">
          <h2 className="section-title text-center mb-4">Featured Stories</h2>
          <Carousel className="featured-carousel" indicators={true}>
            {featuredBlogs.map((blog, index) => (
              <Carousel.Item key={blog._id}>
                <div className="carousel-image-container" style={{ 
                  backgroundImage: `url(${blog.coverpicurl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'})` 
                }}>
                  <div className="carousel-caption">
                    <h3>{blog.title}</h3>
                    <p>{blog.content.substring(0, 120)}...</p>
                    <Link to={`/blogs/${blog._id}`}>
                      <Button variant="light">Read Full Story</Button>
                    </Link>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          {error && (
            <Alert variant="warning" className="mt-3 text-center">
              {error}
            </Alert>
          )}
        </section>

        <motion.section 
          className="categories-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="section-title text-center mb-4">Explore Categories</h2>
          <Row className="g-4">
            {categories.map((category, index) => (
              <Col md={6} lg={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Card className="category-card h-100">
                    <div className="category-img-wrapper">
                      <Card.Img 
                        variant="top" 
                        src={category.image} 
                        className="category-img"
                        alt={category.title}
                      />
                      <div className="category-overlay" />
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="category-title">{category.title}</Card.Title>
                      <Card.Text className="category-description">
                        {category.description}
                      </Card.Text>
                      <div className="mt-auto">
                        <Link to={category.link}>
                          <Button variant="outline-primary" className="category-button">
                            Browse Articles
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.section>
        
        <section className="newsletter-section mt-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="newsletter-container text-center p-4">
                <h3>Stay Updated</h3>
                <p>Subscribe to our newsletter for the latest articles and updates</p>
                <div className="input-group mb-3">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Your email address" 
                    aria-label="Email" 
                  />
                  <Button variant="primary">Subscribe</Button>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Home;