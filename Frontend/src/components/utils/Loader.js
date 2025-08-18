// src/components/Loader.js
import React from "react";
// import "./Loader.css";
import "./loder2.css";

export default function Loader() {
  return (
    <div
      class="maondiv"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loader">
        {[...Array(8)].map((_, i) => (
          <div className={`box box${i}`} key={i}>
            <div></div>
          </div>
        ))}
        <div className="ground">
          <div></div>
        </div>
      </div>
    </div>
  );
}
