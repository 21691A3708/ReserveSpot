// LocationCard.js
import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

function LocationCard({ project, onProjectUpdated, onBack }) {
  const [editMode, setEditMode] = useState(false);
  const [location, setLocation] = useState({
    address: project.location?.address || "",
    latitude: project.location?.latitude || "",
    longitude: project.location?.longitude || "",
    mapLink: project.location?.mapLink || "",
  });

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/projects/${project._id}/details`,
        {
          titleDesc: {
            title: project.title,
            description: project.description,
          },
          location,
          infoTable: project.infoTable,
        },
        { headers: getAuthHeaders() }
      );

      alert("Location updated successfully!");
      onProjectUpdated(data);
      onBack();
    } catch (err) {
      console.error(err);
      alert("Failed to update location.");
    }
  };

  return (
    <div style={cardStyle}>
      <h3>Project Location</h3>

      {editMode ? (
        <>
          <input
            type="text"
            value={location.address}
            onChange={(e) =>
              setLocation({ ...location, address: e.target.value })
            }
            placeholder="Address"
            style={inputStyle}
          />
          <input
            type="text"
            value={location.latitude}
            onChange={(e) =>
              setLocation({ ...location, latitude: e.target.value })
            }
            placeholder="Latitude"
            style={inputStyle}
          />
          <input
            type="text"
            value={location.longitude}
            onChange={(e) =>
              setLocation({ ...location, longitude: e.target.value })
            }
            placeholder="Longitude"
            style={inputStyle}
          />
          <input
            type="text"
            value={location.mapLink}
            onChange={(e) =>
              setLocation({ ...location, mapLink: e.target.value })
            }
            placeholder="Google Map Link (optional)"
            style={inputStyle}
          />

          <button onClick={handleUpdate} style={saveButtonStyle}>
            Save
          </button>
        </>
      ) : (
        <>
          <p>
            <strong>Address:</strong> {project.location?.address}
          </p>
          <p>
            <strong>Latitude:</strong> {project.location?.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {project.location?.longitude}
          </p>
          {project.location?.mapLink && (
            <p>
              <a
                href={project.location.mapLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </a>
            </p>
          )}
          <button onClick={() => setEditMode(true)} style={editButtonStyle}>
            Edit
          </button>
        </>
      )}
    </div>
  );
}

// 🎨 Styling
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

export default LocationCard;
