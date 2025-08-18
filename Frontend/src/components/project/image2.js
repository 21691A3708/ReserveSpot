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

export default function Image2({ data }) {
  const { imageOne, projectId } = data;
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [base64Image, setBase64Image] = useState("");
  const [description, setDescription] = useState(imageOne?.description || "");
  React.useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    // if (!token) return;
  }, []);
  const openModal = () => {
    setBase64Image("");
    setDescription(imageOne?.description || "");
    setShowModal(true);
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
      await axios.put(`/api/display/update-image/${projectId}`, {
        index: 3,
        image: base64Image,
        description,
      });
      alert("Image updated!");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update.");
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          padding: "7% 25% 2.5%",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: imageOne ? `url(${imageOne.url})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
        </motion.div>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "8px",
              width: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            }}
          >
            <h3 style={{ marginBottom: "12px" }}>Edit Image & Description</h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div style={{ flex: 1, textAlign: "center" }}>
                <p style={{ marginBottom: "8px" }}>Current Image</p>
                <img
                  src={imageOne?.url}
                  alt="Current"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                  }}
                />
              </div>

              <div style={{ flex: 1, textAlign: "center" }}>
                <p style={{ marginBottom: "8px" }}>New Image</p>
                {base64Image ? (
                  <img
                    src={base64Image}
                    alt="New"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      border: "1px dashed #ccc",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#aaa",
                    }}
                  >
                    No new image
                  </div>
                )}
              </div>
            </div>

            <input
              type="file"
              onChange={handleImageChange}
              style={{ marginTop: "16px", marginBottom: "12px", width: "100%" }}
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Update description"
              rows="4"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
