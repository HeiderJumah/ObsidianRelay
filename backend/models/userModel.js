const db = require("../config/database");

exports.createUser = (user, callback) => {
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [user.username, user.email, user.password], callback);
};

exports.findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

exports.getUserById = (userId, callback) => {
  const sql = `SELECT * FROM users WHERE id = ?`;
  db.query(sql, [userId], callback);
};