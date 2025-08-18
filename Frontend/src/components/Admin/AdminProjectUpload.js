// Keep all your imports the same
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import SidebarNav from "./SidebarNav";
import AddProjectForm from "./AddProjectForm";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import AllBookings from "./AllBookings";
import Mainvideo from "./AdminVideoUpload";

import { getAuthHeaders } from "../utils/auth";

const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function AdminProjectUpload() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [view, setView] = useState("list");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else navigate("/login");
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/projects", {
        headers: getAuthHeaders(),
      });
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      toast.error("Could not fetch projects.");
    }
  };

  useEffect(() => {
    if (view === "list") fetchProjects();
  }, [view]);

  const handleProjectDeleted = (deletedId) => {
    setProjects((prev) => prev.filter((p) => p._id !== deletedId));
    setSelectedProject(null);
  };

  const handleProjectUpdated = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === updatedProject._id ? updatedProject : p))
    );
    setSelectedProject(updatedProject);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Toggle Button */}
      {!sidebarVisible && (
        <span
          style={{
            position: "fixed",
            top: "20px",
            right: "20px", // Right side now
            zIndex: 2001,
            fontSize: "24px",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "6px",

            cursor: "pointer",
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
          onClick={() => setSidebarVisible(true)}
        >
          <FaBars />
        </span>
      )}

      {/* Overlay */}
      {sidebarVisible && (
        <div
          onClick={() => setSidebarVisible(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 999,
          }}
        />
      )}

      {/* Right Sidebar */}
      {sidebarVisible && (
        <SidebarNav
          user={user}
          setView={setView}
          navigate={navigate}
          onClose={() => setSidebarVisible(false)}
        />
      )}

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#f9fafb",
          overflowY: "auto",
          transition: "margin-right 0.3s",
          marginRight: sidebarVisible ? "270px" : "0", // Adjusted for right sidebar
        }}
      >
        {view === "list" &&
          (selectedProject ? (
            <ProjectDetails
              project={selectedProject}
              onBack={() => setSelectedProject(null)}
              onProjectDeleted={handleProjectDeleted}
              onProjectUpdated={handleProjectUpdated}
            />
          ) : (
            <ProjectList projects={projects} onSelect={setSelectedProject} />
          ))}
        {view === "add" && <AddProjectForm setView={setView} />}
        {view === "bookings" && <AllBookings setView={setView} />}
        {view === "video" && <Mainvideo setView={setView} />}
      </main>
    </div>
  );
}

export default AdminProjectUpload;
