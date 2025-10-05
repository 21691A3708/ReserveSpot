import React from "react";
import { motion } from "framer-motion";
import Second from "../About/about.mp4";
import Animated from "./AnimatedText";

export default function head() {
  return (
    <div
      className="maindiv"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}>
      <motion.div
        className="subdiv"
        style={{ width: "60%", height: "100%" }}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}>
        <div
          className="firstdiv"
          style={{
            width: "100%",
            height: "10%",
            padding: "3%",
            fontFamily: "'Grande', 'sans-serif'",
          }}>
          <p>ReserveSpot</p>
        </div>
        <div
          className="firstdiv"
          style={{
            width: "100%",
            height: "40%",
            paddingTop: "2%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}>
          <h1
            style={{
              textAlign: "center",
              fontSize: "9vw",
              fontFamily: "'Grande', 'sans-serif'",
              padding: "0 3%",
              margin: 0,
              wordWrap: "break-word",
              overflow: "hidden",
            }}>
            <Animated text="ReserveSpot" />
          </h1>
        </div>
        <div
          className="main"
          style={{
            width: "100%",
            height: "50%",
            display: "flex",
            flexDirection: "row",
          }}>
          <div
            className="div"
            style={{
              width: "30%",
              height: "100%",
            }}></div>
          <motion.div
            className="div2"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: false, amount: 0.2 }}
            style={{
              width: "35%",
              height: "100%",
              fontSize: "0.69rem",
              padding: "2%",
              overflow: "auto",
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}>
            <p>
              ReserveSpot is the only importer of unique, curated, sustainable
              and customizable high-end furniture, cabinets, materials,
              finishings and one-of-a-kind details exclusively shipped directly
              from the most prominent luxury brands in Italy and Europe
            </p>
            <p>
              Through its long-standing relationships with the finest furniture
              manufacturers and finishings companies, ReserveSpot is able to
              offer access to a full range of furnishing possibilities for the
              most prestigious homes in Los Angeles and beyond. We are the only
              luxury destination that is able to provide a full range of
              finishings, materials, custom furniture and cabinetry for all your
              high-end furnishing and finishing needs.
            </p>
          </motion.div>
          <motion.div
            className="div3"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: false, amount: 0.2 }}
            style={{
              width: "35%",
              height: "100%",
              padding: "2%",
              fontSize: "0.7rem",
              overflow: "auto",
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}>
            <p>
              We cater to home buyers, interior designers, real estate agents,
              developers, architects, general contractors, rental properties and
              hospitality companies in order to find tailored solutions for new
              developments or renovations, to create the most refined design
              experiences.
            </p>
            <p>
              Behind ReserveSpot is Elliot J. Spiegel, a veteran of the luxury
              real estate space, who grounds the platform in his knowledge of
              materials, furnishings and design. Through his expertise,
              ReserveSpot is able to provide exclusive furniture and import
              services to create timeless homes and developments for the most
              discerning buyers.
            </p>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="subdiv2"
        style={{ width: "40%", height: "100%" }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: false, amount: 0.2 }}>
        <div className="sub" style={{ width: "100%", height: "100%" }}>
          <video
            src={Second}
            autoPlay
            muted
            loop
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
