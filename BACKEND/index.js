import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import publisher from './routes/publisher.js';
import blogs from './routes/blogs.js';
import auth from './routes/auth.js'; // Import new auth routes

// Load environment variables
dotenv.config();

const app = express();

const url = process.env.MONGODB_URI || "mongodb+srv://esha:esha2002@eshakhan.eeh341o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Database connection error:", err));

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Auth routes
app.use("/api/auth", auth);

// User-related routes
app.use("/SignUp", publisher);
app.use("/users", publisher);

// Blog-related routes
app.use("/blogs", blogs);

// Keep existing routes for backward compatibility
app.use("/Publisher", blogs);
app.use("/Reader", blogs);