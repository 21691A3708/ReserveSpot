import React, { useState } from "react";
const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function Component12({ info }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    bedrooms: info?.bedrooms ?? "",
    bathrooms: info?.bathrooms ?? "",
    squareFootage: info?.squareFootage ?? "",
    lotSize: info?.lotSize ?? "",
    amenities: Array.isArray(info?.amenities) ? info.amenities.join(", ") : "",
    soldPrice: info?.soldPrice ?? "",
  });
  const [user, setUser] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  React.useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    // if (!token) return;
  }, []);
  const handleUpdate = async () => {
    try {
      const payload = {
        ...formData,
        amenities: formData.amenities
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        squareFootage: Number(formData.squareFootage),
        lotSize: Number(formData.lotSize),
        soldPrice: Number(formData.soldPrice),
      };

      const response = await fetch(`/api/display/${info.projectId}/info`, {
        method: "PUT", // 👈 use PUT, not PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowModal(false);
        window.location.reload();
      } else {
        const err = await response.json();
        alert("Update failed: " + (err.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred. Check the console.");
    }
  };

  React.useEffect(() => {
    if (info) {
      setFormData({
        bedrooms: info.bedrooms ?? "",
        bathrooms: info.bathrooms ?? "",
        squareFootage: info.squareFootage ?? "",
        lotSize: info.lotSize ?? "",
        amenities: Array.isArray(info.amenities)
          ? info.amenities.join(", ")
          : "",
        soldPrice: info.soldPrice ?? "",
      });
    }
  }, [info]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div className="headingdiv" style={{ width: "100%", height: "20%" }}>
        <div
          className="div1"
          style={{
            width: "100%",
            height: "70%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
        >
          <h1>Prado De La Felicidad</h1>
        </div>
        <div className="div2" style={{ width: "100%", height: "40%" }}>
          <h6>PROJECT DETAILS</h6>
          <hr
            style={{
              backgroundColor: "none",
              color: "black",
              border: "1px solid red",
            }}
          />
        </div>
      </div>

      <div className="bodydiv" style={{ width: "100%", height: "80%" }}>
        <div
          className="innerdiv"
          style={{
            width: "40%",
            height: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2.5%",
            marginBottom: "2.5%",
            borderRadius: "20px",
            boxSizing: "border-box",
          }}
        >
          <h1 style={{ textAlign: "start" }}>Information</h1>
          <table
            style={{
              width: "100%",
              height: "100%",
              borderCollapse: "collapse",
              borderRadius: "20px",
            }}
          >
            <tbody>
              <tr style={rowStyle}>
                <th style={thStyle}>BEDROOM COUNT</th>
                <td style={tdStyle}>{info.bedrooms}</td>
              </tr>
              <tr style={rowStyle}>
                <th style={thStyle}>BATHROOM COUNT</th>
                <td style={tdStyle}>{info.bathrooms}</td>
              </tr>
              <tr style={rowStyle}>
                <th style={thStyle}>HOME SQUARE FOOTAGE</th>
                <td style={tdStyle}>{info.squareFootage}</td>
              </tr>
              <tr style={rowStyle}>
                <th style={thStyle}>LOT SIZE</th>
                <td style={tdStyle}>{info.lotSize}</td>
              </tr>
              <tr style={rowStyle}>
                <th style={thStyle}>HOME AMENITIES</th>
                <td style={tdStyle}>
                  {Array.isArray(info.amenities)
                    ? info.amenities.join(", ")
                    : ""}
                </td>
              </tr>
              <tr style={rowStyle}>
                <th style={thStyle}>SOLD PRICE</th>
                <td style={{ ...tdStyle, fontSize: "1.2em" }}>
                  {info.soldPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Button in Bottom Right */}
      {user?.role === "admin" && (
        <button
          onClick={() => setShowModal(true)}
          style={{
            position: "absolute",
            width: "10%",
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            bottom: "2%",
            right: "3%",
          }}
        >
          Update
        </button>
      )}

      {/* Modal Popup */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "500px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              overflowY: "auto",
              maxHeight: "90vh",
            }}
          >
            <h2
              style={{ marginBottom: "24px", fontSize: "22px", color: "#333" }}
            >
              Edit Info
            </h2>

            {Object.entries(formData).map(([key, value]) => (
              <div key={key} style={{ marginBottom: "20px" }}>
                <label
                  htmlFor={key}
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#444",
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "30px",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  border: "none",
                  color: "white",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const rowStyle = {
  height: "8%",
  margin: "0%",
  fontSize: "0.6em",
  borderBottom: "1px solid black",
};

const thStyle = {
  textAlign: "left",
  color: "grey",
};

const tdStyle = {
  textAlign: "right",
  color: "black",
  fontWeight: "bold",
};
