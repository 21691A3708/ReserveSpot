import React from "react";
import AnimatedText from "../utils/AnimatedText";

export default function headContact() {
  return (
    <>
      <div
        className="miandiv"
        style={{
          width: "100%",
          height: "75vh",
          backgroundColor: "rgb(227, 225, 215)",
        }}>
        <div
          className="div1"
          style={{
            width: "100%",
            height: "10%",
            padding: "2%",
            fontFamily: "'Grande', 'sans-serif'",
          }}>
          ReserveSpot
        </div>
        <div
          className="div2"
          style={{
            width: "100%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Grande', 'sans-serif'",
            fontSize: "6em",
            overflow: "hidden",
            wordWrap: "break-word",
            boxSizing: "border-box",
          }}>
          <h1 style={{ fontSize: "2em" }}>
            <AnimatedText text="Contact" />
          </h1>
          <h1 style={{ fontSize: "2em" }}>
            {" "}
            <AnimatedText text="US" />
          </h1>
        </div>
      </div>
    </>
  );
}
