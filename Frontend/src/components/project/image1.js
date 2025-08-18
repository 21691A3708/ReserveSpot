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

export default function Image1({ data }) {
  const { imageOne, imageTwo, projectId, prize } = data;
  console.log(data);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);

  const openModal = (index, existingDesc) => {
    setEditIndex(index);
    setDescription(existingDesc || "");
    setBase64Image("");
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
  React.useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    // if (!token) return;
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/display/update-image/${projectId}`, {
        index: editIndex,
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
        className="maindiv"
        style={{
          width: "100%",
          height: "150vh",
          display: "flex",
          flexDirection: "row",
          padding: "2%",
        }}
      >
        {/* Left Side - Image One */}
        <div
          style={{
            position: "relative",
            width: "30%",
            height: "100%",
            marginRight: "2%",
          }}
        >
          <div
            className="sidediv"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignContent: "flex-end",
            }}
          >
            <motion.div
              className="content"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
              style={{
                width: "100%",
                height: "50%",
                backgroundImage: imageOne ? `url(${imageOne.url})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {" "}
              {/* <button
                onClick={() => openModal(1, imageOne?.description)}
                style={{
                  position: "absolute",
                  bottom: "5%",
                  left: "5%",
                  padding: "6px 12px",
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
              {user?.role === "admin" && (
                <button
                  onClick={() => openModal(1, imageOne?.description)}
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
        </div>

        {/* Right Side - Image Two */}
        <div
          className="rigthsidediv"
          style={{
            width: "70%",
            height: "100%",
            marginLeft: "2%",
            position: "relative",
          }}
        >
          <div
            className="heddiv"
            style={{
              width: "100%",
              height: "3%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              className="leftdiv"
              style={{
                width: "80%",
                height: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <p style={{ color: "gray", padding: "2%" }}>LOCATION</p>
              <p
                style={{
                  color: "black",
                  padding: "2%",
                  fontSize: "1rem",
                  textAlign: "left",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data.location || "null"}
              </p>
            </div>
            <div
              className="rigthdiv"
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <p style={{ color: "gray", padding: "2%" }}>SOLD PRICE</p>
              <p style={{ color: "black", padding: "2%" }}>{prize}</p>
            </div>
          </div>

          <motion.div
            className="bodydiv"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            style={{
              width: "100%",
              height: "97%",
              backgroundColor: "GrayText",
              backgroundImage: imageTwo ? `url(${imageTwo.url})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <button
              onClick={() => openModal(2, imageTwo?.description)}
              style={{
                position: "absolute",
                bottom: "2%",
                right: "3%",
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
            {user?.role === "admin" && (
              <button
                onClick={() => openModal(2, imageTwo?.description)}
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
      </div>

      {/* Modal */}
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
              width: "500px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h3>Edit Image and Description</h3>

            <div style={{ display: "flex", gap: "10px" }}>
              {(editIndex === 1 && imageOne?.url) ||
              (editIndex === 2 && imageTwo?.url) ? (
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "14px", marginBottom: "4px" }}>
                    Current Image
                  </p>
                  <img
                    src={editIndex === 1 ? imageOne.url : imageTwo.url}
                    alt="Current"
                    style={{
                      width: "100%",
                      maxHeight: "180px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              ) : null}

              {base64Image && (
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "14px", marginBottom: "4px" }}>
                    New Image
                  </p>
                  <img
                    src={base64Image}
                    alt="New"
                    style={{
                      width: "100%",
                      maxHeight: "180px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              )}
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
