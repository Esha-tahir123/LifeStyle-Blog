import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navbar from './Components/Navigation/Navbar';
import Footer from './Components/Layout/Footer';
import ProtectedRoute from './Components/Auth/ProtectedRoute';

// Pages
import Home from './Components/Layout/Home';
import BlogList from './Components/Blog/BlogList';
import BlogDetail from './Components/Blog/BlogDetail';
import CreateBlog from './Components/Blog/CreateBlog';
import EditBlog from './Components/Blog/EditBlog';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/SignUp';
import NotFound from './Components/Layout/NotFound';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <Container className="flex-grow-1 py-3">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes - require authentication */}
              <Route path="/create-blog" element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              } />
              <Route path="/edit-blog/:id" element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
          <Footer />
        </div>
      
    </AuthProvider>
  );
}

export default App;