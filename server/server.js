// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { MONGO_URI, PORT = 4000 } = process.env;

// Middleware
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// A test endpoint
app.get('/ping', (req, res) => {
  const readyState = mongoose.connection.readyState; 
  // 0 = disconnected, 1 = connected
  res.json({
    status: readyState === 1 ? 'up' : 'down',
    readyState,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
