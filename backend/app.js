const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// After middleware
const bugRoutes = require('./routes/bugRoutes');
app.use('/api/bugs', bugRoutes);


// Basic test route
app.get('/', (req, res) => {
  res.send('Bug Tracker API Running');
});

module.exports = app;
