// routes/notifications.js
const express = require("express");
const router = express.Router();

// ✅ FIX #1: Sahi model path
const Notification = require("../models/Notification");

/* ================= GET ALL ================= */
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ================= GET UNREAD COUNT ================= */
router.get("/unread", async (req, res) => {
  try {
    const count = await Notification.countDocuments({ read: false });
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ FIX #2: /read-all pehle aaye /:id se pehle
/* ================= MARK ALL AS READ ================= */
router.put("/read-all", async (req, res) => {
  try {
    await Notification.updateMany({}, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ================= MARK ONE AS READ ================= */
router.put("/:id/read", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ================= DELETE ALL ================= */
router.delete("/delete-all", async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ================= DELETE ONE ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;