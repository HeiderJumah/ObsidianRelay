const db = require("../config/database");

exports.createTransaction = (userId, itemId, quantity, price, type, callback) => {
  const sql = `
    INSERT INTO transactions (user_id, item_id, quantity, price, type)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [userId, itemId, quantity, price, type], callback);
};

exports.getTransactionsByUser = (userId, callback) => {
  const sql = `
    SELECT t.*, items.title
    FROM transactions t
    JOIN items ON t.item_id = items.id
    WHERE t.user_id = ?
    ORDER BY t.created_at DESC
  `;

  db.query(sql, [userId], callback);
};