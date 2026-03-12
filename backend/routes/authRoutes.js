const express = require("express");
const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.send("Auth API working");
});

module.exports = router;