import React from "react";

function ProjectList({ projects, onSelect }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>All Projects</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {projects.map((project) => (
          <div
            key={project._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Show the first image if available */}
            {project.images && project.images.length > 0 && (
              <img
                src={project.images[0].url}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}
            {/* <p>{`/${project.images[0]}`}</p> */}
            <h3 style={{ marginBottom: "10px", textAlign: "center" }}>
              {project.title}
            </h3>
            <p style={{ marginBottom: "10px", textAlign: "center" }}>
              {project.description?.slice(0, 80)}...
            </p>
            <button
              onClick={() => onSelect(project)}
              style={{
                padding: "10px 20px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "auto",
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
