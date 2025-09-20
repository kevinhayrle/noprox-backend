const mysql = require("mysql2");

const db = mysql.createConnection({
  host: 'mysql-16673040-godwin123.c.aivencloud.com',
  user: 'avnadmin',
  password: process.env.DB_PASSWORD,
  database: "nope_db",
  port: 20134,
  ssl: { rejectUnauthorized: true }
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

module.exports = db;