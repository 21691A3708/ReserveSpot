import React, { useState } from "react";
import Homeicon from "./home.png";
import Editicon from "./edit.png";
import Homebackground from "./homebackground.png";
import Performance from "./editbackground.png";
import { useNavigate, useLocation } from "react-router-dom";
export default function Multivi() {
  const [hovered, setHovered] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname !== "/contact") {
      setCheck(true);
    }
  }, [location]);
  return (
    <div
      style={{
        width: "100%",
        minHeight: "75vh",
        margin: "0",
        padding: "0",
        backgroundColor: "rgb(227, 225, 215)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "90vw",
          display: "flex",
          flexDirection: "row",
          gap: "2%",
          flexWrap: "wrap",
        }}
      >
        {/* Homeowner Section */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#690605",
            flex: "1",
            minWidth: "300px",
            height: "50vh",
            padding: "2%",
            color: "white",
            borderRadius: "10px",
            display: "flex",
          }}
        >
          {/* Background image layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${Homebackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",

              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1.2)" : "scale(1)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          />

          {/* Foreground Content */}
          <div style={{ width: "85%", zIndex: 1 }}>
            <h1>Are you a</h1>
            <h1>HomeOwner?</h1>
            <p>
              Are you a homeowner with a design or renovation project? Please
              get in touch to let us know the scope and timeline below.
            </p>
            <div style={{ marginTop: "auto", textAlign: "right" }}>
              {check === true && (
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#690605",
                    width: "10em",
                    height: "3em",
                    borderRadius: "50px",
                    border: "2px solid white",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/contact")}
                >
                  Get in touch
                </button>
              )}
            </div>
          </div>

          {/* Icon */}
          <div
            style={{
              width: "15%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                background: "#6a0705",
                borderRadius: "50%",
              }}
            >
              <img
                src={Homeicon}
                alt="Home Icon"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Professional Section (left as-is) */}
        <div
          onMouseEnter={() => setHovered1(true)}
          onMouseLeave={() => setHovered1(false)}
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#012902",
            flex: "1",
            minWidth: "300px",
            height: "50vh",
            padding: "2%",
            color: "white",
            borderRadius: "10px",
            display: "flex",
          }}
        >
          {/* Background image layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${Performance})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",

              opacity: hovered1 ? 1 : 0,
              transform: hovered1 ? "scale(1.2)" : "scale(1)",
              transition: "opacity 1s ease, transform 1s ease",
              pointerEvents: "none",
            }}
          />

          <div style={{ width: "85%" }}>
            <h1>Are you an architect,</h1>
            <h1>developer</h1>
            <p>
              Are you an industry professional with a design or renovation
              project? Please get in touch to let us know the scope and timeline
              below.
            </p>
            <div style={{ marginTop: "auto", textAlign: "right" }}>
              {check === true && (
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#012902",
                    width: "10em",
                    height: "3em",
                    borderRadius: "50px",
                    border: "2px solid white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    console.log("Navigating to contact");
                    navigate("/contact");
                  }}
                >
                  Get in touch
                </button>
              )}
            </div>
          </div>
          <div
            style={{
              width: "15%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                background: "#012902",
                borderRadius: "50%",
              }}
            >
              <img
                src={Editicon}
                alt="Edit Icon"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
