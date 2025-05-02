
import mongoose from "mongoose";

const publisherStructure = mongoose.Schema({
  username:  String,
  email: String,
  password: String,
  
  reppassword:String,
  
});

const feedbackStructure = mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
   
  },
  
  message: String,
   
  createdAt: {
    type: Date,
    default: Date.now
  }
});

 const Publisher = mongoose.model('Publisher', publisherStructure);
const Feedback = mongoose.model('Feedback', feedbackStructure);

export default  Publisher;
