const express = require("express");
const router = express.Router();
const marketController = require("../controllers/marketController");

// WICHTIG: Alle Routen hier müssen authentifiziert sein, da sie auf req.user.id zugreifen!
router.get("/npcs", marketController.getAllNpcs);
router.get("/items", marketController.getAllMarketItems);
router.get("/npcs/:npcId/items", marketController.getItemsByNpcId);
router.post("/buy", marketController.buyItem);
router.post("/sell", marketController.sellItem);

module.exports = router;
