require("dotenv").config();
const axios = require("axios");
const mongoose = require("mongoose");
const Location = require("../models/Location");

const API_URL = "https://669ce22d15704bb0e304842d.mockapi.io/assets";

// Kết nối MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("MongoDB connection error:", err));

const fetchAndStoreData = async () => {
    try {
        const response = await axios.get(API_URL);
        const data = response.data;

        // Lưu dữ liệu vào MongoDB
        for (const item of data) {
            await Location.findOneAndUpdate(
                { location_id: item.id }, // Tìm theo ID
                {
                    location_id: item.id,
                    location_name: item.name,
                    organization: item.organization,
                    status: item.status.toLowerCase(), // Convert thành "actived" hoặc "unactive"
                },
                { upsert: true, new: true }
            );
        }

        console.log("Data synchronized successfully!");
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        mongoose.connection.close();
    }
};

fetchAndStoreData();
