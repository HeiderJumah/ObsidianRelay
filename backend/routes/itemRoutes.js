const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Items endpoint - user authenticated", user: req.user });
});

// TODO: Implement item routes
// router.get("/:id", itemController.getItemById);

module.exports = router;
