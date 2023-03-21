// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./models/User');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const redisClient = redis.createClient();

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
redisClient.on('error', (err) => console.log('Redis error: ', err));

app.use(express.json());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

app.get('/cache', (req, res) => {
  redisClient.get('key', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get('/data', async (req, res) => {
  const cacheKey = 'data';
  redisClient.get(cacheKey, async (err, data) => {
    if (data) return res.send(JSON.parse(data));

    const freshData = await getDataFromDb(); // replace with actual data fetch logic
    redisClient.setex(cacheKey, 3600, JSON.stringify(freshData));
    res.send(freshData);
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

// Password reset endpoint
app.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found');
  
  const transporter = nodemailer.createTransport({ /* SMTP config */ });
  const resetToken = jwt.sign({ id: user._id }, 'reset-secret', { expiresIn: '1h' });
  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    to: email,
    subject: 'Password Reset',
    html: `Click <a href="${resetUrl}">here</a> to reset your password.`,
  });

  res.send('Password reset email sent');
});

app.listen(5000, () => console.log('Server running on port 5000'));
