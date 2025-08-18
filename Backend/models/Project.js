// models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        description: { type: String, default: "" },
        index: { type: Number },
      },
    ],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    infoTable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InfoTable",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
projectSchema.pre("save", function (next) {
  if (this.images && Array.isArray(this.images)) {
    // Update the index of each image based on its position in the array
    this.images.forEach((image, idx) => {
      image.index = idx;
    });
  }
  next();
});

module.exports = mongoose.model("Project", projectSchema);
