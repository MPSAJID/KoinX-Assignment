require('dotenv').config();
const startPublisherJob = require('./jobs/publisher');

// Start the job
startPublisherJob();
