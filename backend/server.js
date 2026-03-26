const express = require("express");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// This is a basic Express server setup. It imports the necessary modules, sets up middleware to parse JSON requests, and defines a route for authentication. The server listens on port 3000 for incoming requests.