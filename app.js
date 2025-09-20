const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});