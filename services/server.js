require('dotenv').config();
const express = require("express");
const connectDB = require("../config/database");
const syncAssets = require('../cron/syncAssets');

const app = express();

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server is running...');
});


syncAssets();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

