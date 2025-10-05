import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import logo from "./sidebarlogo.jpg";

export default function RightSideNavbar() {
  const [homeData, setHomeData] = useState(null);
  const [des1, setdes1] = useState({});
  useEffect(() => {
    axios
      .get("/api/home/home") // correct endpoint
      .then((res) => setHomeData(res.data))
      .catch((err) => console.error("Error fetching home data:", err));
  }, []);
  useEffect(() => {
    if (homeData) {
      const newItems2 = {
        mobile: homeData.mobile,
        email: homeData.email,
      };
      setdes1(newItems2);
    }
  }, [homeData]);

  const MainDesign = () => {
    return {
      height: "100vh",
      backgroundColor: "rgb(0, 43, 0)",
      position: "fixed",
      right: "0",
      top: "0",
      bottom: "0",
      left: "auto",
      width: "30vw",
      padding: "2.5%",
      paddingRight: "5%",
      margin: "0",
      fontFamily: "Arial, sans-serif",
      fontSize: "1vw",
    };
  };
  const ButtenStyling = ({ isActive }) => {
    return {
      // backgroundColor: "",
      // color: "white",
      textAlign: "left",
      textDecoration: "none",
      fontSize: "1vw",
      fontWeight: "bold",
      border: "none",
      padding: "0.25vw 1vw",
      margin: "0.5vw",
      width: "15dvw",
      color: isActive ? "white" : "#d015bd",
      // backgroundColor: isActive ? "rgb(31, 235, 31)" : "transparent",
    };
  };
  return (
    <menu className="maindivforsidenavbar" style={MainDesign()}>
      <div className="top">
        <section className="subdiv" style={{ display: "flex", gap: "20vw" }}>
          <Link
            style={{
              textDecoration: "none",
              cursor: "none",
              color: "white",
              fontSize: "0.6vw",
              paddingLeft: "2vw",
              width: "15%",
              height: "8%",
            }}
            to="/">
            MENU
          </Link>
        </section>
        <nav
          style={{
            padding: "0vw 0vh",
            margin: "0vw 0vh",
          }}>
          <div
            className="bodysubdiv"
            style={{
              fontWeight: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignContent: "start",
              padding: "0vw 0vh",
              margin: "0vw 0vh",
              gap: "2vh",
              fontSize: "1vw",
              marginTop: "5vh",
            }}>
            <NavLink to="/mhome" style={ButtenStyling}>
              HOME
            </NavLink>

            <NavLink to="/about" style={ButtenStyling}>
              ABOUT US
            </NavLink>
            <NavLink to="/mprojects" style={ButtenStyling}>
              PROJECTS
            </NavLink>

            <NavLink to="/contact" style={ButtenStyling}>
              CONTACT
            </NavLink>
          </div>
        </nav>
      </div>

      <section className="logomaindiv">
        <div
          className="logosubdiv"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "1vw 0vh",
            padding: "5vh",
            position: "relative",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const img = e.currentTarget.querySelector("img");
            const underline = e.currentTarget.querySelector(".underline");

            if (img) img.style.transform = "scale(1.1)";
            if (underline) underline.style.width = "100%";
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector("img");
            const underline = e.currentTarget.querySelector(".underline");

            if (img) img.style.transform = "scale(1)";
            if (underline) underline.style.width = "0%";
          }}>
          <div style={{ width: "75px", height: "75px" }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                transition: "transform 0.3s ease",
              }}
            />
          </div>

          <div className="div" style={{ marginTop: "2vh" }}>
            <strong
              style={{
                color: "white",
                fontSize: "0.75vw",
                position: "relative",
              }}>
              CONTACT US: {des1.mobile}
              <span
                className="underline"
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "-2px",
                  height: "2px",
                  width: "0%",
                  backgroundColor: "white",
                  transition: "width 0.3s ease",
                }}></span>
            </strong>
          </div>
        </div>
      </section>

      <footer
        style={{
          position: "absolute",
          bottom: "14%",
          width: "100%",
        }}>
        <div className="futterdiv">
          <div
            className="subdiv"
            style={{
              display: "flex",
              justifyContent: "start",
              alignContent: "end",
              alignItems: "end",
              margin: "0vw 0vh",
              padding: "0vw 0vh",
            }}>
            <div>
              <p
                style={{
                  fontSize: "0.8vw",
                  color: "white",
                  position: "absolute",
                }}>
                <Link to="/reel" style={{ color: "white" }}>
                  {" "}
                  <span>▶</span>VIEW ReserveSpot SHOWREEL
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </menu>
  );
}
