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

export default function Component10({ data, imageIndex = 16 }) {
  const { imageOne, projectId } = data;
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [base64Image, setBase64Image] = useState("");
  const [description, setDescription] = useState(imageOne?.description || "");

  const openModal = () => {
    setBase64Image("");
    setDescription(imageOne?.description || "");
    setShowModal(true);
  };
  React.useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    // if (!token) return;
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBase64Image(reader.result);
      reader.onerror = (err) => console.error("Base64 error", err);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/display/update-image/${projectId}`, {
        index: imageIndex,
        image: base64Image,
        description,
      });
      alert("Image updated successfully");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          padding: "6% 30%",
          position: "relative",
        }}
      >
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: imageOne ? `url(${imageOne.url})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
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
          {/* Bottom-left Edit Button */}
          {/* <button onClick={openModal} style={bottomLeftButtonStyle}>
            Edit Image
          </button> */}
        </motion.div>
      </div>
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: "600px" }}>
            <h3>Edit Image</h3>
            <input type="file" onChange={handleImageChange} />

            {/* Before and After Preview */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <p>Before</p>
                {imageOne?.url ? (
                  <img
                    src={imageOne.url}
                    alt="Before"
                    style={{
                      width: "250px",
                      height: "auto",
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                  />
                ) : (
                  <p>No image</p>
                )}
              </div>

              <div style={{ textAlign: "center" }}>
                <p>After</p>
                {base64Image ? (
                  <img
                    src={base64Image}
                    alt="After"
                    style={{
                      width: "250px",
                      height: "auto",
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                  />
                ) : (
                  <p>No new image selected</p>
                )}
              </div>
            </div>

            {/* Description Input */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Update description"
              rows="4"
              style={{ width: "100%", marginTop: "1rem" }}
            />

            {/* Buttons */}
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
                onClick={() => setShowModal(false)}
                style={cancelButtonStyle}
              >
                Cancela
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Styles
const bottomLeftButtonStyle = {
  position: "absolute",
  bottom: "10px",
  left: "10px",
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
