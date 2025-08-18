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

export default function NextImage7({ data }) {
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
  React.useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showModal]);

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/display/update-image/${projectId}`, {
        index: 9, // assuming index 9 for imageOne
        image: base64Image,
        description,
      });
      alert("Image and description updated!");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  return (
    <>
      <motion.div
        className="mainclass"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        style={{
          width: "100%",
          height: "100vh",
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

        {/* <button
          onClick={openModal}
          style={{
            position: "absolute",
            bottom: "5%",
            right: "5%",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          Edit Image
        </button> */}
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "90vh", // limits height
              overflowY: "auto", // adds scroll only inside the modal if needed
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h3>Edit Image and Description</h3>

            {/* Image Comparison */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%", textAlign: "center" }}>
                <p>Present Image:</p>
                {imageOne?.url ? (
                  <img
                    src={imageOne.url}
                    alt="Current"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "200px",
                      backgroundColor: "#f0f0f0",
                      border: "1px dashed #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      color: "#888",
                    }}
                  >
                    No current image
                  </div>
                )}
              </div>

              <div style={{ width: "45%", textAlign: "center" }}>
                <p>Updating Image:</p>
                {base64Image ? (
                  <img
                    src={base64Image}
                    alt="New"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "200px",
                      backgroundColor: "#f0f0f0",
                      border: "1px dashed #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      color: "#888",
                    }}
                  >
                    No new image
                  </div>
                )}
              </div>
            </div>

            <input type="file" onChange={handleImageChange} />

            {/* Description Comparison */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%" }}>
                <p>
                  <strong>Present Description:</strong>
                </p>
                <div
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    minHeight: "80px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {imageOne?.description || "none"}
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
                    width: "100%",
                    minHeight: "80px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "6px",
                  }}
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                }}
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
