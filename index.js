const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/users/userRoutes');
const productRoutes = require('./routes/products/productRoutes');

const app = express();

// CORS
// app.use(cors);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'), res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// PARSING JSON
app.use(express.json());

// ROUTES
app.use('/api', userRoutes);
app.use('/api', productRoutes);

// TEST PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running port ${PORT}`);
});

// CONNECT MONGOOSE
const mongoURL = process.env.MONGODB_URL;
mongoose
  .connect(mongoURL)
  .then(() => console.log('connect mongodb'))
  .catch((error) => console.error('failed to fecth', error));

module.exports = app;
