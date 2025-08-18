import React, { useState } from "react";
import axios from "axios";
const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function MapComponent({ map }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMapLink, setUpdatedMapLink] = useState(map.mapLink || "");
  const [user, setUser] = useState(null);

  const handleUpdate = async () => {
    try {
      await axios.patch(`/api/display/${map.projectId}/location`, {
        mapLink: updatedMapLink,
      });
      window.location.reload();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update map link");
    }
  };
  React.useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    // if (!token) return;
  }, []);

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
        src={map?.mapLink || ""}
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map Location"
      ></iframe>

      {isEditing && (
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -20%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
            width: "80%",
            maxWidth: "600px",
          }}
        >
          <h3>Update Map Link</h3>
          <p style={{ marginBottom: "10px", fontSize: "0.9em", color: "#555" }}>
            Please enter a valid Google Maps embed link.
          </p>
          <input
            type="text"
            value={updatedMapLink}
            onChange={(e) => setUpdatedMapLink(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleUpdate}
              style={{
                padding: "10px 20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Update
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {user?.role === "admin" && (
        <button
          onClick={() => setIsEditing(true)}
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "50%",
            fontSize: "20px",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          ✎
        </button>
      )}
    </div>
  );
}
