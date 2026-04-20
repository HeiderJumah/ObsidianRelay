const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const itemRoutes = require("./routes/itemRoutes");
const marketRoutes = require("./routes/marketRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Public routes (auth)
app.use("/api/auth", authRoutes);

// Protected routes (require token)
app.use("/api/inventory", authMiddleware, inventoryRoutes);
app.use("/api/items", authMiddleware, itemRoutes);
app.use("/api/market", authMiddleware, marketRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Auth: POST /api/auth/register, POST /api/auth/login
// Protected routes: All require Authorization header with Bearer tokentaskkill /F /IM node.exe