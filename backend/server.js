const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bugRoutes = require('./routes/bugRoutes');
const cors = require('cors');
const app = express();

app.use(cors());

dotenv.config();


app.use(express.json());
app.use('/api/bugs', bugRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB Connected');
  
  // only start the server if not in test mode
  if (process.env.NODE_ENV !== 'test') {
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  }
});

module.exports = app;
