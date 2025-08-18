// models/Location.js
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  mapLink: { type: String }, // optional: for Google Maps embedding
});

module.exports = mongoose.model("Location", locationSchema);
