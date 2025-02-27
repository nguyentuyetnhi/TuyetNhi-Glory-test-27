const express = require("express");
const connectDB = require("./config/database");

const app = express();

// Kết nối MongoDB
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config();
const express = require('express');
const syncAssets = require('./cron/syncAssets');

app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Khởi động cronjob
syncAssets();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
