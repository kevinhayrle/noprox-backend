const express = require('express');
const cors = require("cors");
require('dotenv').config();

console.log('👋 Backend starting...');

const allowedOrigins = [
  'https://storied-basbousa-d58741.netlify.app',
  'http://127.0.0.1:5500',
  'http://localhost:5500'
];

const authRoutes = require("./routes/authRoutes");

const app = express(); // only declare once
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight OPTIONS requests for all routes
app.options("*", cors({
  origin: allowedOrigins,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

console.log('✅ CORS configured');

app.use(express.json());
console.log('✅ express.json middleware loaded');

// Routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});