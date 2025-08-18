// routes/videoRoutes.js
const express = require("express");
const router = express.Router();
const Video = require("../models/MainVideo");

// Upload New Video (POST)
router.post("/", async (req, res) => {
  try {
    const { videoBase64, overlayText } = req.body;

    if (!videoBase64 || !overlayText) {
      return res
        .status(400)
        .json({ message: "Video and overlayText are required" });
    }

    const newVideo = new Video({
      videoBase64,
      overlayText,
    });

    await newVideo.save();
    res
      .status(201)
      .json({ message: "Video uploaded successfully", data: newVideo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Video (GET)
router.get("/", async (req, res) => {
  try {
    const video = await Video.findOne();
    if (!video) return res.status(404).json({ message: "No video found" });
    res.status(200).json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Overlay Text Only (PATCH)
router.patch("/:id/text", async (req, res) => {
  try {
    const { overlayText } = req.body;
    const { id } = req.params;

    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      { overlayText },
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res
      .status(200)
      .json({ message: "Overlay text updated", data: updatedVideo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Video File Only (PATCH)
router.patch("/:id/file", async (req, res) => {
  try {
    const { videoBase64 } = req.body;
    const { id } = req.params;

    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      { videoBase64 },
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res
      .status(200)
      .json({ message: "Video updated successfully", data: updatedVideo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
router.put("/", async (req, res) => {
  try {
    const { videoBase64, overlayText, videoId } = req.body;

    if (!videoBase64 || !overlayText || !videoId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      {
        videoBase64,
        overlayText,
      },
      { new: true } // return updated doc
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found." });
    }

    res.json({ message: "Video updated successfully.", data: updatedVideo });
  } catch (err) {
    console.error("Error updating video:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
