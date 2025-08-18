// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Slider from "./Slider";
// import Text from "./text";
// import Multivi from "./multivi";
// import Send from "./send";
// import Map from "./map";
// import Bottemnav from "./bottemnav";
// import Footer from "./footer";

// export default function Mhome() {
//   const [homeData, setHomeData] = useState(null);
//   const [des1, setdes1] = useState({});
//   const [des2, setdes2] = useState({});
//   const [des3, setdes3] = useState({});
//   const [des4, setdes4] = useState({});
//   const [scrollTop, setScrollTop] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [firstloding, setFirstLoading] = useState(true);

//   const handleScroll = () => {
//     const winScroll =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const height =
//       document.documentElement.scrollHeight -
//       document.documentElement.clientHeight;
//     const scrolled = (winScroll / height) * 100;
//     setScrollTop(scrolled);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     axios
//       .get("/api/home/home")
//       .then((res) => {
//         setHomeData(res.data);
//         setIsLoaded(true);
//       })
//       .catch((err) => console.error("Error fetching home data:", err));
//   }, []);

//   useEffect(() => {
//     if (homeData) {
//       const newItems = {
//         description: homeData.description,
//       };
//       setdes1(newItems);
//       const newItems2 = {
//         mobile: homeData.mobile,
//         email: homeData.email,
//       };
//       setdes2(newItems2);
//       const newItems3 = {
//         mapLink: homeData.mapLink,
//       };
//       setdes3(newItems3);
//       const newItems4 = {
//         mobile: homeData.mobile,
//         email: homeData.email,
//         address: homeData.address,
//         facebook: homeData.facebook,
//         instagram: homeData.instagram,
//         twitter: homeData.twitter,
//       };
//       setdes4(newItems4);
//     }
//   }, [homeData]);

//   if (!homeData) return <div></div>;
//   // console.log(homeData);

//   const hrlineStyle = () => {
//     return {
//       width: "100%",
//       margin: "0",
//       backgroundColor: "rgb(227, 225, 215)",
//     };
//   };

//   // Refined opacity calculation function
//   const getOpacity = () => {
//     return isLoaded ? 1 : 0; // Set opacity to 1 when data is loaded, else 0
//   };

//   return (
//     <>
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: `${scrollTop}%`,
//           height: "5px",
//           backgroundColor: "#4caf50",
//           zIndex: 9999,
//           transition: "width 0.25s ease-out",
//         }}
//       />
//       {/* Apply fade-in animation when data is loaded */}
//       <div
//         className="slider-container"
//         style={{
//           opacity: getOpacity(),
//           transition: "opacity 1.2s ease-in-out", // Smooth transition for 1.2 seconds
//         }}
//       >
//         <Slider />
//       </div>
//       <div
//         className="text-container"
//         style={{
//           opacity: getOpacity(),
//           transition: "opacity 1.2s ease-in-out", // Smooth transition for 1.2 seconds
//         }}
//       >
//         <Text data={des1} />
//       </div>
//       <hr style={hrlineStyle()} />
//       <div
//         className="multivi-container"
//         style={{
//           opacity: getOpacity(),
//           transition: "opacity 1.2s ease-in-out", // Smooth transition for 1.2 seconds
//         }}
//       >
//         <Multivi />
//       </div>
//       <hr style={hrlineStyle()} />
//       <div
//         className="send-container"
//         style={{
//           opacity: getOpacity(),
//           transition: "opacity 1.2s ease-in-out", // Smooth transition for 1.2 seconds
//         }}
//       >
//         <Send data={des2} />
//       </div>
//       <hr style={hrlineStyle()} />
//       <div
//         className="map-container"
//         style={{
//           opacity: getOpacity(),
//           transition: "opacity 1.2s ease-in-out", // Smooth transition for 1.2 seconds
//         }}
//       >
//         <Map data={des3} />
//       </div>
//       <div
//         className="bottemnav-container"
//         style={{
//           opacity: getOpacity(),
//           transition: "opacity 1.2s ease-in-out", // Smooth transition for 1.2 seconds
//         }}
//       >
//         <Bottemnav data={des4} />
//       </div>
//       <Footer />
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "./Slider";
import Text from "./text";
import Multivi from "./multivi";
import Send from "./send";
import Map from "./map";
import Bottemnav from "./bottemnav";
import Footer from "./footer";

export default function Mhome() {
  const [homeData, setHomeData] = useState(null);
  const [des1, setdes1] = useState({});
  const [des2, setdes2] = useState({});
  const [des3, setdes3] = useState({});
  const [des4, setdes4] = useState({});
  const [scrollTop, setScrollTop] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [firstloding, setFirstLoading] = useState(true);
  const [project, setProject] = useState([]);

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
      .get("/api/home/home")
      .then((res) => {
        setHomeData(res.data);
        setIsLoaded(true);
      })
      .catch((err) => console.error("Error fetching home data:", err));

    axios
      .get("/api/home/")
      .then((res) => {
        setProject(res.data); // array of project items
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);
  // console.log(project);

  useEffect(() => {
    if (homeData) {
      setdes1({ description: homeData.description });
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

  if (!homeData)
    return <div style={{ backgroundColor: "rgb(227, 225, 215)" }}></div>;

  const hrlineStyle = {
    width: "100%",
    margin: "0",
    backgroundColor: "rgb(227, 225, 215)",
  };

  const getOpacity = () => (isLoaded ? 1 : 0);

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
      <div
        className="slider-container"
        style={{
          opacity: getOpacity(),
          transition: "opacity 1.2s ease-in-out",
        }}
      >
        <Slider data={project} />{" "}
        {/* 👈 make sure Slider.js expects `data` not `project` */}
      </div>
      <div
        className="text-container"
        style={{
          opacity: getOpacity(),
          transition: "opacity 1.2s ease-in-out",
        }}
      >
        <Text data={des1} />
      </div>
      <hr style={hrlineStyle} />
      <div
        className="multivi-container"
        style={{
          opacity: getOpacity(),
          transition: "opacity 1.2s ease-in-out",
        }}
      >
        <Multivi />
      </div>
      <hr style={hrlineStyle} />
      <div
        className="send-container"
        style={{
          opacity: getOpacity(),
          transition: "opacity 1.2s ease-in-out",
        }}
      >
        <Send data={des2} />
      </div>
      <hr style={hrlineStyle} />
      <div
        className="map-container"
        style={{
          opacity: getOpacity(),
          transition: "opacity 1.2s ease-in-out",
        }}
      >
        <Map data={des3} />
      </div>
      <div
        className="bottemnav-container"
        style={{
          opacity: getOpacity(),
          transition: "opacity 1.2s ease-in-out",
        }}
      >
        <Bottemnav data={des4} />
      </div>
      <Footer />
    </>
  );
}
