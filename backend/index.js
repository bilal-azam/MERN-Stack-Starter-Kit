// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.listen(5000, () => console.log('Server running on port 5000'));
