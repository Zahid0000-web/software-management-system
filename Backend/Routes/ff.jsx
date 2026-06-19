// server.js

const path = require("path");
const dns = require("dns");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

/* ================= ROUTES ================= */

const teacherRoutes = require("./Routes/Teacher-routes");
const studentRoutes = require("./Routes/StudentRoutes");
const studentRoutes = require("./Routes/Addblog");


/* ================= ENV ================= */

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

/* ================= DNS FIX ================= */

if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

const mongoUri = process.env.MONGO_URI?.trim();

/* mongodb+srv DNS FIX */

if (
  mongoUri?.startsWith("mongodb+srv://") &&
  process.env.MONGO_SKIP_PUBLIC_DNS !== "1"
) {
  dns.setServers(["8.8.4.4", "1.1.1.1"]);
}

/* ================= APP ================= */

const app = express();

app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */

mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 15000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error");
    console.log(err.message);
  });

/* ================= API ROUTES ================= */

app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/Addblog", );
/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
  res.send("Server Running...");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});