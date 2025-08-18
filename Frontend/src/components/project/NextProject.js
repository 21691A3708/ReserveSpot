import React from "react";
import { Link } from "react-router-dom";

export default function NextProject({ nextProject }) {
  if (!nextProject) {
    return <div> </div>;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="innerdiv" style={{ width: "100%", height: "100%" }}>
        <div
          className="headerdiv"
          style={{
            width: "100%",
            height: "25%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          <pre style={{ color: "gray" }}>NEXT PROJECT </pre>
          <pre>{nextProject?.title || "UNTITLED"}</pre>
        </div>

        <div
          className="bodydiv"
          style={{
            width: "100%",
            height: "75%",
            justifyContent: "space-evenly",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="div1"
            style={{
              width: `${Math.max(15, nextProject?.id?.length || 5)}%`,
              height: "100%",
              padding: "20px",
            }}
          >
            {nextProject?.id
              ? nextProject.id.slice(-5).toUpperCase()
              : "ID-N/A"}
          </div>

          <div
            className="maindiv"
            style={{ width: "80%", height: "100%", position: "relative" }}
          >
            <h1
              style={{
                fontSize: "4em",
                position: "absolute",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                top: "-10%",
                right: "30%",
                textShadow: "5px 0px 0px black",
              }}
            >
              {nextProject?.title || "TITLE"}
            </h1>
            <Link
              to={`/mprojects/${nextProject.id}`}
              style={{ width: "100%", height: "100%", display: "block" }}
            >
              <div
                className="div2"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${nextProject?.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  padding: "20px",
                  cursor: "pointer",
                }}
              >
                <div style={{ width: "100%", height: "100%" }} />
              </div>
            </Link>
          </div>

          <div
            className="div3"
            style={{
              width: `${Math.max(15, nextProject?.title?.length || 10)}%`,
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Link to="/mprojects" style={{ textDecoration: "none" }}>
              <p
                style={{
                  color: "gray",
                  fontSize: "0.9rem",
                  paddingRight: "20px",
                }}
              >
                {" "}
                SEE ALL PROJECTS
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
