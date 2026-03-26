const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const JWT_SECRET = "your_secret_key_change_this"; // TODO: Move to .env

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  userModel.createUser(
    { username, email, password: hashedPassword },
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "User created" });
    }
  );
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json("User not found");

    const user = results[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).json("Wrong password");

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h"
    });

    console.log("Token generated:", token); // Debug
    res.json({ message: "Login success", token });
  });
};