import React from "react";
import TitleDescCard from "./TitleDescriptionCard";
import ImagesCard from "./ImagesCard";
import LocationCard from "./LocationCard";
import InfoTableCard from "./InfoTableCard";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

function ProjectDetailsPage({
  project,
  onBack,
  onProjectDeleted,
  onProjectUpdated,
}) {
  const handleDeleteProject = async () => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await axios.delete(`${API_BASE_URL}/api/projects/${project._id}`, {
        headers: getAuthHeaders(),
      });
      alert("Project deleted successfully!");
      onProjectDeleted(project._id);
      onBack();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project.");
    }
  };

  return (
    <div style={containerStyle}>
      {/* Title and Description */}
      <button onClick={onBack} style={backButtonStyle}>
        <FaArrowLeft />
      </button>
      <TitleDescCard
        project={project}
        onProjectUpdated={onProjectUpdated}
        onBack={onBack}
      />

      {/* Images */}
      <ImagesCard
        project={project}
        onProjectUpdated={onProjectUpdated}
        onBack={onBack}
      />

      {/* Location */}
      <LocationCard
        project={project}
        onProjectUpdated={onProjectUpdated}
        onBack={onBack}
      />

      {/* Info Table */}
      <InfoTableCard
        project={project}
        onProjectUpdated={onProjectUpdated}
        onBack={onBack}
      />

      {/* Buttons */}
      <div style={buttonGroupStyle}>
        <button onClick={onBack} style={backButtonStyle}>
          Back
        </button>
        <button onClick={handleDeleteProject} style={deleteButtonStyle}>
          Delete Project
        </button>
      </div>
    </div>
  );
}

// 🎨 Styling
const containerStyle = {
  padding: "30px",
  maxWidth: "1000px",
  margin: "0 auto",
};

const buttonGroupStyle = {
  marginTop: "30px",
  display: "flex",
  gap: "10px",
  justifyContent: "center",
};

const backButtonStyle = {
  padding: "10px 20px",
  background: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

const deleteButtonStyle = {
  padding: "10px 20px",
  background: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

export default ProjectDetailsPage;
