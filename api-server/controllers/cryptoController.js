const { getLatestStats, getLast100Prices } = require('../services/cryptoService');
const { calculateStdDeviation } = require('../utils/mathUtils');

const getStats = async (req, res) => {
  try {
    const { coin } = req.query;
    const stat = await getLatestStats(coin);
    if (!stat) return res.status(404).json({ message: 'No data found' });

    res.json({
      price: stat.price,
      marketCap: stat.marketCap,
      '24hChange': stat.change24h
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDeviation = async (req, res) => {
  try {
    const { coin } = req.query;
    const prices = await getLast100Prices(coin);
    if (!prices.length) return res.status(404).json({ message: 'No price data found' });

    const deviation = calculateStdDeviation(prices);
    res.json({ deviation: parseFloat(deviation.toFixed(2)) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStats, getDeviation };
