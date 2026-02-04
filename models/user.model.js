import express from "express";
import Blog from "./Blog.js";  // ✅ .js extension 
const router = express.Router();


/* ===========================
   Create Blog (POST)
=========================== */
router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({
      message: "Blog Created Successfully",
      data: blog
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ===========================
   Get All Blogs (GET)
=========================== */
router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

/* ===========================
   Get Single Blog (GET)
=========================== */
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

/* ===========================
   Update Blog (PUT)
=========================== */
router.put("/:id", async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({
    message: "Blog Updated Successfully",
    data: updated
  });
});

/* ===========================
   Delete Blog (DELETE)
=========================== */
router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({
    message: "Blog Deleted Successfully"
  });
});

export default router;
