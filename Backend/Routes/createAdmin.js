const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const mongoUri = process.env.MONGO_URI;
const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@gmail.com";
const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";

console.log("Connecting to MongoDB...");

mongoose
  .connect(mongoUri, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log("✅ MongoDB Connected");
    createAdmin();
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

async function createAdmin() {
  try {
    const existing = await Admin.findOne({ email: adminEmail });

    if (existing) {
      console.log("⚠️  Admin already exists:", adminEmail);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(adminPassword, 10);

    await Admin.create({
      username: "Admin",
      email: adminEmail,
      password: hashed,
    });

    console.log("✅ Admin Created Successfully!");
    console.log("📧 Email:", adminEmail);
    console.log("🔑 Password:", adminPassword);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}