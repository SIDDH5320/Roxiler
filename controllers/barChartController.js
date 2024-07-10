const Transaction = require('../models/Transaction');

exports.getBarChart = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

  try {
    const transactions = await Transaction.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
    });

    const ranges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0
    };

    transactions.forEach(trans => {
      if (trans.price <= 100) ranges['0-100']++;
      else if (trans.price <= 200) ranges['101-200']++;
      else if (trans.price <= 300) ranges['201-300']++;
      else if (trans.price <= 400) ranges['301-400']++;
      else if (trans.price <= 500) ranges['401-500']++;
      else if (trans.price <= 600) ranges['501-600']++;
      else if (trans.price <= 700) ranges['601-700']++;
      else if (trans.price <= 800) ranges['701-800']++;
      else if (trans.price <= 900) ranges['801-900']++;
      else ranges['901-above']++;
    });

    res.status(200).json(ranges);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching bar chart data', error: err.message });
  }
};
