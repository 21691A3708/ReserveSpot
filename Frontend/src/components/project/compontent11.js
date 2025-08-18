import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPen } from "react-icons/fa";
const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function Component11({ data }) {
  const { imageOne = [], projectId } = data;
  const [user, setUser] = useState(null);

  const [images, setImages] = useState(imageOne);
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editImageData, setEditImageData] = useState({
    base64: "",
    description: "",
  });
  useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    // if (!token) return;
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newImageData, setNewImageData] = useState({
    base64: "",
    description: "",
  });

  // Auto image slider
  useEffect(() => {
    if (isEditing) return;
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, [images.length, isEditing]);

  const handleNext = () =>
    setCurrentImage((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  const goToSlide = (index) => setCurrentImage(index);

  const handleTouchStart = (e) =>
    !isEditing && setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchMove = (e) =>
    !isEditing && setTouchEndX(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStartX || touchEndX === null) return;
    const diff = touchStartX - touchEndX;
    const threshold = 50;
    if (diff > threshold) handleNext();
    else if (diff < -threshold) handlePrev();
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleMouseDown = (e) => {
    if (isEditing) return;
    setIsDragging(true);
    setTouchStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isEditing) setTouchEndX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    handleTouchEnd();
  };

  const openEditModal = () => {
    setEditImageData({
      base64: "",
      description: images[currentImage]?.description || "",
    });
    setShowEditModal(true);
    setIsEditing(true);
  };

  const handleImageFile = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setter((prev) => ({ ...prev, base64: reader.result }));
    reader.readAsDataURL(file);
  };

  const submitEdit = async () => {
    try {
      await axios.put(`/api/display/update-image/${projectId}`, {
        index: currentImage,
        image: editImageData.base64,
        description: editImageData.description,
      });
      const updated = [...images];
      if (editImageData.base64)
        updated[currentImage].url = editImageData.base64;
      updated[currentImage].description = editImageData.description;
      setImages(updated);
      setShowEditModal(false);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update image.");
    }
  };

  const submitNewImage = async () => {
    try {
      const res = await axios.post(`/api/display/add-image/${projectId}`, {
        image: newImageData.base64,
        description: newImageData.description,
      });
      if (res.data?.newImage) {
        setImages((prev) => [...prev, res.data.newImage]);
        setCurrentImage(images.length);
      }
      setShowAddModal(false);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    }
  };

  if (images.length === 0) return <div>No images available</div>;

  const bgImageStyle = {
    backgroundImage: `url(${images[currentImage]?.url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    userSelect: "none",
    position: "relative",
  };

  return (
    <>
      <div
        style={{ width: "100%", height: "100vh" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div style={bgImageStyle}>
          {user?.role === "admin" && (
            <button onClick={openEditModal} style={editButtonStyle}>
              Edit Image
            </button>
          )}
          {user?.role === "admin" && (
            <button
              onClick={() => {
                setNewImageData({ base64: "", description: "" });
                setShowAddModal(true);
                setIsEditing(true);
              }}
              style={{
                ...editButtonStyle,
                left: "140px",
                backgroundColor: "#28a745",
              }}
            >
              Add Image
            </button>
          )}

          <div style={indicatorStyle}>
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => goToSlide(i)}
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  margin: "5px",
                  cursor: "pointer",
                  opacity: currentImage === i ? 1 : 0.5,
                  transition: "opacity 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {showEditModal && (
        <Modal
          title="Edit Image"
          base64={editImageData.base64}
          description={editImageData.description}
          onFileChange={(e) => handleImageFile(e, setEditImageData)}
          onDescriptionChange={(e) =>
            setEditImageData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          onSubmit={submitEdit}
          onCancel={() => {
            setShowEditModal(false);
            setIsEditing(false);
          }}
        />
      )}

      {showAddModal && (
        <Modal
          title="Add New Image"
          base64={newImageData.base64}
          description={newImageData.description}
          onFileChange={(e) => handleImageFile(e, setNewImageData)}
          onDescriptionChange={(e) =>
            setNewImageData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          onSubmit={submitNewImage}
          onCancel={() => {
            setShowAddModal(false);
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
}

function Modal({
  title,
  base64,
  description,
  onFileChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
}) {
  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h3>{title}</h3>
        <input type="file" onChange={onFileChange} />
        <textarea
          value={description}
          onChange={onDescriptionChange}
          placeholder="Enter description"
          rows="4"
          style={{ width: "100%", marginTop: "1rem" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <button onClick={onSubmit} style={saveButtonStyle}>
            Save
          </button>
          <button onClick={onCancel} style={cancelButtonStyle}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles
const editButtonStyle = {
  position: "absolute",
  bottom: "20px",
  left: "20px",
  padding: "10px 16px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  zIndex: 10,
};

const indicatorStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-end",
  padding: "10%",
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
};

const saveButtonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "8px 12px",
  border: "none",
};

const cancelButtonStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  padding: "8px 12px",
  border: "none",
};
