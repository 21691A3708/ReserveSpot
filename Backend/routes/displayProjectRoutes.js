const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getAllProjects,
  DisplayProjectSummaries,
  findById,
  updateImageByIndex,
  addImage,
  TableUpdate,
  locationRoutes,
  description
} = require("../controllers/displayProjectController");

// All routes below use controller functions — no duplicates!
router.get("/", DisplayProjectSummaries);
router.get("/all/", getAllProjects);
router.get("/find/:id", findById);
router.put("/update-image/:projectId", updateImageByIndex);
router.post("/add-image/:projectId", addImage);
router.put("/:projectId/info", TableUpdate);
router.patch("/:projectId/location", locationRoutes);
router.patch("/:projectId/description", description);
module.exports = router;
