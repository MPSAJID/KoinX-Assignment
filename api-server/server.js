require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cryptoRoutes = require('./routes/cryptoRoutes');
const subscribeToRedis = require('./events/subscriber');

const app = express();

app.use(express.json());
app.use('/api', cryptoRoutes);

const PORT = process.env.PORT || 5000;

connectDB();
subscribeToRedis();

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
