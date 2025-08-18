import React, { useState } from "react";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { motion } from "framer-motion";
const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export default function Image3({ data }) {
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
        index: 4,
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
          paddingLeft: "15%",
          paddingRight: "15%",
          paddingTop: "7%",
          position: "relative",
        }}
      >
        <motion.div
          className="innerdiv"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.1 }}
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: imageOne ? `url(${imageOne.url})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
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
      </div>

      {/* ✅ FIXED TEXT ALIGNMENT BLOCK */}
      <div
        className="textdiv"
        style={{
          width: "100%",
          height: "25vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "15%",
          paddingRight: "15%",
          paddingTop: "2.5%",
          paddingBottom: "2.5%",
        }}
      >
        <div
          style={{
            width: "40%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: "2%",
            color: "gray",
          }}
        >
          <p style={{ margin: 0, whiteSpace: "nowrap" }}>As shown above</p>
        </div>
        <div
          style={{
            width: "60%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {imageOne ? imageOne.description : "none"}
          </p>
        </div>
      </div>

      {showModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "600px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h3>Edit Image and Description</h3>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ textAlign: "center", width: "45%" }}>
                <p>From:</p>
                <img
                  src={imageOne?.url}
                  alt="Current"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div style={{ textAlign: "center", width: "45%" }}>
                <p>To:</p>
                {base64Image ? (
                  <img
                    src={base64Image}
                    alt="New"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#888",
                    }}
                  >
                    No new image
                  </div>
                )}
              </div>
            </div>

            <input type="file" onChange={handleImageChange} />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Update description"
              rows="4"
              style={{ width: "100%" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
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
