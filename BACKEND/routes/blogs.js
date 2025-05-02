// Update your backend src/routes/blogs.js
import express from "express";
import { createblog, getBlog, getblog, deleteBlog, editBlog } from "../controllers/blogs.js";

const router = express.Router();

router.get("/", getblog);  // Use getblog (lowercase) for getting all blogs
router.post("/", createblog);
router.get("/:id", getBlog); // Use getBlog (capital B) for single blog
router.delete("/:id", deleteBlog);
router.put("/:id", editBlog);

export default router;