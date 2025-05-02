// src/services/blogService.js
import api from './api';

export const getAllBlogs = async () => {
  try {
    // Use the correct endpoint that matches your backend
    const response = await api.get('/blogs');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    // Format data to match your backend's createblog controller
    const formattedData = {
      title: blogData.title,
      content: blogData.content,
      category: blogData.category,
      coverpic: blogData.coverpicurl // Match backend field name
    };
    
    const response = await api.post('/blogs', formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    // Format data to match your backend's editBlog controller
    const formattedData = {
      title: blogData.title,
      content: blogData.content
    };
    
    const response = await api.put(`/blogs/${id}`, formattedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog with id ${id}:`, error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog with id ${id}:`, error);
    throw error;
  }
};