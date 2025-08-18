import React, { useEffect, useState } from "react";
import axios from "axios";
import HeadContact from "./headContact";
import Multivi from "../home/multivi";
import Send from "../home/send";
import Map from "../home/map";
import Bottemnav from "../home/bottemnav";
import Footer from "../home/footer";

export default function Contact() {
  const [homeData, setHomeData] = useState(null);
  const [des2, setdes2] = useState({});
  const [des3, setdes3] = useState({});
  const [des4, setdes4] = useState({});
  const [scrollTop, setScrollTop] = useState(0);
  const [showSections, setShowSections] = useState({
    head: false,
    multivi: false,
    send: false,
    map: false,
    bottem: false,
    footer: false,
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const winScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollTop(scrolled);
  };

  useEffect(() => {
    axios
      .get("/api/home/home")
      .then((res) => setHomeData(res.data))
      .catch((err) => console.error("Error fetching home data:", err));
  }, []);

  useEffect(() => {
    if (homeData) {
      setdes2({ mobile: homeData.mobile, email: homeData.email });
      setdes3({ mapLink: homeData.mapLink });
      setdes4({
        mobile: homeData.mobile,
        email: homeData.email,
        address: homeData.address,
        facebook: homeData.facebook,
        instagram: homeData.instagram,
        twitter: homeData.twitter,
      });
    }
  }, [homeData]);

  // Show sections with delay for animation
  useEffect(() => {
    const timeouts = [
      setTimeout(() => setShowSections((s) => ({ ...s, head: true })), 100),
      setTimeout(() => setShowSections((s) => ({ ...s, multivi: true })), 400),
      setTimeout(() => setShowSections((s) => ({ ...s, send: true })), 700),
      setTimeout(() => setShowSections((s) => ({ ...s, map: true })), 1000),
      setTimeout(() => setShowSections((s) => ({ ...s, bottem: true })), 1300),
      setTimeout(() => setShowSections((s) => ({ ...s, footer: true })), 1600),
    ];
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const fadeStyle = (visible) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(30px)",
    transition: "opacity 1s ease, transform 1s ease",
  });

  const hrlineStyle = {
    width: "100%",
    margin: "0",
    backgroundColor: "rgb(227, 225, 215)",
  };

  if (!homeData) return <div>Loading...</div>;

  return (
    <>
      {/* Scroll progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${scrollTop}%`,
          height: "5px",
          backgroundColor: "#4caf50",
          zIndex: 9999,
          transition: "width 0.25s ease-out",
        }}
      />

      {/* Animated Sections */}
      <div style={fadeStyle(showSections.head)}>
        <HeadContact />
      </div>

      <hr style={hrlineStyle} />

      <div style={fadeStyle(showSections.multivi)}>
        <Multivi />
      </div>

      <hr style={hrlineStyle} />

      <div style={fadeStyle(showSections.send)}>
        <Send data={des2} />
      </div>

      <hr style={hrlineStyle} />

      <div style={fadeStyle(showSections.map)}>
        <Map data={des3} />
      </div>

      <div style={fadeStyle(showSections.bottem)}>
        <Bottemnav data={des4} />
      </div>

      <div style={fadeStyle(showSections.footer)}>
        <Footer />
      </div>
    </>
  );
}
