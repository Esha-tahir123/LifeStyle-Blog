import jwt from 'jsonwebtoken';

// Environment variable for JWT secret (same as in controller)
const JWT_SECRET = process.env.JWT_SECRET || '0eb0c543e7e8739c6177fa7facb16a830c16f8f997e0be32c61574a7238a55620d620cf8bf91fd98fd84211abf593d974064da0f06afd6665695549e6baf1656'  ; // Change in production!

export const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user id to request object
    req.userId = decoded.id;
    
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;