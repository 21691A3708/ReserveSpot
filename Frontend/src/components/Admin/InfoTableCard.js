// InfoTableCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

function InfoTableCard({ project, onProjectUpdated, onBack }) {
  const [editMode, setEditMode] = useState(false);
  const [infoTable, setInfoTable] = useState({
    bedrooms: 0,
    bathrooms: 0,
    squareFootage: 0,
    lotSize: "",
    amenities: [],
    soldPrice: 0,
  });
  useEffect(() => {
    setInfoTable({
      bedrooms: project.infoTable?.bedrooms || 0,
      bathrooms: project.infoTable?.bathrooms || 0,
      squareFootage: project.infoTable?.squareFootage || 0,
      lotSize: project.infoTable?.lotSize || "",
      amenities: Array.isArray(project.infoTable?.amenities)
        ? project.infoTable.amenities
        : [],
      soldPrice: project.infoTable?.soldPrice || 0,
    });
  }, [project]);
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/projects/${project._id}/details`,
        {
          titleDesc: {
            title: project.title,
            description: project.description,
          },
          location: project.location,
          infoTable,
        },
        { headers: getAuthHeaders() }
      );

      alert("Information table updated successfully!");
      onProjectUpdated(data);
      onBack();
    } catch (err) {
      console.error(err);
      alert("Failed to update information table.");
    }
  };

  return (
    <div style={cardStyle}>
      <h3>Project Information Table</h3>

      {editMode ? (
        <>
          <input
            type="number"
            value={infoTable.bedrooms}
            onChange={(e) =>
              setInfoTable({ ...infoTable, bedrooms: Number(e.target.value) })
            }
            placeholder="Bedrooms"
            style={inputStyle}
          />
          <input
            type="number"
            value={infoTable.bathrooms}
            onChange={(e) =>
              setInfoTable({ ...infoTable, bathrooms: Number(e.target.value) })
            }
            placeholder="Bathrooms"
            style={inputStyle}
          />
          <input
            type="number"
            value={infoTable.squareFootage}
            onChange={(e) =>
              setInfoTable({
                ...infoTable,
                squareFootage: Number(e.target.value),
              })
            }
            placeholder="Square Footage"
            style={inputStyle}
          />
          <input
            type="text"
            value={infoTable.lotSize}
            onChange={(e) =>
              setInfoTable({ ...infoTable, lotSize: e.target.value })
            }
            placeholder="Lot Size (e.g., 60x120 ft)"
            style={inputStyle}
          />
          <input
            type="text"
            value={infoTable.amenities.join(", ")}
            onChange={(e) =>
              setInfoTable({
                ...infoTable,
                amenities: e.target.value.split(",").map((a) => a.trim()),
              })
            }
            placeholder="Amenities (comma separated)"
            style={inputStyle}
          />
          <input
            type="number"
            value={infoTable.soldPrice}
            onChange={(e) =>
              setInfoTable({ ...infoTable, soldPrice: Number(e.target.value) })
            }
            placeholder="Sold Price"
            style={inputStyle}
          />

          <button onClick={handleUpdate} style={saveButtonStyle}>
            Save
          </button>
        </>
      ) : (
        <>
          <p>
            <strong>Bedrooms:</strong> {infoTable.bedrooms}
          </p>
          <p>
            <strong>Bathrooms:</strong> {infoTable.bathrooms}
          </p>
          <p>
            <strong>Square Footage:</strong> {infoTable.squareFootage} sqft
          </p>
          <p>
            <strong>Lot Size:</strong> {infoTable.lotSize}
          </p>
          <p>
            <strong>Sold Price:</strong> ${infoTable.soldPrice.toLocaleString()}
          </p>
          <p>
            <strong>Amenities:</strong> {infoTable.amenities.join(", ")}
          </p>

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

export default InfoTableCard;
