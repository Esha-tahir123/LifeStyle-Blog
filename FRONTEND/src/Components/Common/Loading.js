// src/components/Home/Home.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 mb-4">Welcome to Lifestyle Blog</h1>
            <p className="lead mb-4">
              Discover articles on health, fitness, food, travel, and more to enhance your lifestyle.
            </p>
            <Link to="/blogs">
              <Button variant="primary" size="lg">Browse Blogs</Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row xs={1} md={3} className="g-4 mt-4">
        <Col>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Health & Wellness</Card.Title>
              <Card.Text>
                Tips and advice for maintaining a healthy lifestyle and wellness practices.
              </Card.Text>
              <div className="mt-auto">
                <Link to="/blogs?category=Health">
                  <Button variant="outline-primary">Explore</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Food & Recipes</Card.Title>
              <Card.Text>
                Delicious recipes and food inspiration for every occasion.
              </Card.Text>
              <div className="mt-auto">
                <Link to="/blogs?category=Food">
                  <Button variant="outline-primary">Explore</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Travel & Adventure</Card.Title>
              <Card.Text>
                Stories and guides from amazing destinations around the world.
              </Card.Text>
              <div className="mt-auto">
                <Link to="/blogs?category=Travel">
                  <Button variant="outline-primary">Explore</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;