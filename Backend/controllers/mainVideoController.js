const MainVideo = require("../models/MainVideo");
const fs = require("fs");
const path = require("path");

// Controller to upload or update the main video
exports.uploadMainVideo = async (req, res) => {
  try {
    // Check if there's already an existing video
    const existingVideo = await MainVideo.findOne();

    if (existingVideo) {
      // Update existing video with new data
      const oldVideoPath = path.join(
        __dirname,
        "../uploads",
        existingVideo.videoPath
      );
      existingVideo.videoPath = req.file.filename; // New video file
      existingVideo.overlayText = req.body.overlayText; // New overlay text
      existingVideo.uploadedBy = req.user ? req.user.userID : null; // User who uploaded
      await existingVideo.save();
      if (fs.existsSync(oldVideoPath)) {
        fs.unlink(oldVideoPath, (err) => {
          if (err) console.error("Error deleting old video:", err);
        });
      }

      return res.json({
        message: "Main video updated successfully.",
        data: existingVideo,
      });
    }

    // If no video exists, create a new video record
    const us = req.user ? req.user.userID : null;
    const newVideo = await MainVideo.create({
      videoPath: req.file.filename,
      overlayText: req.body.overlayText,
      uploadedBy: us,
    });

    res.status(201).json({
      message: "Main video uploaded successfully.",
      data: newVideo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while uploading the main video.",
      error: error.message,
    });
  }
};

// Controller to get the main video (latest)
exports.getMainVideo = async (req, res) => {
  try {
    const video = await MainVideo.findOne().sort({ createdAt: -1 }); // Fetch latest video
    if (!video) {
      return res.status(404).json({ message: "No video found." });
    }

    res.json(video); // Sends video data { videoPath, overlayText, ... }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching video", error: error.message });
  }
};

// Controller to update overlay text
exports.updateOverlayText = async (req, res) => {
  const { id } = req.params;
  const { overlayText } = req.body;

  try {
    const video = await MainVideo.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    // Update the overlay text
    video.overlayText = overlayText;
    await video.save();

    res.status(200).json({
      message: "Overlay text updated successfully!",
      data: video,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating overlay text." });
  }
};

// Controller to update the video file
exports.updateVideoFile = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await MainVideo.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }
    const oldVideoPath = path.join(__dirname, "../uploads", video.videoPath);
    // Update the video file path
    video.videoPath = req.file.filename;
    await video.save();
    if (fs.existsSync(oldVideoPath)) {
      fs.unlink(oldVideoPath, (err) => {
        if (err) console.error("Failed to delete old video file:", err);
      });
    }
    res.status(200).json({
      message: "Video file updated successfully!",
      data: video,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating video file." });
  }
};
