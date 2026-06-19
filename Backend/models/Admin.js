const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);