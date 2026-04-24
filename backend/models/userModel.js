// userModel.js - User-Datenbankzugriff

const db = require("../config/database");

// User-Model: Alle Funktionen rund um User-Datenbankzugriff
exports.createUser = (user, callback) => {
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [user.username, user.email, user.password], callback);
};

// Find user by login (email OR username - case-sensitive via Collation)
exports.findUserByLogin = (login, callback) => {
  const sql = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(sql, [login, login], callback);
};

// Find user by ID
exports.getUserById = (userId, callback) => {
  const sql = `SELECT * FROM users WHERE id = ?`;
  db.query(sql, [userId], callback);
};

