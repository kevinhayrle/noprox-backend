const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

let sslConfig;
try {
  sslConfig = {
    ca: fs.readFileSync(path.join(__dirname, 'ca.pem'))
  };
} catch (err) {
  console.error('❌ Could not load ca.pem:', err.message);
  process.exit(1); 
}

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "nope_db",
  port: Number(process.env.DB_PORT) || 20134,
  ssl: sslConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

module.exports = db;