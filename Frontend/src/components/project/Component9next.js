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

export default function Component9next({ data }) {
  const { imageOne, imageTwo, projectId } = data;
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(null); // 'imageOne' or 'imageTwo'
  const [base64Image, setBase64Image] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [description, setDescription] = useState("");
  React.useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    // if (!token) return;
  }, []);
  const openModal = (imageKey) => {
    const imgData = imageKey === "imageOne" ? imageOne : imageTwo;
    setBase64Image("");
    setCurrentImage(imgData?.url || "");
    setDescription(imgData?.description || "");
    setShowModal(imageKey);
  };

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
      const index = showModal === "imageOne" ? 14 : 15;
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
        {/* Image One */}
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
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
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
            Edit Image One
          </button> */}
        </motion.div>

        {/* Image Two */}
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
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
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
          {/* <button onClick={() => openModal("imageTwo")} style={buttonStyle}>
            Edit Image Two
          </button> */}
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ marginBottom: "1rem" }}>
              Edit {showModal === "imageOne" ? "Image One" : "Image Two"}
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              {/* Before Image */}
              <div style={{ flex: 1, textAlign: "center" }}>
                <p style={{ marginBottom: "0.5rem" }}>Before</p>
                {currentImage ? (
                  <img src={currentImage} alt="Before" style={previewStyle} />
                ) : (
                  <div style={{ ...previewStyle, backgroundColor: "#eee" }} />
                )}
              </div>

              {/* After Image */}
              <div style={{ flex: 1, textAlign: "center" }}>
                <p style={{ marginBottom: "0.5rem" }}>After</p>
                {base64Image ? (
                  <img src={base64Image} alt="After" style={previewStyle} />
                ) : (
                  <div style={{ ...previewStyle, backgroundColor: "#eee" }} />
                )}
              </div>
            </div>

            <input
              type="file"
              onChange={handleImageChange}
              style={{ marginTop: "1rem" }}
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Update description"
              rows="4"
              style={{
                width: "100%",
                marginTop: "1rem",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1.5rem",
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
  padding: "24px",
  borderRadius: "10px",
  width: "500px",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
};

const previewStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const saveButtonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
