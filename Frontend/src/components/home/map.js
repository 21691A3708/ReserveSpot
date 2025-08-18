import React, { useState, useEffect } from "react";

const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export default function Map({ data, refreshData }) {
  const { mapLink } = data || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMapLink, setNewMapLink] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    if (mapLink) {
      setNewMapLink(mapLink);
    }
  }, [mapLink]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewMapLink(mapLink);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("/api/home/home", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mapLink: newMapLink }),
      });

      const result = await res.json();

      if (res.ok) {
        setResponseMessage("✅ Map link updated successfully!");
        refreshData?.();
      } else {
        setResponseMessage(`❌ Error: ${result.message}`);
      }
    } catch (err) {
      setResponseMessage("❌ Network or server error.");
    }

    setIsModalOpen(false);
  };

  return (
    <div
      className="mapmaindiv"
      style={{
        width: "100%",
        height: "50vh",
        backgroundColor: "rgb(227, 225, 215)",
        border: "2px solid red",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <iframe
        src={mapLink}
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        title="Google Map Location"
      ></iframe>

      {/* Edit Button */}
      {user?.role === "admin" && (
        <button
          onClick={handleOpenModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
          title="Edit Map Link"
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
            <h3>Update Map Link</h3>
            <p
              style={{ marginBottom: "10px", fontSize: "0.9em", color: "#555" }}
            >
              Please enter a valid Google Maps embed link.
            </p>
            <input
              type="text"
              value={newMapLink}
              onChange={(e) => setNewMapLink(e.target.value)}
              placeholder="Enter Google Maps embed link"
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

      {/* Response Message */}
      {responseMessage && (
        <p
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "1em",
            color: responseMessage.includes("Error") ? "red" : "green",
          }}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
}
