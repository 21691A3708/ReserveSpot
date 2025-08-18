const Project = require("../models/Project");
const InfoTable = require("../models/InfoTable");
const Location = require("../models/Location");
const DisplayProjectSummaries = async (req, res) => {
  try {
    const projects = await Project.find({}, "_id title images location")
      .populate("location", "address")
      .lean();

    const summaries = projects.map((project) => ({
      id: project._id,
      title: project.title,
      image: project.images[0] || null, // first image
      address: project.location?.address || "Address not available",
    }));

    res.status(200).json(summaries);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("location")
      .populate("infoTable")
      //   .populate("createdBy")
      .exec();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch projects", error: error.message });
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the ID format before querying the database
    if (!id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    // Find the project by ID
    const project = await Project.findById(id)
      .populate("location")
      .populate("infoTable")
      // .populate("createdBy")
      .exec();

    // Check if project exists
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Return the project data
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error); // Improve logging in production with a logger library
    res
      .status(500)
      .json({ message: "Failed to fetch project", error: error.message });
  }
};

const updateImageByIndex = async (req, res) => {
  const { projectId } = req.params;
  const { index, image, description } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Make sure index is valid
    if (
      !Array.isArray(project.images) ||
      index < 0 ||
      index >= project.images.length
    ) {
      return res.status(400).json({ message: "Invalid image index" });
    }

    if (image) project.images[index].url = image;
    if (description !== undefined)
      project.images[index].description = description;

    await project.save();

    res.json({
      message: "Image updated successfully",
      image: project.images[index],
    });
  } catch (err) {
    console.error("Error updating image:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const addImage = async (req, res) => {
  const { projectId } = req.params;
  const { image, description } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const newImage = {
      url: image,
      description: description || "",
    };

    project.images.push(newImage); // Index will be set by pre-save hook
    await project.save();

    res.json({
      message: "Image added successfully",
      newImage: project.images[project.images.length - 1],
    });
  } catch (error) {
    console.error("Add image error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const TableUpdate = async (req, res) => {
  const { projectId } = req.params;
  const { bedrooms, bathrooms, squareFootage, lotSize, amenities, soldPrice } =
    req.body;

  try {
    // 1. Find the project and populate the infoTable
    const project = await Project.findById(projectId).populate("infoTable");

    if (!project || !project.infoTable) {
      return res
        .status(404)
        .json({ message: "Project or InfoTable not found" });
    }

    // 2. Update the infoTable fields
    const updatedInfo = await InfoTable.findByIdAndUpdate(
      project.infoTable._id,
      {
        bedrooms,
        bathrooms,
        squareFootage,
        lotSize,
        amenities,
        soldPrice,
      },
      { new: true }
    );

    res.status(200).json(updatedInfo);
  } catch (error) {
    console.error("Error updating InfoTable by projectId:", error);
    res.status(500).json({ message: "Server error while updating InfoTable" });
  }
};
const locationRoutes = async (req, res) => {
  const { projectId } = req.params;
  const { mapLink, address, latitude, longitude } = req.body;

  try {
    // Find the project and populate location
    const project = await Project.findById(projectId).populate("location");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update location data
    const location = project.location;

    if (mapLink) location.mapLink = mapLink;
    if (address) location.address = address;
    if (latitude) location.latitude = latitude;
    if (longitude) location.longitude = longitude;

    await location.save();

    res.status(200).json({ message: "Map information updated", location });
  } catch (error) {
    console.error("Error updating map data:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const description = async (req, res) => {
  const { projectId } = req.params;
  const { description } = req.body;

  try {
    const project = await Project.findById(projectId).populate("location");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    project.description = description;

    await project.save();

    res.status(200).json({ message: "Map information updated", location });
  } catch (error) {
    console.error("Error updating map data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllProjects,
  DisplayProjectSummaries,
  findById,
  updateImageByIndex,
  addImage,
  TableUpdate,
  locationRoutes,
  description,
};
