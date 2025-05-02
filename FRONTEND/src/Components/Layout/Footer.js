import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <h5 className="mb-3 fw-bold">
              <span className="text-success">Lifestyle</span> Blog
            </h5>
            <p className="text-muted">
              Your guide to a healthier, happier, and more fulfilling lifestyle. Discover tips, advice, and inspiration for living your best life.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-muted fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-muted fs-5">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-muted fs-5">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-muted fs-5">
                <i className="bi bi-pinterest"></i>
              </a>
            </div>
          </Col>
          
          <Col md={2}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/blogs" className="text-muted text-decoration-none">Blogs</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-muted text-decoration-none">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-muted text-decoration-none">Contact</Link>
              </li>
            </ul>
          </Col>
          
          <Col md={2}>
            <h5 className="mb-3">Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/category/health" className="text-muted text-decoration-none">Health</Link>
              </li>
              <li className="mb-2">
                <Link to="/category/food" className="text-muted text-decoration-none">Food</Link>
              </li>
              <li className="mb-2">
                <Link to="/category/fitness" className="text-muted text-decoration-none">Fitness</Link>
              </li>
              <li className="mb-2">
                <Link to="/category/travel" className="text-muted text-decoration-none">Travel</Link>
              </li>
            </ul>
          </Col>
          
          <Col md={4}>
            <h5 className="mb-3">Subscribe to Our Newsletter</h5>
            <p className="text-muted">Stay updated with our latest articles and tips.</p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your email address"
                aria-label="Email address"
              />
              <button className="btn btn-success" type="button">Subscribe</button>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <div className="text-center text-muted">
          <p className="mb-0">
            &copy; {currentYear} Lifestyle Blog. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;