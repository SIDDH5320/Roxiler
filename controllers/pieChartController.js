const Transaction = require('../models/Transaction');

exports.getPieChart = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2000}`).getMonth() + 1;

  try {
    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
    });

    const categories = {};

    transactions.forEach(trans => {
      if (!categories[trans.category]) {
        categories[trans.category] = 0;
      }
      categories[trans.category]++;
    });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching pie chart data', error: err.message });
  }
};
