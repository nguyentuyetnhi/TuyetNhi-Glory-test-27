const mongoose = require('mongoose');
const Asset = require('./models/asset'); // Import model Asset

const MONGO_URI = 'mongodb://127.0.0.1:27017/locations';
//data sample
const sampleAssets = [
    { id: "1", name: "Da Nang", type: "PNS", status: "actived" },
    { id: "2", name: "Ha Noi", type: "PNS", status: "unactive" },
    { id: "3", name: "Ho Chi Minh", type: "PNS", status: "actived" },
    { id: "4", name: "Nha Trang", type: "PLJ", status: "actived" },
    { id: "5", name: "Can Tho", type: "PLJ", status: "actived" }
];


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("connect sccuessful!");


        await Asset.deleteMany();
        console.log("data deleted");


        await Asset.insertMany(sampleAssets);
        console.log("send successful");

        mongoose.connection.close();
    })
    .catch(error => {
        console.error(" connect MongoDB failed:", error);
        mongoose.connection.close();
    });
