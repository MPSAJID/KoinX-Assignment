# API Server – KoinX Crypto Stats

This is the main API server that exposes endpoints to retrieve cryptocurrency statistics stored in MongoDB. It also subscribes to updates via Redis Pub/Sub and triggers data collection.

## 📌 Features

- REST API to expose stats.
- Connects to MongoDB to read/write data.
- Subscribes to Redis channel `crypto.update`.
- Calls CoinGecko API to fetch crypto prices.
- Stores prices in MongoDB using Mongoose.

## 📁 Folder Structure

api-server/
│
├── controllers/
├── models/
├── routes/
├── services/
├── config/
└── server.js


## 🚀 Getting Started

```bash
cd api-server
npm install
node index.js
```

## 🌐 API Endpoints

GET /api/crypto/:coin
GET /api/crypto/:coin/history

## 🔌 Environment Variables

Create a .env file with:

PORT=5000
MONGO_URI=<your_mongodb_uri>
REDIS_URL=<your_redis_url>
