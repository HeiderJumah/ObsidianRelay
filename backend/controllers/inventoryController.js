const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

exports.getInventory = (req, res) => {
  const userId = req.user.id;

  inventoryModel.getInventoryByUser(userId, (err, inventoryResults) => {
    if (err) return res.status(500).json(err);

    userModel.getUserById(userId, (err, userResults) => {
      if (err) return res.status(500).json(err);

      res.json({
        gold: userResults[0].gold,
        inventory: inventoryResults
      });
    });
  });
};

exports.addItem = (req, res) => {
    const userId = req.user.id;
    const { item_id, quantity } = req.body;

    inventoryModel.addItem(userId, item_id, quantity, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item added" });
    });
};

exports.removeItem = (req, res) => {
    const userId = req.user.id;
    const { item_id } = req.body;

    inventoryModel.removeItem(userId, item_id, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item removed" });
    });
};