const db = require("../config/database");

// 🔹 Preis von Item holen
exports.getItemPrice = (itemId, callback) => {
  const sql = `
    SELECT price FROM items WHERE id = ?
  `;
  db.query(sql, [itemId], callback);
};

// 🔹 User Gold holen
exports.getUserGold = (userId, callback) => {
  const sql = `
    SELECT gold FROM users WHERE id = ?
  `;
  db.query(sql, [userId], callback);
};

// 🔹 Gold updaten
exports.updateUserGold = (userId, newGold, callback) => {
  const sql = `
    UPDATE users SET gold = ? WHERE id = ?
  `;
  db.query(sql, [newGold, userId], callback);
};

// 🔹 Alle Market Items holen
exports.getAllMarketItems = (callback) => {
  const sql = `
    SELECT npc_items.*, items.title, items.description, items.price
    FROM npc_items
    JOIN items ON npc_items.item_id = items.id
  `;
  db.query(sql, callback);
};

exports.getItemsByNpcId = (npcId, callback) => {
  const sql = `
    SELECT npc_items.*, items.title, items.description, items.price, items.icon
    FROM npc_items
    JOIN items ON npc_items.item_id = items.id
    WHERE npc_items.npc_id = ?
  `;
  db.query(sql, [npcId], callback);
};

// 🔹 Alle NPCs holen
exports.getAllNpcs = (callback) => {
    const sql = `SELECT * FROM npcs`;
    db.query(sql, callback);
};