// // export default App;
// import React, { useState, useRef, useEffect } from "react";
// import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// import RightSideNavbar from "./components/aditionalComponents/RightSideNavbar"; // Import your RightSideNavbar
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Register from "./components/security/Register";
// import Login from "./components/security/login";
// import Loader from "./components/utils/Loader";
// import ProtectedRoute from "./components/utils/ProtectedRoute";
// import LandingPage from "./components/aditionalComponents/LandingPage";
// import PageNotFound from "./components/aditionalComponents/PageNotFound";
// //admin routes
// import AdminProjectUpload from "./components/Admin/AdminProjectUpload";
// import MainVideoUpdate from "./components/Admin/AdminVideoUpload";
// import ProjectManagement from "./components/Admin/AdminProjectUpload";
// import About from "./components/About/About";
// import Contact from "./components/contact/contact";
// import Reel from "./components/aditionalComponents/Reel";
// //home
// import Mhome from "./components/home/Mhome";
// import Mproject from "./components/project/Mproject";
// import DisplayProjectDetail from "./components/project/ProjectDetail";
// function App() {
//   const [showNavbar, setShowNavbar] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const location = useLocation();
//   // Create a reference for the sidebar
//   const sidebarRef = useRef(null);

//   // Function to toggle the sidebar
//   const toggleSidebar = () => {
//     setShowNavbar(!showNavbar);
//   };

//   // Close sidebar if clicked outside
//   const handleClickOutside = (event) => {
//     if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//       setShowNavbar(false); // Close the sidebar if the click is outside of it
//     }
//   };

//   // Use effect to add/remove the click event listener
//   useEffect(() => {
//     if (showNavbar) {
//       // Add event listener when the sidebar is shown
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       // Remove event listener when the sidebar is hidden
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       // Clean up the event listener on component unmount
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showNavbar]);
//   const hideSidebar = location.pathname === "/";

//   return (
//     <>
//       <div
//         className="Menu"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         style={{
//           position: "fixed",
//           width: "50px",
//           height: "50px",
//           right: "1%",
//           top: "1%",
//           zIndex: "999",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           borderRadius: "50%",
//           backgroundColor: isHovered ? "red" : "darkred",
//           transform: isHovered ? "scale(1.1)" : "scale(1)",
//           transition: "all 0.3s ease",
//           boxShadow: isHovered ? "0 0 10px rgba(0,0,0,0.3)" : "none",
//         }}
//       >
//         {/* Button to toggle the sidebar */}
//         <button
//           onClick={toggleSidebar}
//           style={{
//             backgroundColor: "transparent",
//             border: "none",
//             cursor: "pointer",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             width: "40px",
//             height: "20px",
//           }}
//         >
//           <span
//             style={{
//               width: "100%",
//               height: "20%",
//               background: "rgb(255, 255, 255)",
//               borderRadius: "3px",
//             }}
//           ></span>
//           <span
//             style={{
//               width: "100%",
//               height: "20%",
//               background: "rgb(255, 255, 255)",
//               borderRadius: "3px",
//             }}
//           ></span>
//           <span
//             style={{
//               width: "100%",
//               height: "20%",
//               background: "rgb(255, 255, 255)",
//               borderRadius: "3px",
//             }}
//           ></span>
//         </button>
//       </div>

//       <BrowserRouter>
//         <ToastContainer
//           position="top-center"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="colored"
//         />

//         {showNavbar && (
//           <div
//             ref={sidebarRef} // Attach the ref to the sidebar div
//             style={{
//               position: "fixed",
//               top: 0,
//               right: 0,
//               width: "26%",
//               height: "100vh",
//               backgroundColor: "#fff",
//               zIndex: 1000,
//               boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
//             }}
//           >
//             <RightSideNavbar />

//             <Link
//               style={{
//                 textDecoration: "none",
//                 color: "rgb(255, 255, 255)",
//                 width: "15%",
//                 height: "8%",
//                 fontSize: "0.6vw",
//                 padding: "0.2vw",
//                 zIndex: 1001,
//                 position: "absolute",
//                 top: "4%",
//                 right: "2%",
//               }}
//               onClick={toggleSidebar}
//             >
//               CLOSE
//             </Link>
//           </div>
//         )}

//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/reel" element={<Reel />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/mhome" element={<Mhome />} />
//           <Route path="/mprojects" element={<Mproject />} />
//           <Route path="/mprojects/:id" element={<DisplayProjectDetail />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />

//           <Route
//             path="/admin/main-video"
//             element={
//               <ProtectedRoute adminOnly={true}>
//                 <MainVideoUpdate />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/projects"
//             element={
//               <ProtectedRoute adminOnly={true}>
//                 <ProjectManagement />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/upload"
//             element={
//               <ProtectedRoute adminOnly={true}>
//                 <AdminProjectUpload />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="*" element={<PageNotFound />} />
//           <Route path="/loader" element={<Loader />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import RightSideNavbar from "./components/aditionalComponents/RightSideNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Register from "./components/security/Register";
import Login from "./components/security/login";
import Loader from "./components/utils/Loader";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import LandingPage from "./components/aditionalComponents/LandingPage";
import PageNotFound from "./components/aditionalComponents/PageNotFound";

// Admin routes
import AdminProjectUpload from "./components/Admin/AdminProjectUpload";
import MainVideoUpdate from "./components/Admin/AdminVideoUpload";
import ProjectManagement from "./components/Admin/AdminProjectUpload";
import About from "./components/About/About";
import Contact from "./components/contact/contact";
import Reel from "./components/aditionalComponents/Reel";

// Home
import Mhome from "./components/home/Mhome";
import Mproject from "./components/project/Mproject";
import DisplayProjectDetail from "./components/project/ProjectDetail";

// Sidebar and menu component
function SidebarWithMenu({ toggleSidebar, showNavbar, setShowNavbar }) {
  const sidebarRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  // Close sidebar if clicked outside
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    if (showNavbar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNavbar]);

  // // Do not show on landing page
  // if (location.pathname === "/") return null;
  if (
    location.pathname === "/" ||
    location.pathname.startsWith("/admin") ||
    location.pathname === "/loader" ||
    location.pathname === "/reel" ||
    location.pathname === "/register" ||
    location.pathname === "/login"
  )
    return null;

  return (
    <>
      <div
        className="Menu"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
          onClick={toggleSidebar}

        style={{
          position: "fixed",
          width: "50px",
          height: "50px",
          right: "1%",
          top: "1%",
          zIndex: "999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          backgroundColor: isHovered ? "red" : "darkred",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          transition: "all 0.3s ease",
          boxShadow: isHovered ? "0 0 10px rgba(0,0,0,0.3)" : "none",
          cursor:'pointer',
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "40px",
            height: "20px",
          }}
        >
          <span style={barStyle}></span>
          <span style={barStyle}></span>
          <span style={barStyle}></span>
        </button>
      </div>

      {showNavbar && (
        <div
          ref={sidebarRef}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "26%",
            height: "100vh",
            backgroundColor: "#fff",
            zIndex: 1000,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <RightSideNavbar />
          <Link
            style={{
              textDecoration: "none",
              color: "rgb(255, 255, 255)",
              width: "15%",
              height: "8%",
              fontSize: "0.6vw",
              padding: "0.2vw",
              zIndex: 1001,
              position: "absolute",
              top: "4%",
              right: "2%",
            }}
            onClick={toggleSidebar}
          >
            CLOSE
          </Link>
        </div>
      )}
    </>
  );
}

const barStyle = {
  width: "100%",
  height: "20%",
  background: "rgb(255, 255, 255)",
  borderRadius: "3px",
};

function AppWrapper() {
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleSidebar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <SidebarWithMenu
        toggleSidebar={toggleSidebar}
        showNavbar={showNavbar}
        setShowNavbar={setShowNavbar}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reel" element={<Reel />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mhome" element={<Mhome />} />
        <Route path="/mprojects" element={<Mproject />} />
        <Route path="/mprojects/:id" element={<DisplayProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin/main-video"
          element={
            <ProtectedRoute adminOnly={true}>
              <MainVideoUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute adminOnly={true}>
              <ProjectManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/upload"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminProjectUpload />
            </ProtectedRoute>
          }
        />
        <Route path="/loader" element={<Loader />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;
