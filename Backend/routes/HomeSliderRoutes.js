// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Home = require("../models/Project");
const {
  HomeSliderSummaries,
  updateProject,
} = require("../controllers/HomeSliderController");

router.get("/", HomeSliderSummaries);
router.put("/update-image/:id", updateProject);
router.get("/home", async (req, res) => {
  console.log("home tester");
  try {
    const homeData = await Home.findOne(); // assuming only one document
    if (!homeData)
      return res.status(404).json({ message: "Home data not found" });
    res.json(homeData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/home", async (req, res) => {
  try {
    // Check if a Home document already exists
    const existingHome = await Home.findOne();

    if (existingHome) {
      return res.status(400).json({
        message: "Home data already exists. You can update it instead.",
      });
    }

    // If not, create new Home
    const {
      description,
      mobile,
      email,
      mapLink,
      address,
      facebook,
      instagram,
      twitter,
      linkedin,
    } = req.body;

    const newHome = new Home({
      description,
      mobile,
      email,
      mapLink,
      address,
      facebook,
      instagram,
      twitter,
      linkedin,
    });

    const savedHome = await newHome.save();
    res.status(201).json(savedHome);
  } catch (error) {
    res.status(500).json({ message: "Failed to create home data", error });
  }
});

router.patch("/home", async (req, res) => {
  try {
    const allowedFields = [
      "description",
      "mobile",
      "email",
      "mapLink",
      "address",
      "facebook",
      "instagram",
      "twitter",
      "linkedin",
    ];

    const existingHome = await Home.findOne();
    if (!existingHome) {
      return res.status(404).json({ message: "Home data not found" });
    }

    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        existingHome[key] = req.body[key];
      }
    });

    const updatedHome = await existingHome.save();
    res.status(200).json(updatedHome);
  } catch (error) {
    res.status(400).json({ message: "Failed to update home data", error });
  }
});

module.exports = router;
