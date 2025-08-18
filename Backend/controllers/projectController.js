const fs = require("fs");
const path = require("path");
const Project = require("../models/Project");
const InfoTable = require("../models/InfoTable");
const Location = require("../models/Location");

const createProject = async (req, res) => {
  try {
    const { title, description, images, locationData, infoTableData } =
      req.body;

    const createdBy = req.user?.userID;
    if (!createdBy) return res.status(401).json({ message: "Unauthorized" });

    if (!title || !images || !images.length) {
      return res
        .status(400)
        .json({ message: "Title and at least one image are required." });
    }

    console.log(title, description, images, locationData, infoTableData);

    // Create Location document
    const newLocation = new Location({
      address: locationData.address,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      mapLink: locationData.mapLink,
    });
    const savedLocation = await newLocation.save();

    // Create InfoTable document
    const newInfoTable = new InfoTable({
      bedrooms: infoTableData.bedrooms,
      bathrooms: infoTableData.bathrooms,
      squareFootage: infoTableData.squareFootage,
      lotSize: infoTableData.lotSize,
      amenities: infoTableData.amenities,
      soldPrice: infoTableData.soldPrice,
    });
    const savedInfoTable = await newInfoTable.save();
    console.log(savedInfoTable);
    const img = images.map((image) => ({ url: image }));

    const project = await Project.create({
      title,
      description,
      images: img,
      location: savedLocation._id,
      infoTable: savedInfoTable._id,
      createdBy,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ message: "Failed to create project", error: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("location")
      .populate("infoTable")
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch projects", error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("location")
      .populate("infoTable")
      .populate("createdBy", "username");

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch project", error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, infoData, locationData } = req.body;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (infoData) {
      await InfoTable.findByIdAndUpdate(project.infoTable, infoData, {
        new: true,
      });
    }
    if (locationData) {
      await Location.findByIdAndUpdate(project.location, locationData, {
        new: true,
      });
    }

    if (req.files && req.files.length > 0) {
      project.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    if (title) project.title = title;
    if (description) project.description = description;

    await project.save();

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    console.error("Error updating project:", error);
    res
      .status(500)
      .json({ message: "Failed to update project", error: error.message });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project)
      return res.status(404).json({ message: "Project not found." });

    // if (project.images && project.images.length > 0) {
    //   const deleteImagePromises = project.images.map((imgPath) => {
    //     const absolutePath = path.join(__dirname, "..", "public", imgPath);
    //     return fs.promises.unlink(absolutePath).catch((err) => {
    //       console.error(`Failed to delete image: ${imgPath}`, err.message);
    //     });
    //   });

    //   await Promise.all(deleteImagePromises);
    // }

    await InfoTable.findByIdAndDelete(project.infoTable);
    await Location.findByIdAndDelete(project.location);
    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Server error while deleting project." });
  }
};

const updateTitleDescription = async (req, res) => {
  try {
    const { title, description } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    )
      .populate("location")
      .populate("infoTable");

    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    console.error("Error updating title/description:", err);
    res.status(500).json({ error: "Failed to update title or description" });
  }
};

const updateLocation = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("location");
    if (!project) return res.status(404).json({ error: "Project not found" });

    const location = await Location.findByIdAndUpdate(
      project.location._id,
      req.body,
      { new: true }
    );
    res.json({ message: "Location updated", location });
  } catch (err) {
    console.error("Error updating location:", err);
    res.status(500).json({ error: "Failed to update location" });
  }
};

const updateInfoTable = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const updatedInfo = await InfoTable.findByIdAndUpdate(
      project.infoTable,
      req.body,
      { new: true }
    );
    res.json(updatedInfo);
  } catch (err) {
    res.status(500).json({ error: "Error updating info table" });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  updateTitleDescription,
  updateLocation,
  updateInfoTable,
};
