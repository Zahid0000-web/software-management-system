const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  detailed: {
    type: String, // Full content ke liye
  },
  category: {
    type: String,
    default: "General",
  },
  imgUrl: {
    type: String, // Image URL
  },
  date: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true // Automatically createdAt aur updatedAt add karega
});

module.exports = mongoose.model("Blog", blogSchema);