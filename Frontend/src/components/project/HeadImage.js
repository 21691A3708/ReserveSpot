import React from "react";
import Animation from "./AnimatedText";
import Animaction2 from "./Animaction2";
export default function HeadImage({ items }) {
  if (!items || !items.title || !items.imageUrl || !items.address) {
    return <div></div>; // Handle missing data
  }

  return (
    <div
      className="maindivforsizing"
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${items.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div
        className="headerdiv"
        style={{
          width: "100%",
          height: "15%",
          // backgroundColor: "black",
          display: "flex",
          justifyItems: "flex-start",
          alignItems: "flex-start",
          color: "white",
          fontSize: "1rem",
          padding: "1rem",
          fontFamily: "'Grande', 'sans-serif'",
        }}>
        ReserveSpot
      </div>
      <div
        className="tittlediv"
        style={{
          width: "100%",
          height: "15%",
          // backgroundColor: "blue",
          color: "white",
          display: "flex",
          flexDirection: "row",
        }}>
        <div
          style={{
            width: "15%",
            // backgroundColor: "red",
            height: "100%",
            color: "grey",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "1rem",
            fontSize: "1rem",
            fontFamily: "'Grande', 'sans-serif'",
          }}>
          №0001
        </div>
        <div
          className="div"
          style={{
            width: "65%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            color: "white",
            padding: "1rem",
            boxSizing: "border-box",
            overflow: "hidden",
          }}>
          <h1
            style={{
              fontSize: "5rem",
              width: "100%",
              height: "100%",
              fontFamily: "'Grande', 'sans-serif'",
              textAlign: "center",
            }}>
            <Animation text={items.title} /> {/* Use the Animation component */}
            {/* {items.title} */}
          </h1>
        </div>
      </div>
      <div className="bodydiv" style={{ width: "100%", height: "55%" }}></div>
      <div
        className="footerdiv"
        style={{
          width: "100%",
          height: "15%",
          // backgroundColor: "red",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <div style={{ width: "20%", height: "100%" }}></div>
        <div
          style={{
            width: "85%",
            height: "100%",
            // backgroundColor: "black",
            color: "white",
            display: "flex",
            // padding: "2rem",
            justifyContent: "flex-start",
            fontFamily: "'Grande', 'sans-serif'",
            fontWeight: "bold",
            overflow: "hidden",
            boxSizing: "border-box",
            padding: "3%",
          }}>
          <Animaction2 text={items.address} />{" "}
          {/* Use the Animation component */}
          {/* {items.address} */}
        </div>
      </div>
    </div>
  );
}
