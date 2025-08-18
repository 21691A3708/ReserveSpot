import React, { useState, useEffect } from "react";
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

export default function Component8({ data }) {
  const { imageOne, imageTwo, projectId } = data;
  const [user, setUser] = useState(null);

  const [showModal, setShowModal] = useState(null); // 'imageOne' or 'imageTwo'
  const [base64Image, setBase64Image] = useState("");
  const [description, setDescription] = useState("");

  const openModal = (imageKey) => {
    const imgData = imageKey === "imageOne" ? imageOne : imageTwo;
    setBase64Image("");
    setDescription(imgData?.description || "");
    setShowModal(imageKey);
  };
  React.useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    // if (!token) return;
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showModal]);

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
      const index = showModal === "imageOne" ? 10 : 11;
      await axios.put(`/api/display/update-image/${projectId}`, {
        index,
        image: base64Image,
        description,
      });
      alert(`Image ${index} updated successfully`);
      setShowModal(null);
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  const currentImage = showModal === "imageOne" ? imageOne : imageTwo;

  return (
    <>
      <div
        className="maindiv"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <motion.div
          className="div"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          style={{
            width: "35%",
            height: "85%",
            marginRight: "5%",
            backgroundImage: imageOne ? `url(${imageOne.url})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {" "}
          {user?.role === "admin" && (
            <button
              onClick={() => openModal("imageOne")}
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
          {/* <button onClick={() => openModal("imageOne")} style={buttonStyle}>
            Edit Left Image
          </button> */}
        </motion.div>

        <motion.div
          className="div2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          style={{
            width: "35%",
            height: "85%",
            marginLeft: "5%",
            backgroundImage: imageTwo ? `url(${imageTwo.url})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {user?.role === "admin" && (
            <button
              onClick={() => openModal("imageTwo")}
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
          {/* <button onClick={() => openModal("imageTwo")} style={buttonStyle}>
            Edit Right Image
          </button> */}
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>
              Edit {showModal === "imageOne" ? "Left Image" : "Right Image"}
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              {/* Current Image */}
              <div style={{ width: "45%", textAlign: "center" }}>
                <p>Present Image:</p>
                {currentImage?.url ? (
                  <img
                    src={currentImage.url}
                    alt="Current"
                    style={imageStyle}
                  />
                ) : (
                  <div style={placeholderStyle}>No current image</div>
                )}
              </div>

              {/* New Image Preview */}
              <div style={{ width: "45%", textAlign: "center" }}>
                <p>Updating Image:</p>
                {base64Image ? (
                  <img src={base64Image} alt="New" style={imageStyle} />
                ) : (
                  <div style={placeholderStyle}>No new image</div>
                )}
              </div>
            </div>

            <input type="file" onChange={handleImageChange} />

            {/* Description */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                marginTop: "12px",
              }}
            >
              <div style={{ width: "45%" }}>
                <p>
                  <strong>Present Description:</strong>
                </p>
                <div style={textBoxStyle}>
                  {currentImage?.description || "none"}
                </div>
              </div>
              <div style={{ width: "45%" }}>
                <p>
                  <strong>Updating Description:</strong>
                </p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Update description"
                  rows="4"
                  style={{
                    ...textBoxStyle,
                    padding: "6px",
                    backgroundColor: "#fff",
                  }}
                />
              </div>
            </div>

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
  bottom: "10px",
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
  width: "600px",
  maxHeight: "90vh",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const imageStyle = {
  width: "100%",
  maxHeight: "200px",
  objectFit: "cover",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const placeholderStyle = {
  height: "200px",
  backgroundColor: "#f0f0f0",
  border: "1px dashed #ccc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  color: "#888",
};

const textBoxStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  minHeight: "80px",
  backgroundColor: "#f9f9f9",
};

const saveButtonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
};

const cancelButtonStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
};
