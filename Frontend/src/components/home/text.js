import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Amination from "./Animaction2";
const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export default function Text({ data, refreshData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    if (data?.description) {
      setNewDescription(data.description);
    }
  }, [data]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewDescription(data.description); // reset on cancel
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/home/home", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newDescription }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("✅ Description updated successfully!");
        refreshData?.(); // re-fetch parent data
      } else {
        toast.error(`❌ Error: ${result.message}`);
      }
    } catch (err) {
      toast.error("❌ Network or server error.");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <motion.div
      style={{
        height: "50vh",
        width: "100%",
        backgroundColor: "rgb(227, 225, 215)",
        display: "grid",
        placeItems: "center",
        padding: "0 5vw",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Toast Container */}
      <ToastContainer position="top-right" />

      {/* Display Description */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          width: "100%",
          maxWidth: "100vw",
          backgroundColor: "hsl(50, 17.6%, 86.7%)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "rgb(227, 225, 215)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            style={{
              fontSize: "2em",
              fontFamily: "Editorialnew, serif",
              textAlign: "left",
              margin: 0,
            }}
          >
            <Amination text={data?.description || "No description available"} />
          </motion.h2>
        </div>
      </div>

      {/* Edit Button */}
      {user?.role === "admin" && (
        <button
          onClick={handleOpenModal}
          style={{
            position: "absolute",
            bottom: "2%",
            right: "10px",
            padding: "14px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            fontSize: "20px",
            cursor: "pointer",
          }}
          title="Edit Description"
        >
          ✏️
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ marginBottom: "12px" }}>✏️ Edit Description</h2>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={5}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "1em",
                borderRadius: "8px",
                border: "1px solid #ccc",
                resize: "vertical",
                marginBottom: "16px",
              }}
              placeholder="Enter new description..."
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={handleCloseModal}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#ccc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                style={{
                  padding: "10px 16px",
                  backgroundColor: loading ? "#7CBF7C" : "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
