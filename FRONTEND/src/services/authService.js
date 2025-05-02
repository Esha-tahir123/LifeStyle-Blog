// src/services/authService.js
import api from './api';

// Set auth token for subsequent requests
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('authToken', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('authToken');
  }
};

// Register a new user
export const registerPublisher = async (userData) => {
  try {
    const formattedData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      reppassword: userData.confirmPassword
    };
    
    const response = await api.post('/api/auth/register', formattedData);
    
    // Set token in local storage and axios headers
    const { token, user } = response.data;
    setAuthToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    throw new Error(errorMessage);
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    
    // Set token in local storage and axios headers
    const { token, user } = response.data;
    setAuthToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    throw new Error(errorMessage);
  }
};

// Logout user
export const logout = () => {
  setAuthToken(null);
  localStorage.removeItem('user');
};

// Get current user from token
export const getCurrentUser = async () => {
  try {
    // First check local storage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      // Set auth token for API calls
      const token = localStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
        
        // Verify token is still valid by getting updated user info
        try {
          const response = await api.get('/api/auth/me');
          return response.data;
        } catch (err) {
          // Token expired or invalid
          logout();
          return null;
        }
      }
      return JSON.parse(userStr);
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Initialize - check for token and set auth headers on app load
export const initAuth = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    setAuthToken(token);
    return true;
  }
  return false;
};

// Get all publishers (admin function)
export const getAllPublishers = async () => {
  try {
    const response = await api.get('/publishers');
    return response.data;
  } catch (error) {
    console.error('Error fetching publishers:', error);
    throw error;
  }
};

// Delete user (admin function)
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/publishers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};