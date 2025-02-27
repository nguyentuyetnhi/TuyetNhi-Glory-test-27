const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    location_id: Number,
    location_name: String,
    organization: String,
    status: String, // "actived" | "unactive"
});

module.exports = mongoose.model("Location", LocationSchema);
