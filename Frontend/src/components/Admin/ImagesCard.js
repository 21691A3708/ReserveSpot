// ImagesCard.js
import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

function ImagesCard({ project, onProjectUpdated, onBack }) {
  const [images, setImages] = useState(project.images || []);
  const [selectedFile, setSelectedFile] = useState(null);
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const base64Image = await convertToBase64(selectedFile);
    const formData = {
      image: base64Image,
    };

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/projects/${project._id}/images`,
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      alert("Image uploaded successfully!");
      onProjectUpdated(data);
      onBack();
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/api/projects/${project._id}/images`,
        {
          headers: getAuthHeaders(),
          data: { imageUrl }, // sending image to delete
        }
      );

      alert("Image deleted successfully!");
      onProjectUpdated(data);
      onBack();
    } catch (err) {
      console.error(err);
      alert("Failed to delete image.");
    }
  };

  return (
    <div style={cardStyle}>
      <h3>Project Images</h3>

      <div style={imageGridStyle}>
        {images.length > 0 ? (
          images.map((img, idx) => (
            <div key={idx} style={imageWrapperStyle}>
              <img src={img.url} alt="Project" style={imageStyle} />
              <button
                onClick={() => handleDeleteImage(img.url)}
                style={deleteButtonStyle}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{ marginBottom: "10px" }}
        />
        <br />
        <button onClick={handleImageUpload} style={uploadButtonStyle}>
          Upload Image
        </button>
      </div>
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

const imageGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  gap: "10px",
};

const imageWrapperStyle = {
  position: "relative",
};

const imageStyle = {
  width: "100%",
  height: "100px",
  objectFit: "cover",
  borderRadius: "8px",
};

const deleteButtonStyle = {
  position: "absolute",
  top: "5px",
  right: "5px",
  padding: "5px 10px",
  background: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "12px",
};

const uploadButtonStyle = {
  padding: "8px 16px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

export default ImagesCard;
