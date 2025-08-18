const mongoose = require("mongoose");

const connectToDB = async () => {
  const dbURI = process.env.database;

  if (!dbURI) {
    console.error("No MongoDB URI found in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Mongoose Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed.", error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
