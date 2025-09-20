require('dotenv').config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

console.log('👋 Noprox backend started');

const allowedOrigins = [
  'https://storied-basbousa-d58741.netlify.app',
  'http://127.0.0.1:5500',
  'http://localhost:5500'
];

const corsOptions = {
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
};

app.use(cors(corsOptions));
app.options(cors(corsOptions));

console.log('✅ CORS configured');

app.use(express.json());
console.log('✅ express.json middleware loaded');

// Routes
app.use("/api/auth", authRoutes);
console.log('✅ Routes registered');

// Health check
app.get('/', (req, res) => {
  res.send('Noprox backend is running ✅');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Noprox backend running on port ${PORT}`);
});