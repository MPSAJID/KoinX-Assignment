const axios = require('axios');
const CryptoStat = require('../models/CryptoStat');

const storeCryptoStats = async () => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

  const { data } = await axios.get(url);

  const coins = ['bitcoin', 'ethereum', 'matic-network'];

  for (let coin of coins) {
    await CryptoStat.create({
      coin,
      price: data[coin].usd,
      marketCap: data[coin].usd_market_cap,
      change24h: data[coin].usd_24h_change,
    });
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
