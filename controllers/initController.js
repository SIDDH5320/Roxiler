const axios = require('axios');
const Transaction = require('../models/Transaction'); // Assuming Transaction model is defined correctly

exports.initializeDatabase = async (req, res) => {
  try {
    // Fetch data from external JSON API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data; // Assuming the response contains an array of transaction objects

    // Clear existing data in Transaction collection
    await Transaction.deleteMany({});

    // Insert new data into Transaction collection
    await Transaction.insertMany(transactions);

    // Respond with success message
    res.status(200).send({ message: 'Database initialized successfully' });
  } catch (err) {
    // Handle errors and respond with error message
    res.status(500).send({ message: 'Error initializing database', error: err.message });
  }
};
