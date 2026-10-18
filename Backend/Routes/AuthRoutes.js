const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const fallbackAdminEmail = (process.env.DEFAULT_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
const fallbackAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";

const getFallbackAdmin = async () => ({
  _id: "fallback-admin",
  username: "Admin",
  email: fallbackAdminEmail,
  password: await bcrypt.hash(fallbackAdminPassword, 10),
  avatar: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.json({ success: false, message: "Email and password required" });

    email = String(email).trim().toLowerCase();

    if (mongoose.connection.readyState !== 1) {
      const fallbackAdmin = await getFallbackAdmin();

      if (email !== fallbackAdmin.email)
        return res.json({ success: false, message: "Email not found" });

      const isMatch = await bcrypt.compare(password, fallbackAdmin.password);
      if (!isMatch)
        return res.json({ success: false, message: "Wrong password" });

      const safe = { ...fallbackAdmin };
      delete safe.password;

      return res.json({ success: true, message: "Login successful", admin: safe });
    }

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.json({ success: false, message: "Email not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.json({ success: false, message: "Wrong password" });

    const safe = admin.toObject();
    delete safe.password;

    return res.json({ success: true, message: "Login successful", admin: safe });
  } catch (err) {
    console.error("Login error:", err);
    return res.json({ success: false, message: "Server Error" });
  }
});

// ================= UPDATE PROFILE =================
router.put("/update-profile", async (req, res) => {
  try {
    const { adminId, username, email } = req.body;

    if (!adminId || !username || !email)
      return res.json({ success: false, message: "All fields required" });

    const emailExists = await Admin.findOne({
      email: email.trim().toLowerCase(),
      _id: { $ne: adminId },
    });

    if (emailExists)
      return res.json({ success: false, message: "Email already in use" });

    const updated = await Admin.findByIdAndUpdate(
      adminId,
      { username: username.trim(), email: email.trim().toLowerCase() },
      { new: true }
    );

    if (!updated)
      return res.json({ success: false, message: "Admin not found" });

    const safe = updated.toObject();
    delete safe.password;

    return res.json({ success: true, message: "Profile updated", admin: safe });
  } catch (err) {
    return res.json({ success: false, message: "Server Error" });
  }
});

// ================= CHANGE PASSWORD =================
router.put("/change-password", async (req, res) => {
  try {
    const { adminId, currentPassword, newPassword } = req.body;

    if (!adminId || !currentPassword || !newPassword)
      return res.json({ success: false, message: "All fields required" });

    if (newPassword.length < 6)
      return res.json({ success: false, message: "Password must be at least 6 characters" });

    const admin = await Admin.findById(adminId);
    if (!admin)
      return res.json({ success: false, message: "Admin not found" });

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch)
      return res.json({ success: false, message: "Current password is wrong" });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    return res.json({ success: false, message: "Server Error" });
  }
});

// ================= GET ADMIN =================
router.get("/me/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin)
      return res.json({ success: false, message: "Admin not found" });

    return res.json({ success: true, admin });
  } catch (err) {
    return res.json({ success: false, message: "Server Error" });
  }
});

module.exports = router;