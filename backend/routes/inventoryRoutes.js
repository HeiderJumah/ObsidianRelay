const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getInventory);
router.post("/add-item", inventoryController.addItem);
router.post("/remove-item", inventoryController.removeItem);

module.exports = router;
