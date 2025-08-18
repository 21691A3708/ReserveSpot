const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Project = require("../models/Project");
const mongoose = require("mongoose");

// POST /api/bookings
router.post("/", async (req, res) => {
  const { name, email, phone, checkIn, checkOut, guests, projectId } = req.body;
  console.log("Received booking request:", req.body); // Log the request body

  if (
    !name ||
    !email ||
    !phone ||
    !checkIn ||
    !checkOut ||
    !guests ||
    !projectId
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const overlappingBooking = await Booking.findOne({
      projectId,
      $or: [
        {
          checkIn: { $lt: checkOutDate },
          checkOut: { $gt: checkInDate },
        },
      ],
    });
    if (overlappingBooking) {
      return res
        .status(409)
        .json({ message: "Selected dates are already booked." });
    }
    const booking = new Booking({
      name,
      email,
      phone,
      checkIn: checkInDate,
      checkOut: checkOut,
      guests,
      projectId,
    });

    await booking.save();
    res.status(200).json({ message: "Booking request saved successfully" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Server error while saving booking" });
  }
});
router.get("/check-availability", async (req, res) => {
  try {
    const { projectId, checkIn, checkOut } = req.query;

    if (!projectId || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Missing parameters." });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return res
        .status(400)
        .json({ message: "Check-out must be after check-in." });
    }

    const overlappingBooking = await Booking.findOne({
      projectId,
      $or: [
        {
          checkIn: { $lte: checkOutDate },
          checkOut: { $gte: checkInDate },
        },
      ],
    });

    if (overlappingBooking) {
      return res.json({ available: false });
    }

    return res.json({ available: true });
  } catch (error) {
    console.error("Availability check error:", error);
    return res.status(500).json({ message: "Server error." });
  }
});

// GET /api/bookings/booked-dates/:projectId
router.get("/booked-dates/:projectId", async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    return res.status(400).json({ message: "Project ID is required." });
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid Project ID format." });
  }

  try {
    const bookings = await Booking.find({ projectId }, "checkIn checkOut");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching booked dates:", error);
    res.status(500).json({ message: "Error fetching booked dates." });
  }
});
// GET /api/bookings/all
router.get("/all", async (req, res) => {
  try {
    // const bookings = await Booking.find().sort({ createdAt: -1 }); // latest first
    const bookings = await Booking.find()
      .populate("projectId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Error fetching bookings." });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.status = status;
    await booking.save();
    res.json({ status: booking.status });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
