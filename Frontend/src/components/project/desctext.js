import React, { useState } from "react";
import axios from "axios";
import Animaction3 from "./Animaction3"; // Ensure this path is correct and the component exists
const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export default function Desctext({ desc }) {
  const [projectData, setProjectData] = useState({
    projectId: desc.projectId,
    title: desc.title,
    description: desc.description,
    address: desc.address,
  });
  const [formData, setFormData] = useState({ ...projectData });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    if (desc?.projectId) {
      setProjectData({
        projectId: desc.projectId,
        title: desc.title,
        description: desc.description,
        address: desc.address,
      });
    }
  }, [desc]);

  const handleOpenDialog = () => {
    setFormData(projectData); // preload with current data
    setIsDialogOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        titleDesc: {
          title: formData.title,
          description: formData.description,
        },
        location: {
          address: formData.address,
        },
      };

      const res = await axios.put(
        `/api/projects/${formData.projectId}/details`,
        payload
      );

      if (res.status === 200) {
        const updated = res.data;
        setProjectData({
          projectId: updated._id,
          title: updated.title,
          description: updated.description,
          address: updated.location?.address || formData.address,
        });
        setIsDialogOpen(false);
      }
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "45%",
        backgroundColor: "#f9f4ef",
        padding: "40px",
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.05)",
        position: "relative",
        overflow: "hidden",
        wordWrap: "break-word",
        boxSizing: "border-box",
      }}
    >
      <Animaction3>
        <h2 style={{ fontSize: "2.2em", marginBottom: "10px", color: "#222" }}>
          {desc.title || "Loading..."}
        </h2>
      </Animaction3>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        <strong>{desc.address || "Address not provided"}</strong>
      </p>
      <span
        style={{
          color: "#444",
          lineHeight: "1.8",
          textAlign: "justify",
          whiteSpace: "pre-line",
          fontSize: "0.8em",
          marginTop: "20px",
          overflow: "hidden",
          wordWrap: "break-word",
          boxSizing: "border-box",
        }}
      >
        {desc.description || "Description not provided"}
        {/* <Animaction3
          text={desc.description}
          fontSize="1.2em"
          color="#444"
          fontFamily="Grande, sans-serif"
          fontWeight="normal"
          lineHeight="1.8"
          textAlign="justify"
          whiteSpace="pre-line"
        /> */}
      </span>
      {user?.role === "admin" && (
        <button
          onClick={handleOpenDialog}
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "50%",
            fontSize: "18px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
          title="Edit"
        >
          ✎
        </button>
      )}

      {isDialogOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              width: "500px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h3>Edit Project Info</h3>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              style={inputStyle}
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              style={inputStyle}
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Description"
              style={{ ...inputStyle, resize: "vertical" }}
            />

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button
                onClick={() => setIsDialogOpen(false)}
                style={cancelStyle}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={buttonStyle}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "10px",
};

const cancelStyle = {
  ...buttonStyle,
  backgroundColor: "#6c757d",
};
