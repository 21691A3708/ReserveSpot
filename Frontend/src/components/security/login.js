import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// Token Handling
const setToken = (token) => localStorage.setItem("token", token);
const getToken = () => localStorage.getItem("token");
const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
};
const getUser = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "/api/auth",
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        toast.error("Session expired or invalid token. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const user = getUser();
    if (!isTokenValid()) {
      localStorage.removeItem("token");
    } else if (user?.role === "admin") {
      navigate("/admin/projects");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.identifier.trim()) {
      toast.error("Please enter your email or username.");
      setLoading(false);
      return;
    }
    if (!form.password.trim()) {
      toast.error("Password cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/login", form);
      const { token } = res.data;
      setToken(token);

      const id = toast.loading("Logging in...");
      setTimeout(() => {
        toast.update(id, {
          render: "Logged in!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }, 1500);

      const user = getUser();
      user?.role === "admin" ? navigate("/admin/projects") : navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#0d6efd",
          }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          {loading && (
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div>Logging in... Please wait.</div>
            </div>
          )}

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="identifier" style={labelStyle}>
              Email or Username
            </label>
            <input
              type="text"
              id="identifier"
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              style={inputStyle}
              placeholder="Enter your email or username"
              disabled={loading}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={inputStyle}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#0d6efd", textDecoration: "none" }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Reusable Inline Styles
const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "600",
  color: "#333",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "14px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#0d6efd",
  color: "#fff",
  fontWeight: "600",
  fontSize: "15px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
};
