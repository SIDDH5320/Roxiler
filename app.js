const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use('/api', apiRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/product_transactions')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

module.exports = app;
