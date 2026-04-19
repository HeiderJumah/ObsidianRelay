const db = require("../config/database");

exports.getInventoryByUser = (userId, callback) => {
    const sql = `
        SELECT inventory.*, items.title, items.description, items.price
        FROM inventory
        JOIN items ON inventory.item_id = items.id
        WHERE user_id = ?
    `;
    db.query(sql, [userId], callback);
};

exports.addItem = (userId, itemId, quantity, callback) => {
    const sql = `
        INSERT INTO inventory (user_id, item_id, quantity)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?
    `;
  db.query(sql, [userId, itemId, quantity, quantity], callback);
};

exports.removeItem = (userId, itemId, callback) => {
  
    // 1. Check current quantity
  const checkSql = `
    SELECT quantity FROM inventory
    WHERE user_id = ? AND item_id = ?
  `;

  db.query(checkSql, [userId, itemId], (err, results) => {
    if (err) return callback(err);

    if (results.length === 0) {
      return callback(new Error("Item not found in inventory"));
    }

    const currentQuantity = results[0].quantity;

    // 2. If more than 1 → decrease
    if (currentQuantity > 1) {
      const updateSql = `
        UPDATE inventory
        SET quantity = quantity - 1
        WHERE user_id = ? AND item_id = ?
      `;
      db.query(updateSql, [userId, itemId], callback);
    } 
    // 3. If last item → delete row
    else {
      const deleteSql = `
        DELETE FROM inventory
        WHERE user_id = ? AND item_id = ?
      `;
      db.query(deleteSql, [userId, itemId], callback);
    }
  });
};