import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Publisher from '../models/publishers.js';

// Environment variable for JWT secret (you should set this in your .env file)
const JWT_SECRET = process.env.JWT_SECRET || '0eb0c543e7e8739c6177fa7facb16a830c16f8f997e0be32c61574a7238a55620d620cf8bf91fd98fd84211abf593d974064da0f06afd6665695549e6baf1656'  ; // Change in production!

// Register a new publisher
export const register = async (req, res) => {
  try {
    const { username, email, password, reppassword } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== reppassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    // Check if user already exists
    const existingUser = await Publisher.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new Publisher({
      username,
      email,
      password: hashedPassword,
      reppassword: hashedPassword // storing hashed version for consistency
    });

    // Save user to database
    await newUser.save();

    // Create token payload
    const payload = {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username
    };

    // Generate JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    // Return user info and token
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await Publisher.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create token payload
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username
    };

    // Generate JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    // Return user info and token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Get current user profile
export const getCurrentUser = async (req, res) => {
  try {
    // User should be available from the auth middleware
    const user = await Publisher.findById(req.userId).select('-password -reppassword');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Server error fetching user profile" });
  }
};