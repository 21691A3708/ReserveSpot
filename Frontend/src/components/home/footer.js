import React from "react";

export default function footer() {
  return (
    <div
      className="maindivfooter"
      style={{
        width: "100%",
        height: "6vh",
        // background: "blue",
      }}
    >
      <div
        className="subdiv"
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          fontFamily: "Suisseintl sans-serif",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          // fontWeight: "bold",
          textAlign: "start",
          backgroundColor: "rgb(0, 43, 0)",
          color: "white",
        }}
      >
        <div
          className="data1"
          style={{ width: "50vw" }}
          // style={{ flex: 2, backgroundColor: "rgb(0, 43, 0)", color: "white" }}
        >
          <p>ALL RIGHTS RESERVED ©LUXITALIA</p>
        </div>
        <div
          className="data2"
          style={{
            width: "27.5vw",
            // // flex: 1,
            // backgroundColor: "blue",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            // alignItems: "center",
            // color: "white",
            // fontSize: "12px",
            // fontWeight: "bold",
            // textAlign: "center",
            // padding: "0px 10px",
          }}
        >
          <div>
            <p>34°3'44"N </p>
          </div>
          <p>118°19'14.8"W</p>
          <div></div>
        </div>
        <div
          className="data3"
          style={{
            width: "27.5vw",

            // // flex: 1,
            // backgroundColor: "violet",
            // color: "white",
            // padding: "0px 10px",
            // fontSize: "12px",
            // fontWeight: "bold",
            // textAlign: "center",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
          }}
        >
          <div style={{ padding: "0px 20%" }}>
            <p style={{ textAlign: "end", padding: "0,50%" }}>
              Permit Number - 229120192
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
