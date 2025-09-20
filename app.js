// Load environment variables from .env (or Render environment)
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000; // use Render's PORT if available

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});