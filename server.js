require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const restaurantRoutes = require('./routes/restaurantRoutes.js');

const app = express();
app.use(express.json()); 

const port = 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(success => {
    console.log('Success Mongodb connection')
  }).catch(err => {
    console.log(err)
    console.log('Error Mongodb connection')
  });

  app.use('/Restaurants', restaurantRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






