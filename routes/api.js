const express = require('express');
const router = express.Router();
const { initializeDatabase } = require('../controllers/initController');
const { listTransactions } = require('../controllers/transactionsController');
const { getStatistics } = require('../controllers/statisticsController');
const { getBarChart } = require('../controllers/barChartController');
const { getPieChart } = require('../controllers/pieChartController');
const { getCombinedData } = require('../controllers/combinedController');

router.get('/init', initializeDatabase);
router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChart);
router.get('/pie-chart', getPieChart);
router.get('/combined', getCombinedData);

module.exports = router;
