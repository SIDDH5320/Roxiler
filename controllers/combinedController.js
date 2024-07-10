const { listTransactions } = require('./transactionsController');
const { getStatistics } = require('./statisticsController');
const { getBarChart } = require('./barChartController');
const { getPieChart } = require('./pieChartController');

exports.getCombinedData = async (req, res) => {
  try {
    const transactions = await listTransactions(req, res);
    const statistics = await getStatistics(req, res);
    const barChart = await getBarChart(req, res);
    const pieChart = await getPieChart(req, res);

    res.status(200).json({
      transactions,
      statistics,
      barChart,
      pieChart
    });
  } catch (err) {
    res.status(500).send({ message: 'Error fetching combined data', error: err.message });
  }
};
