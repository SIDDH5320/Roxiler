const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection URI
    const mongoURI = 'mongodb://localhost:27017/product_transactions';

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // New URL parser
      useUnifiedTopology: true, // New Server Discover and Monitoring engine
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
