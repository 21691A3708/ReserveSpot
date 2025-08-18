exports.createProject = async (req, res) => {
  try {
    const { title, description, infoData, locationData } = JSON.parse(
      req.body.data
    );
    const imagePaths = req.files.map((file) => file.filename);

    const infoTable = await InfoTable.create(infoData);
    const location = await Location.create(locationData);

    const project = await Project.create({
      title,
      description,
      images: imagePaths,
      infoTable: infoTable._id,
      location: location._id,
      createdBy: req.user._id,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
