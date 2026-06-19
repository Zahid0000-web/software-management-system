// routes/teacherRoutes.js

const express = require("express");

const router = express.Router();

const Teacher = require("../models/Teacher");

/* ================= CREATE ================= */

router.post("/", async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);

    res.status(201).json({
      success: true,
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ================= GET ALL ================= */

router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ================= UPDATE STATUS ================= */

router.put("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ================= DELETE ================= */

router.delete("/:id", async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Application Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;