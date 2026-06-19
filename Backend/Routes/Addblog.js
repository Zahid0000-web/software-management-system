const express = require("express");
const router = express.Router();
const Blog = require("../models/Addblog");

router.get("/", async (req, res) => {
  try {
    // Niche se latest blogs pehle aayengi (descending order)
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST api/blogs
// @desc   Create a new blog
router.post("/", async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    detailed: req.body.detailed,
    category: req.body.category,
    imgUrl: req.body.imgUrl,
    date: req.body.date,
    views: req.body.views
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT api/blogs/:id
// @desc   Update a blog
router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Updated data wapas bhejne ke liye
    );
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/blogs/:id
// @desc   Delete a blog
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;