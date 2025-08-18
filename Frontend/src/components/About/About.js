import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "./head";
import Send from "../home/send";
import Map from "../home/map";
import Features from "./features";
import Bottemnav from "../home/bottemnav";
import Footer from "../home/footer";

export default function About() {
  const [homeData, setHomeData] = useState(null);

  const [des2, setdes2] = useState({});
  const [des3, setdes3] = useState({});
  const [des4, setdes4] = useState({});
  const [scrollTop, setScrollTop] = useState(0);
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
      setdes2(newItems2);
      const newItems3 = {
        mapLink: homeData.mapLink,
      };
      setdes3(newItems3);
      const newItems4 = {
        mobile: homeData.mobile,
        email: homeData.email,
        address: homeData.address,
        facebook: homeData.facebook,
        instagram: homeData.instagram,
        twitter: homeData.twitter,
      };
      setdes4(newItems4);
    }
  }, [homeData]);

  if (!homeData) return <div></div>;
  console.log(homeData);

  const hrlineStyle = () => {
    return {
      width: "100%",
      margin: "0",

      backgroundColor: "rgb(227, 225, 215)",
    };
  };
  return (
    <>
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
      <Head />
      {/* <Features /> */}
      <Send data={des2} />
      <hr style={hrlineStyle()} />
      <Map data={des3} />
      <Bottemnav data={des4} />
      <Footer />
    </>
  );
}
