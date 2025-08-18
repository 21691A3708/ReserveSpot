const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const Project = require("../models/Project");
const InfoTable = require("../models/InfoTable");
const Location = require("../models/Location");

const {
  getAllProjects,
  getProjectById,
  createProject,

  deleteProject,
} = require("../controllers/projectController");

// All routes below use controller functions — no duplicates!

router.get("/", auth, getAllProjects); //working fine
router.get("/:id", auth, getProjectById); //working fine to get the  projct details
router.post("/", auth, createProject);
router.delete("/:id", auth, deleteProject); //working fine
//tittle update/ location update, informaction table updte
router.put("/:projectId/details", async (req, res) => {
  const { projectId } = req.params;
  const { titleDesc, location, infoTable } = req.body; // Base64 image string
  console.log(titleDesc);

  try {
    console.log(projectId);
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");
    if (titleDesc) {
      project.title = titleDesc.title || project.title;
      project.description = titleDesc.description || project.description;
    }
    if (location && project.location) {
      const existingLocation = await Location.findById(project.location);
      if (existingLocation) {
        Object.assign(existingLocation, location);
        await existingLocation.save();
      }
    }
    // Update the referenced InfoTable document
    if (infoTable && project.infoTable) {
      const existingInfoTable = await InfoTable.findById(project.infoTable);
      if (existingInfoTable) {
        Object.assign(existingInfoTable, infoTable);
        await existingInfoTable.save();
      }
    }
    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
//image card routes
router.post("/:projectId/images", async (req, res) => {
  const { projectId } = req.params;
  const { image } = req.body; // Base64 image string

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");

    // Save Base64 image
    project.images.push({ url: image }); // Make sure your schema supports images array
    await project.save();

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Delete an image
router.delete("/:projectId/images", async (req, res) => {
  const { projectId } = req.params;
  const { imageUrl } = req.body;
  console.log(projectId);

  try {
    const project = await Project.findById(projectId);
    console.log(project);
    if (!project) return res.status(404).send("Project not found");

    project.images = project.images.filter((img) => img.url !== imageUrl);
    await project.save();

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
