const cron = require('node-cron');
const redisClient = require('../config/redisClient');

// Schedule job every 15 minutes
const startPublisherJob = () => {
  cron.schedule('*/15 * * * *', async () => {
    const message = JSON.stringify({ trigger: 'update' });

    try {
      await redisClient.publish('crypto.update', message);
      console.log(`[${new Date().toISOString()}] Published:`, message);
    } catch (err) {
      console.error('Error publishing to Redis:', err);
    }
  });

  console.log('⏱️  Cron job scheduled: Every 15 minutes');
};

module.exports = startPublisherJob;
