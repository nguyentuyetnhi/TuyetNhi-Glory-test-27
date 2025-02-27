const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  type: String,
  status: String
});

const Asset = mongoose.model('Asset', AssetSchema);

module.exports = Asset;  //
