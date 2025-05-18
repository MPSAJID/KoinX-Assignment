const redis = require('redis');
const { storeCryptoStats } = require('../services/cryptoService');

const subscribeToRedis = async () => {
  try {
    const subscriber = redis.createClient({ url: process.env.REDIS_URL });
    
    subscriber.on('error', (err) => console.error('Redis Subscriber Error', err));

    await subscriber.connect();

    await subscriber.subscribe('crypto.update', async (message) => {
      console.log('📩 Received update event:', message);
      await storeCryptoStats();
    });

    console.log('✅ Subscribed to crypto.update channel');
  } catch (err) {
    console.error('❌ Redis Subscription failed:', err);
  }
};

module.exports = subscribeToRedis;
