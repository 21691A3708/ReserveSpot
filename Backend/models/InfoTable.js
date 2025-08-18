// models/InfoTable.js
const mongoose = require("mongoose");

const infoTableSchema = new mongoose.Schema({
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  squareFootage: { type: Number, required: true },
  lotSize: { type: String, required: true }, // e.g., "60x120 ft"
  amenities: [{ type: String }],
  soldPrice: { type: Number, required: true },
});

module.exports = mongoose.model("InfoTable", infoTableSchema);
