const Project = require("../models/Project");
const Location = require("../models/Location");

const HomeSliderSummaries = async (req, res) => {
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
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, address } = req.body;
    console.log( address, id);

    const updated = await Project.findByIdAndUpdate(
      id,
      {
        image: { url: image },
        address: address,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Updated",
      imageUrl: updated?.image?.url || null,
    });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { HomeSliderSummaries, updateProject };
