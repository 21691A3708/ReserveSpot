import React from "react";
import Animation from "./AnimatedText";

export default function Header() {
  return (
    <div
      className="miandiv"
      style={{
        width: "100%",
        height: "35vh",
        backgroundColor: "rgb(227, 225, 215)",
        display: "flex",
        flexDirection: "column",
        padding: "2%",
      }}
    >
      <div
        className="subdiv"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          className="lix"
          style={{
            height: "15%",
            width: "100%",

            display: "flex",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <h4 style={{ color: "black", fontFamily: "'Grande', 'sans-serif'" }}>
            LUXITALIA
          </h4>
        </div>
        <div
          className="headingdiv"
          style={{
            width: "100%",
            height: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "7rem",
            fontFamily: "'Grande', 'sans-serif'",
          }}
        >
          <Animation text="PROJECTS" />
        </div>
      </div>
    </div>
  );
}
