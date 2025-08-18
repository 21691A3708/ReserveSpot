import React from "react";
import ProjectDetails from "./desctext";
import BookingForm from "./Bookingform";

export default function Text({ desc }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <ProjectDetails desc={desc} />
      <BookingForm desc={desc} />
    </div>
  );
}
