// Main Express server setup

/* This file sets up the Express server, configures middleware, and defines routes for authentication, inventory management, item handling, and market interactions. 
It also serves static files from the frontend and media directory. The server listens on port 3000 and provides API endpoints for the frontend to interact with. */

const express = require("express");
const cors = require("cors");

// Import routes and middleware
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const itemRoutes = require("./routes/itemRoutes");
const marketRoutes = require("./routes/marketRoutes");
const authMiddleware = require("./middleware/authMiddleware");

// Create Express app
const app = express();
const path = require("path");

// Middleware
app.use(cors());
app.use(express.json());

// Frontend bereitstellen
app.use(express.static(path.join(__dirname, "../frontend")));

// MEDIA ORDNER FREIGEBEN (DAS IST DEIN FIX)
app.use("/media", express.static(path.join(__dirname, "../media")));


// Public routes (auth)
app.use("/api/auth", authRoutes);

// Protected routes (require token)
app.use("/api/inventory", authMiddleware, inventoryRoutes);
app.use("/api/items", authMiddleware, itemRoutes);
app.use("/api/market", authMiddleware, marketRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Auth: POST /api/auth/register, POST /api/auth/login
// Protected routes: All require Authorization header with Bearer tokentaskkill /F /IM node.exe