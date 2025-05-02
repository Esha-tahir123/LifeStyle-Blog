
import mongoose from "mongoose";

const blogStructure = mongoose.Schema({
    title: String,
    
    content: String,
     
    category:String,
      
  
  coverpicurl:String
  });

  const Blog = mongoose.model('Blog', blogStructure);
export default Blog;
  