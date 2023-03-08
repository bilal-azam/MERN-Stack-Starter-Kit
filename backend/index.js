// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
const redisClient = redis.createClient();

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
redisClient.on('error', (err) => console.log('Redis error: ', err));

app.use(express.json());

app.get('/cache', (req, res) => {
  redisClient.get('key', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// Register endpoint
app.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).send('Invalid credentials');
  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
  res.send({ token });
});

app.listen(5000, () => console.log('Server running on port 5000'));
