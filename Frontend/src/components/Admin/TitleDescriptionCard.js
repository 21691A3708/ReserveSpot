// TitleDescriptionCard.js
import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

function TitleDescriptionCard({ project, onProjectUpdated, onBack }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/projects/${project._id}/details`,
        {
          titleDesc: { title, description },
          // Passing empty location/infoTable to avoid overwriting
          location: project.location,
          infoTable: project.infoTable,
        },
        { headers: getAuthHeaders() }
      );

      alert("Title & Description updated successfully!");
      onProjectUpdated(data); // To update parent
      onBack(); // Go back to project list
    } catch (err) {
      console.error(err);
      alert("Failed to update Title & Description");
    }
  };

  return (
    <div style={cardStyle}>
      <h3>Title & Description</h3>

      {editMode ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            style={inputStyle}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={{ ...inputStyle, height: "100px" }}
          />
          <button onClick={handleUpdate} style={saveButtonStyle}>
            Save
          </button>
        </>
      ) : (
        <>
          <h4>{project.title}</h4>
          <p>{project.description}</p>
          <button onClick={() => setEditMode(true)} style={editButtonStyle}>
            Edit
          </button>
        </>
      )}
    </div>
  );
}

//  Styling
const cardStyle = {
  background: "#f9f9f9",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const editButtonStyle = {
  padding: "8px 16px",
  background: "#ffc107",
  color: "#000",
  border: "none",
  borderRadius: "5px",
};

const saveButtonStyle = {
  padding: "8px 16px",
  background: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

export default TitleDescriptionCard;
