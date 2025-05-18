# Worker Server – KoinX Crypto Updater

This worker service listens to Redis Pub/Sub (`crypto.update`) and fetches fresh cryptocurrency data from CoinGecko every 15 minutes using a cron job.

## 📌 Features

- Scheduled fetch of crypto stats every 15 minutes.
- Subscribes to `crypto.update` via Redis.
- Stores fetched stats in MongoDB.

## 📁 Folder Structure

worker-server/  
│  
├── config/  
├── services/  
├── cron/  
└── index.js

## 🛠 Setup

```bash
cd worker-server
npm install
node index.js
```  

## 🔌 Environment Variables

Create a .env file with:

MONGO_URI=<your_mongodb_uri>  
REDIS_URL=redis://localhost:6379  

## ⏰ Cron Job

Runs every 15 minutes and publishes crypto.update to Redis.
