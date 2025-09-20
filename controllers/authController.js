const bcrypt = require("bcrypt");
const db = require("../config/db");

// ------------------ SIGNUP ------------------
exports.signup = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (email, name, password) VALUES (?, ?, ?)";

    db.query(query, [email, name, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "User already exists or DB error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error during signup" });
  }
};

// ------------------ LOGIN ------------------
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: { id: user.user_id, email: user.email, name: user.name },
    });
  });
};