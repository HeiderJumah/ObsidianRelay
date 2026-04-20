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

// 🔹 Item verkaufen
exports.sellItem = (req, res) => {
    console.log("NEUE SELL FUNKTION AKTIV");
    const userId = req.user.id;
    const { item_id, quantity } = req.body;

    // Default = 1
    const sellQuantity = quantity || 1;

    if (!item_id) {
        return res.status(400).json({ message: "item_id is required" });
    }

    if (sellQuantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    // 1. Inventory holen
    inventoryModel.getInventoryByUser(userId, (err, inventory) => {
        if (err) return res.status(500).json(err);

        const item = inventory.find(i => i.item_id === item_id);

        if (!item) {
            return res.status(404).json({ message: "Item not in inventory" });
        }

        if (item.quantity < sellQuantity) {
            return res.status(400).json({ message: "Not enough quantity" });
        }

        // 2. Preis berechnen
        const sellPricePerItem = Math.floor(item.price * 0.5);
        const totalSellPrice = sellPricePerItem * sellQuantity;

        // 3. Item entfernen (mit quantity)
        inventoryModel.removeItem(userId, item_id, sellQuantity, (err) => {
            if (err) return res.status(500).json(err);

            // 4. Gold holen
            marketModel.getUserGold(userId, (err, userResult) => {
                if (err) return res.status(500).json(err);

                const currentGold = userResult[0].gold;
                const newGold = currentGold + totalSellPrice;

                // 5. Gold updaten
                marketModel.updateUserGold(userId, newGold, (err) => {
                    if (err) return res.status(500).json(err);

                    res.json({
                        message: "Item sold",
                        quantity: sellQuantity,
                        earned: totalSellPrice,
                        gold_left: newGold
                    });
                });
            });
        });
    });
};