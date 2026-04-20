const marketModel = require("../models/marketModel");
const inventoryModel = require("../models/inventoryModel");

// 🔹 Alle Market Items holen
exports.getAllMarketItems = (req, res) => {
  marketModel.getAllMarketItems((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// 🔹 Items von NPC holen
exports.getItemsByNpcId = (req, res) => {
  const npcId = req.params.npcId;

  marketModel.getItemsByNpcId(npcId, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// 🔹 Alle NPCs holen
exports.getAllNpcs = (req, res) => {
    marketModel.getAllNpcs((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// 🔹 Item kaufen
exports.buyItem = (req, res) => {
  const userId = req.user.id;
  const { item_id } = req.body;

  // Preis holen
  marketModel.getItemPrice(item_id, (err, itemResult) => {
    if (err) return res.status(500).json(err);
    if (itemResult.length === 0)
      return res.status(404).json({ message: "Item not found" });

    const price = itemResult[0].price;

    // User Gold holen
    marketModel.getUserGold(userId, (err, userResult) => {
      if (err) return res.status(500).json(err);

      const userGold = userResult[0].gold;

      if (userGold < price) {
        return res.status(400).json({ message: "Not enough gold" });
      }

      const newGold = userGold - price;

      // Gold updaten
      marketModel.updateUserGold(userId, newGold, (err) => {
        if (err) return res.status(500).json(err);

        // Item ins Inventory
        inventoryModel.addItem(userId, item_id, 1, (err) => {
          if (err) return res.status(500).json(err);

          res.json({
            message: "Item purchased",
            gold_left: newGold,
          });
        });
      });
    });
  });
};

// 🔹 TEMP FIX (damit Server nicht crasht)
exports.sellItem = (req, res) => {
  res.json({ message: "sell coming soon" });
};