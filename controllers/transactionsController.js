const Transaction = require('../models/Transaction');

exports.listTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = '', month } = req.query;
  const searchRegex = new RegExp(search, 'i');
  const monthNumber = month ? new Date(`${month} 1, 2000`).getMonth() + 1 : null;

  try {
    let query = {};

    // If month is provided, filter by that month
    if (monthNumber) {
      query.dateOfSale = {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
      };
    }

    // Add search criteria
    query.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { price: search } // Directly use search value for price if it's a regex pattern
    ];

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const total = await Transaction.countDocuments(query);

    res.status(200).json({ transactions, total, page, perPage });
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transactions', error: err.message });
  }
};
