require('dotenv').config();
const express = require("express");
const connectDB = require("../config/database");
const syncAssets = require('../cron/syncAssets');

const app = express();

connectDB();

app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;



app.get('/', (req, res) => {
    res.send('Server is running...');
});



syncAssets();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

