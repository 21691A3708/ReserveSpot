import React, { useState, useEffect } from "react";
import Amination from "./Animaction2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function Send({ data, refreshData }) {
  const { mobile, email } = data || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMobile, setNewMobile] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    if (data) {
      setNewMobile(data.mobile || "");
      setNewEmail(data.email || "");
    }
  }, [data]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewMobile(data.mobile);
    setNewEmail(data.email);
  };

  const validateInputs = () => {
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!mobileRegex.test(newMobile)) {
      toast.error(
        "📱 Enter a valid 10-digit Indian mobile number starting with 6-9"
      );
      return false;
    }

    if (!emailRegex.test(newEmail)) {
      toast.error("📧 Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleUpdate = async () => {
    if (!validateInputs()) return;

    try {
      const res = await fetch("/api/home/home", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: newMobile, email: newEmail }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("✅ Contact updated successfully!");
        refreshData?.();
      } else {
        toast.error(`❌ Error: ${result.message}`);
      }
    } catch (err) {
      toast.error("❌ Network or server error.");
    }

    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e3e1d7",
        padding: "1rem",
        width: "100%",
        minHeight: "50vh",
        color: "#333",
        textAlign: "center",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>
        <Amination text="Send us a Message" />
      </h1>

      <div style={{ padding: "0.5rem", maxWidth: "400px" }}>
        <h4 style={{ margin: 0, fontSize: "0.9rem", color: "#777" }}>PHONE</h4>
        <h5 style={{ margin: "0.25rem 0", fontSize: "1rem" }}>{mobile}</h5>
      </div>

      <div style={{ padding: "0.5rem", maxWidth: "400px" }}>
        <h4 style={{ margin: 0, fontSize: "0.9rem", color: "#777" }}>EMAIL</h4>
        <h5 style={{ margin: "0.25rem 0", fontSize: "1rem" }}>{email}</h5>
      </div>
      {user?.role === "admin" && (
        <button
          onClick={handleOpenModal}
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
          title="Edit Contact Info"
        >
          ✏️
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>Update Contact Details</h3>
            <input
              type="text"
              placeholder="Mobile"
              value={newMobile}
              onChange={(e) => setNewMobile(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                fontSize: "1em",
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                fontSize: "1em",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={handleUpdate}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#999",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}
