import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
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

export default function Component9({ data }) {
  const { imageOne, imageTwo, projectId } = data;
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(null); // 'imageOne' or 'imageTwo'
  const [base64Image, setBase64Image] = useState("");
  const [description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState(null);

  const openModal = (imageKey) => {
    const imgData = imageKey === "imageOne" ? imageOne : imageTwo;
    setBase64Image(""); // Reset preview
    setCurrentImage(imgData?.url || null);
    setDescription(imgData?.description || "");
    setShowModal(imageKey);
  };

  React.useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBase64Image(reader.result);
      reader.onerror = (err) => console.error("Error reading file", err);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const index = showModal === "imageOne" ? 12 : 13;
      await axios.put(`/api/display/update-image/${projectId}`, {
        index,
        image: base64Image,
        description,
      });
      alert(`Image ${index} updated successfully.`);
      setShowModal(null);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update image.");
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "150vh",
          display: "flex",
          flexDirection: "row",
          padding: "2%",
        }}
      >
        {/* Left Image (imageOne) */}
        <div style={{ width: "68%", margin: "2%", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            style={{
              width: "100%",
              height: "97%",
              backgroundColor: "#ccc",
              backgroundImage: imageOne ? `url(${imageOne.url})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginRight: "2%",
            }}
          ></motion.div>
          <button onClick={() => openModal("imageOne")} style={buttonStyle}>
            Edit Image One
          </button>
        </div>

        {/* Right Image (imageTwo) */}
        <div style={{ width: "28%", marginLeft: "2%", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            style={{
              width: "100%",
              height: "50%",
              backgroundColor: "#f00",
              backgroundImage: imageTwo ? `url(${imageTwo.url})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {" "}
            {user?.role === "admin" && (
              <button
                onClick={openModal}
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  padding: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.3s",
                }}
                title="Edit Image"
              >
                <FaPen size={25} />
              </button>
            )}
          </motion.div>
          {/* <button onClick={() => openModal("imageTwo")} style={buttonStyle}>
            Edit Image Two
          </button> */}
        </div>
      </div>

      {/* Modal with Before/After Preview */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>Edit {showModal === "imageOne" ? "Image One" : "Image Two"}</h3>

            {/* Before/After Preview */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
              <div>
                <p>Before:</p>
                {currentImage ? (
                  <img src={currentImage} alt="Before" style={previewStyle} />
                ) : (
                  <div style={{ ...previewStyle, backgroundColor: "#eee" }} />
                )}
              </div>
              <div>
                <p>After:</p>
                {base64Image ? (
                  <img src={base64Image} alt="After" style={previewStyle} />
                ) : (
                  <div style={{ ...previewStyle, backgroundColor: "#eee" }} />
                )}
              </div>
            </div>

            {/* Upload and Description */}
            <input type="file" onChange={handleImageChange} />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Update description"
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
              <button onClick={handleSubmit} style={saveButtonStyle}>
                Save
              </button>
              <button
                onClick={() => setShowModal(null)}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Styles
const buttonStyle = {
  position: "absolute",
  bottom: "4%",
  right: "10px",
  padding: "8px 16px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
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
  width: "500px",
};

const previewStyle = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
  border: "1px solid #ccc",
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
