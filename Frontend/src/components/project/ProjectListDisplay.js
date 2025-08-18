import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectListDisplay() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);
  // const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
      .get("/api/display/")
      .then((response) => {
        const fetchedData = response.data;
        setData(fetchedData);
        setFilteredData(fetchedData);

        // Extract unique addresses
        const uniqueAddresses = [
          ...new Set(fetchedData.map((item) => item.address)),
        ];
        setAddresses(uniqueAddresses);

        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedAddress === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.address === selectedAddress));
    }
  }, [selectedAddress, data]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          fontSize: "24px",
          opacity: 0.5,
        }}
      ></div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          fontSize: "24px",
          color: "red",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <>
      {/* Scroll Progress Bar */}
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

      {/* Address Filter Dropdown
      <motion.div
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "rgb(227, 225, 215)",
        }}
      >
        <select
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          <option value="all">All Addresses</option>
          {addresses.map((addr, i) => (
            <option key={i} value={addr}>
              {addr}
            </option>
          ))}
        </select>
      </motion.div> */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "10px",
          overflowX: "auto",
          backgroundColor: "rgb(227, 225, 215)",
        }}
      >
        <div
          onClick={() => setSelectedAddress("all")}
          style={{
            padding: "10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor:
              selectedAddress === "all" ? "#e0e0e0" : "transparent",
            borderBottom: "1px solid #ccc",
          }}
        >
          All Addresses |
        </div>
        {addresses.map((addr, i) => (
          <div
            key={i}
            onClick={() => setSelectedAddress(addr)}
            style={{
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor:
                selectedAddress === addr ? "#e0e0e0" : "transparent",
              borderBottom: "1px solid #ccc",
            }}
          >
            {addr + " ||"}
          </div>
        ))}
      </div>

      {/* Project Cards */}
      {filteredData.map((item, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(227, 225, 215)",
          }}
        >
          <div
            style={{
              height: "10%",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            №{String(index + 1).padStart(4, "0")}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            style={{
              height: "80%",
              overflow: "hidden",
              padding: "0 10px",
            }}
          >
            <Link
              to={`/mprojects/${item.id}`}
              style={{
                height: "80%",
                overflow: "hidden",
              }}
            >
              <img
                src={item.image.url}
                alt={item.title || "No Title"}
                onMouseEnter={() => setHoveredIndex(true)}
                onMouseLeave={() => setHoveredIndex(false)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.8s ease",
                  cursor: "pointer",
                }}
              />
            </Link>
          </motion.div>

          <div
            style={{
              height: "20%",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: "5px 0" }}>{item.title}</h3>
            <p style={{ margin: 0 }}>{item.address}</p>
          </div>
        </div>
      ))}
    </>
  );
}
