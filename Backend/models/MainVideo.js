// models/MainVideo.js
const mongoose = require("mongoose");

const mainVideoSchema = new mongoose.Schema(
  {
    videoBase64: { type: String, required: true }, // Local storage path
    overlayText: { type: String }, // Text to display over video
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "Admin",
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MainVideo", mainVideoSchema);
