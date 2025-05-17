const redisClient = require('../config/redisClient');
const { storeCryptoStats } = require('../services/cryptoService');

const subscribeToRedis = () => {
  redisClient.subscribe('crypto.update', () => {
    console.log('Subscribed to crypto.update channel');
  });

  redisClient.on('message', async (channel, message) => {
    if (channel === 'crypto.update') {
      console.log('Received update event:', message);
      await storeCryptoStats();
    }
  });
};

module.exports = subscribeToRedis;
