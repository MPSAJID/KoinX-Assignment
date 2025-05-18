const axios = require('axios');
const CryptoStat = require('../models/CryptoStat');

const storeCryptoStats = async () => {
  try {
    console.log('🔁 Fetching crypto stats from CoinGecko...');

    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price',
      {
        params: {
          ids: 'bitcoin,ethereum,matic-network',
          vs_currencies: 'usd',
          include_market_cap: true,
          include_24hr_change: true,
        },
      }
    );

    const data = response.data;

    console.log('✅ CoinGecko data received:', data);

    const entries = Object.entries(data);

    for (const [coin, stats] of entries) {
      const doc = new CryptoStat({
        coin,
        price: stats.usd,
        marketCap: stats.usd_market_cap,
        change24h: stats.usd_24h_change,
        timestamp: new Date(),
      });

      await doc.save();
      console.log(`💾 Stored stats for ${coin}`);
    }

    console.log('✅ All stats stored successfully');
  } catch (err) {
    console.error('❌ Error in storeCryptoStats:', err.message);
  }
};


const getLatestStats = async (coin) => {
  return await CryptoStat.findOne({ coin }).sort({ createdAt: -1 });
};

const getLast100Prices = async (coin) => {
  const records = await CryptoStat.find({ coin }).sort({ createdAt: -1 }).limit(100);
  return records.map((r) => r.price);
};

module.exports = {
  storeCryptoStats,
  getLatestStats,
  getLast100Prices,
};
