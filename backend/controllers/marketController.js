const marketModel = require("../models/marketModel");
const inventoryModel = require("../models/inventoryModel");
const transactionModel = require("../models/transactionModel");

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
  const { item_id, quantity } = req.body;

  const buyQuantity = quantity || 1;

  marketModel.getItemPrice(item_id, (err, itemResult) => {
    if (err) return res.status(500).json(err);
    if (itemResult.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    const pricePerItem = itemResult[0].price;
    const totalPrice = pricePerItem * buyQuantity;

    marketModel.getUserGold(userId, (err, userResult) => {
      if (err) return res.status(500).json(err);

      const userGold = userResult[0].gold;

      if (userGold < totalPrice) {
        return res.status(400).json({ message: "Not enough gold" });
      }

      const newGold = userGold - totalPrice;

      // Gold updaten
      marketModel.updateUserGold(userId, newGold, (err) => {
        if (err) return res.status(500).json(err);

        // Item ins Inventory
        inventoryModel.addItem(userId, item_id, buyQuantity, (err) => {
          if (err) return res.status(500).json(err);

          // TRANSACTION 
          transactionModel.createTransaction(
            userId,
            item_id,
            buyQuantity,
            totalPrice,
            "buy",
            (err) => {
              if (err) console.error("Transaction error:", err);
            }
          );

          res.json({
            message: "Item purchased",
            quantity: buyQuantity,
            gold_left: newGold,
          });
        });
      });
    });
  });
};

// 🔹 Item verkaufen
exports.sellItem = (req, res) => {
  const userId = req.user.id;
  const { item_id, quantity } = req.body;

  const sellQuantity = quantity || 1;

  if (!item_id) {
    return res.status(400).json({ message: "item_id is required" });
  }

  if (sellQuantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  // Inventory holen
  inventoryModel.getInventoryByUser(userId, (err, inventory) => {
    if (err) return res.status(500).json(err);

    const item = inventory.find(i => i.item_id === item_id);

    if (!item) {
      return res.status(404).json({ message: "Item not in inventory" });
    }

    if (item.quantity < sellQuantity) {
      return res.status(400).json({ message: "Not enough quantity" });
    }

    // Preis berechnen (50%)
    const sellPricePerItem = Math.floor(item.price * 0.5);
    const totalSellPrice = sellPricePerItem * sellQuantity;

    // Item entfernen
    inventoryModel.removeItem(userId, item_id, sellQuantity, (err) => {
      if (err) return res.status(500).json(err);

      // Gold holen
      marketModel.getUserGold(userId, (err, userResult) => {
        if (err) return res.status(500).json(err);

        const currentGold = userResult[0].gold;
        const newGold = currentGold + totalSellPrice;

        // Gold updaten
        marketModel.updateUserGold(userId, newGold, (err) => {
          if (err) return res.status(500).json(err);

          // TRANSACTION 
          transactionModel.createTransaction(
            userId,
            item_id,
            sellQuantity,
            totalSellPrice,
            "sell",
            (err) => {
              if (err) console.error("Transaction error:", err);
            }
          );

          res.json({
            message: "Item sold",
            quantity: sellQuantity,
            earned: totalSellPrice,
            gold_left: newGold,
          });
        });
      });
    });
  });
};