require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDB = require("./database/db");
const authRoutes = require("./routes/auth-routes");

const projectRoutes = require("./routes/projectRoutes"); //new1
const path = require("path"); //new1
const videoRoutes = require("./routes/videoRoutes"); //new1
const homeSlider = require("./routes/HomeSliderRoutes");
const Display = require("./routes/displayProjectRoutes");
const bookings = require("./routes/booking");

const app = express();
const port = process.env.PORT || 3708;

connectToDB();

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //new1

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes); //new
app.use("/api/video", videoRoutes);
app.use("/api/home", homeSlider);
app.use("/api/display", Display);
app.use("/api/bookings", bookings);

try {
  app.listen(port, "0.0.0.0", () => {
    console.log("✅Server is running");
    console.log(`🔗check on http://localhost:${port}`);
  });
} catch (error) {
  console.error("Failed to start the server:", error);
}
