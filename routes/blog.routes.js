import express from "express";
import Blog from "../models/Blog.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔓 Public
router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// 🔐 Protected
router.post("/", authMiddleware, async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(blog);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
