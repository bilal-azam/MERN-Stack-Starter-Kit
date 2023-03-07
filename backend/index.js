// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const redisClient = redis.createClient();

const app = express();

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
redisClient.on('error', (err) => console.log('Redis error: ', err));

app.use(express.json());

app.get('/cache', (req, res) => {
  redisClient.get('key', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
