// models/Teacher.js

const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: String,

    address: String,

    qualification: String,

    experience: Number,

    skills: String,

    teachingExperience: String,

    courses: String,

    availability: String,

    timing: String,

    portfolio: String,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);