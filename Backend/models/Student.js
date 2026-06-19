const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    fatherName: {
      type: String,
      required: true,
    },

    dob: String,

    gender: String,

    cnic: String,

    email: {
      type: String,
      required: true,
    },

    phone: String,

    city: String,

    address: String,

    qualification: String,

    institute: String,

    marks: String,

    passingYear: String,

    course: String,

    duration: String,

    mode: String,

    timing: String,

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

module.exports = mongoose.model("Student", studentSchema);