import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Animation from "./AnimatedText";
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
export default function Bottemnav({ data, refreshData }) {
  const { address, facebook, instagram, twitter, mobile, email } = data || {};
  const [user, setUser] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    mobile: "",
    email: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });

  useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    setFormData({ address, facebook, instagram, twitter, mobile, email });
  }, [address, facebook, instagram, twitter, mobile, email]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const validateInputs = () => {
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)?([\w.-]+)+(\.[a-z]{2,})(\/\S*)?$/i;

    if (!formData.address.trim()) {
      toast.error("📍 Address is required.");
      return false;
    }

    if (!mobileRegex.test(formData.mobile)) {
      toast.error(
        "📱 Invalid mobile number. Must be 10 digits and start with 6-9."
      );
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("📧 Invalid email format.");
      return false;
    }

    const socialFields = ["instagram", "facebook", "twitter"];
    for (let field of socialFields) {
      const value = formData[field];
      if (value && !urlRegex.test(value)) {
        toast.error(`🔗 Invalid URL in ${field.toUpperCase()}`);
        return false;
      }
    }

    return true;
  };

  const handleUpdate = async () => {
    if (!validateInputs()) return;

    try {
      const res = await fetch("/api/home/home", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("✅ Updated successfully!");
        refreshData?.();
      } else {
        toast.error(`❌ Error: ${result.message}`);
      }
    } catch (err) {
      toast.error("❌ Network or server error.");
    }

    setIsModalOpen(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    fontSize: "1em",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  return (
    <div
      className="mainsection"
      style={{
        width: "100%",
        height: "50vh",
        backgroundColor: "rgb(227, 225, 215)",
        display: "flex",
        flexDirection: "row",
        position: "relative",
        overflow: "hidden",
        wordWrap: "break-word",
        boxSizing: "border-box",
      }}
    >
      <div className="tittle" style={{ width: "46%", padding: "2% 0 0 2%" }}>
        <h1
          style={{
            fontSize: "5em",
            fontWeight: "400",
            fontFamily: "'Grande', 'sans-serif'",
            margin: 0,
            overflow: "hidden",
            wordWrap: "break-word",
            boxSizing: "border-box",
          }}
        >
          <Animation text="LUXITALIA" />
        </h1>
      </div>
      <div className="anotherside" style={{ width: "46%", padding: "2%" }}>
        <div className="textdiv" style={{ height: "20%" }}>
          <p>{address}</p>
        </div>
        <div style={{ display: "flex", height: "80%" }}>
          <div
            className="menu"
            style={{ width: "30%", display: "flex", flexDirection: "column" }}
          >
            <p style={{ color: "rgb(157, 154, 140)" }}>MENU</p>
            <span>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </Link>
            </span>
            <span>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "black" }}
              >
                About
              </Link>
            </span>
            <span>
              <Link
                to="/projects"
                style={{ textDecoration: "none", color: "black" }}
              >
                Projects
              </Link>
            </span>
            <span>
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "black" }}
              >
                Contact
              </Link>
            </span>
          </div>

          <div className="phone" style={{ width: "40%" }}>
            <p style={{ color: "rgb(157, 154, 140)" }}>PHONE</p>
            <p>{mobile}</p>
            <p style={{ color: "rgb(157, 154, 140)" }}>EMAIL</p>
            <p>{email}</p>
          </div>

          <div className="socialmedia" style={{ width: "30%" }}>
            <p style={{ color: "rgb(157, 154, 140)" }}>SOCIAL</p>
            <button
              onClick={() => window.open(instagram, "_blank")}
              style={{
                background: "none",
                border: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              <span>INSTAGRAM</span>
            </button>
            <button
              onClick={() => window.open(facebook, "_blank")}
              style={{
                background: "none",
                border: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              <span>FACEBOOK</span>
            </button>
            <button
              onClick={() => window.open(twitter, "_blank")}
              style={{
                background: "none",
                border: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              <span>TWITTER</span>
            </button>
          </div>
        </div>
      </div>
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
          }}
          title="Edit Info"
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
            width: "100%",
            height: "100%",
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
              padding: "3%",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "500px",
              height: "85%",
              scale: "1.2",
              overflowY: "auto",
            }}
          >
            <h3>Edit Footer Info</h3>

            {/* Contact Info */}
            <h4 style={{ color: "#4CAF50", marginBottom: "0.5rem" }}>
              📞 Contact Info
            </h4>
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              style={inputStyle}
            />

            <label>Mobile</label>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              style={inputStyle}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={inputStyle}
            />

            {/* Social Links */}
            <h4 style={{ color: "#4CAF50", marginBottom: "0.5rem" }}>
              🔗 Social Media
            </h4>
            <label>Instagram</label>
            <input
              type="text"
              placeholder="Instagram URL"
              value={formData.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              style={inputStyle}
            />

            <label>Facebook</label>
            <input
              type="text"
              placeholder="Facebook URL"
              value={formData.facebook}
              onChange={(e) => handleChange("facebook", e.target.value)}
              style={inputStyle}
            />

            <label>Twitter</label>
            <input
              type="text"
              placeholder="Twitter URL"
              value={formData.twitter}
              onChange={(e) => handleChange("twitter", e.target.value)}
              style={inputStyle}
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

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
}
