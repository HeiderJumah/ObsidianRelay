const express = require("express");
const router = express.Router();
const marketController = require("../controllers/marketController");

// TEST ROUTE 
router.get("/", (req, res) => {
  res.json({ message: "Market API works" });
});

// NPC Items anzeigen
router.get("/npc-items", marketController.getNPCItems);

// Item kaufen
router.post("/buy", marketController.buyItem);

// Item verkaufen
router.post("/sell", marketController.sellItem);

module.exports = router;
