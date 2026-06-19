const Blog = require("../models/Blog");

/* GET ALL */
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ONE */
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CREATE (🔥 FIXED MAIN ISSUE) */
const createBlog = async (req, res) => {
  try {
    console.log("POST BODY:", req.body); // debug

    const { title, description, detailed, category, imgUrl } = req.body;

    if (!title || !description || !detailed || !category || !imgUrl) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const blog = await Blog.create({
      title,
      description,
      detailed,
      category,
      imgUrl,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.log("CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE */
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* DELETE */
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};