require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require("path");

let sslConfig;
try {
  sslConfig = {
    ca: fs.readFileSync(path.join(__dirname, 'ca.pem')),
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2'
  };
} catch (err) {
  console.error('❌ Could not load ca.pem:', err.message);
  process.exit(1); 
}

const pool = mysql.createPool({
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

async function initDB() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Connected to Aiven MySQL database (via pool)');
    conn.release();
  } catch (err) {
    console.error('❌ Failed to connect to database:', err.message);
    process.exit(1);
  }
}

initDB();

module.exports = pool;