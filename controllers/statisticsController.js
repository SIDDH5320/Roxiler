const Transaction = require('../models/Transaction');

exports.getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    // Validate and parse month into a number (1 to 12)
    const date = month ? new Date(month) : null;

    if (!date || isNaN(date.getMonth())) {
      return res.status(400).json({ message: 'Invalid month format or value' });
    }

    const monthNumber = date.getMonth() + 1;

    // Construct query to find transactions for the specified month
    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
    });

    // Calculate statistics
    const totalSaleAmount = transactions.reduce((acc, trans) => acc + trans.price, 0);
    const totalSoldItems = transactions.filter(trans => trans.sold).length;
    const totalNotSoldItems = transactions.filter(trans => !trans.sold).length;

    res.status(200).json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (err) {
    res.status(500).send({ message: 'Error fetching statistics', error: err.message });
  }
};
