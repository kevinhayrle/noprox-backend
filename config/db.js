const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

let sslConfig;
try {
  sslConfig = {
    ca: fs.readFileSync('ca.pem')
  };
} catch (err) {
  console.error('❌ Could not load ca.pem:', err.message);
  process.exit(1); 
}

const db = mysql.createConnection({
  host: 'mysql-16673040-godwin123.c.aivencloud.com',
  user: 'avnadmin',
  password: process.env.DB_PASSWORD,
  database: "nope_db",
  port: 20134,
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