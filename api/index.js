// Load environment variables
require("dotenv").config();

// Import the Express app
const app = require("../app");

// Export for Vercel serverless function
module.exports = app;