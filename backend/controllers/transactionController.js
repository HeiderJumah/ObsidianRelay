const transactionModel = require("../models/transactionModel");

exports.getUserTransactions = (req, res) => {
  const userId = req.user.id;

  transactionModel.getTransactionsByUser(userId, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};