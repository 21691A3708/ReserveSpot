// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // function SidebarNav({ user, setView }) {
// //   const navigate = useNavigate();

// //   const styles = {
// //     sidebar: {
// //       position: "sticky",
// //       top: 0,
// //       left: 0,
// //       height: "100vh",
// //       width: "270px",
// //       background: "linear-gradient(160deg, #4f46e5, #3b82f6, #06b6d4)",
// //       color: "#ffffff",
// //       padding: "24px",
// //       display: "flex",
// //       flexDirection: "column",
// //       justifyContent: "space-between",
// //       boxShadow: "2px 0 12px rgba(0, 0, 0, 0.2)",
// //       fontFamily: "'Segoe UI', sans-serif",
// //       zIndex: 1000,
// //     },
// //     userInfo: {
// //       marginBottom: "32px",
// //     },
// //     username: {
// //       fontSize: "20px",
// //       fontWeight: "bold",
// //       marginBottom: "8px",
// //     },
// //     userDetail: {
// //       fontSize: "14px",
// //       color: "#f3f4f6", // Light gray
// //       marginBottom: "4px",
// //     },
// //     navContainer: {
// //       display: "flex",
// //       flexDirection: "column",
// //     },
// //     navButton: {
// //       background: "rgba(255, 255, 255, 0.1)",
// //       border: "1px solid rgba(255, 255, 255, 0.2)",
// //       backdropFilter: "blur(6px)",
// //       WebkitBackdropFilter: "blur(6px)",
// //       color: "#fff",
// //       padding: "12px 16px",
// //       marginBottom: "12px",
// //       borderRadius: "10px",
// //       fontSize: "15px",
// //       textAlign: "center",
// //       cursor: "pointer",
// //       transition: "all 0.3s ease",
// //     },
// //     navButtonHover: {
// //       background: "rgba(255, 255, 255, 0.2)",
// //       transform: "translateY(-1px)",
// //     },
// //     logoutButton: {
// //       background: "#ef4444",
// //       color: "#fff",
// //       fontWeight: "bold",
// //       border: "none",
// //       marginTop: "auto",
// //     },
// //   };

// //   const handleHover = (e, isHovering, isLogout = false) => {
// //     if (isHovering) {
// //       e.currentTarget.style.background = isLogout
// //         ? "#dc2626"
// //         : styles.navButtonHover.background;
// //       e.currentTarget.style.transform = "scale(1.03)";
// //     } else {
// //       e.currentTarget.style.background = isLogout
// //         ? styles.logoutButton.background
// //         : styles.navButton.background;
// //       e.currentTarget.style.transform = "scale(1)";
// //     }
// //   };
// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   return (
// //     <aside style={styles.sidebar}>
// //       <div>
// //         <div style={styles.userInfo}>
// //           <div style={styles.username}>
// //             👋 {user?.username || "Admin| user"}
// //           </div>
// //           <div style={styles.userDetail}>📧 {user?.email}</div>
// //           <div style={styles.userDetail}>🔐 Role: {user?.role}</div>
// //         </div>

// //         <div style={styles.navContainer}>
// //           <button
// //             style={styles.navButton}
// //             onClick={() => setView("list")}
// //             onMouseEnter={(e) => handleHover(e, true)}
// //             onMouseLeave={(e) => handleHover(e, false)}
// //           >
// //             📁 View Projects
// //           </button>

// //           <button
// //             style={styles.navButton}
// //             onClick={() => setView("add")}
// //             onMouseEnter={(e) => handleHover(e, true)}
// //             onMouseLeave={(e) => handleHover(e, false)}
// //           >
// //             ➕ Add New Project
// //           </button>
// //           <button
// //             style={styles.navButton}
// //             onClick={() => setView("bookings")}
// //             onMouseEnter={(e) => handleHover(e, true)}
// //             onMouseLeave={(e) => handleHover(e, false)}
// //           >
// //             📅 Bookings
// //           </button>
// //           <button
// //             style={styles.navButton}
// //             onClick={() => setView("video")}
// //             onMouseEnter={(e) => handleHover(e, true)}
// //             onMouseLeave={(e) => handleHover(e, false)}
// //           >
// //             🖼️ Manage Main Video
// //           </button>
// //         </div>
// //       </div>

// //       <button
// //         style={{ ...styles.navButton, ...styles.logoutButton }}
// //         onClick={handleLogout}
// //         onMouseEnter={(e) => handleHover(e, true, true)}
// //         onMouseLeave={(e) => handleHover(e, false, true)}
// //       >
// //         Logout
// //       </button>
// //     </aside>
// //   );
// // }

// // export default SidebarNav;
// import React from "react";
// import { useNavigate } from "react-router-dom";

// function SidebarNav({ user, setView, onClose }) {
//   const navigate = useNavigate();

//   const styles = {
//     sidebar: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       height: "100vh",
//       width: "270px",
//       background: "linear-gradient(160deg, #4f46e5, #3b82f6, #06b6d4)",
//       color: "#ffffff",
//       padding: "24px",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-between",
//       boxShadow: "2px 0 12px rgba(0, 0, 0, 0.2)",
//       fontFamily: "'Segoe UI', sans-serif",
//       zIndex: 1000,
//     },
//     closeButton: {
//       position: "absolute",
//       top: "16px",
//       right: "16px",
//       background: "transparent",
//       border: "none",
//       color: "#fff",
//       fontSize: "20px",
//       cursor: "pointer",
//     },
//     userInfo: {
//       marginBottom: "32px",
//       marginTop: "40px", // so it's not behind close button
//     },
//     username: {
//       fontSize: "20px",
//       fontWeight: "bold",
//       marginBottom: "8px",
//     },
//     userDetail: {
//       fontSize: "14px",
//       color: "#f3f4f6",
//       marginBottom: "4px",
//     },
//     navContainer: {
//       display: "flex",
//       flexDirection: "column",
//     },
//     navButton: {
//       background: "rgba(255, 255, 255, 0.1)",
//       border: "1px solid rgba(255, 255, 255, 0.2)",
//       backdropFilter: "blur(6px)",
//       WebkitBackdropFilter: "blur(6px)",
//       color: "#fff",
//       padding: "12px 16px",
//       marginBottom: "12px",
//       borderRadius: "10px",
//       fontSize: "15px",
//       textAlign: "center",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//     },
//     navButtonHover: {
//       background: "rgba(255, 255, 255, 0.2)",
//       transform: "translateY(-1px)",
//     },
//     logoutButton: {
//       background: "#ef4444",
//       color: "#fff",
//       fontWeight: "bold",
//       border: "none",
//       marginTop: "auto",
//     },
//   };

//   const handleHover = (e, isHovering, isLogout = false) => {
//     if (isHovering) {
//       e.currentTarget.style.background = isLogout
//         ? "#dc2626"
//         : styles.navButtonHover.background;
//       e.currentTarget.style.transform = "scale(1.03)";
//     } else {
//       e.currentTarget.style.background = isLogout
//         ? styles.logoutButton.background
//         : styles.navButton.background;
//       e.currentTarget.style.transform = "scale(1)";
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <aside style={styles.sidebar}>
//       {/* ✖ Close Button */}
//       {onClose && (
//         <button
//           style={styles.closeButton}
//           onClick={onClose}
//           title="Close Sidebar"
//         >
//           ✖
//         </button>
//       )}

//       <div>
//         <div style={styles.userInfo}>
//           <div style={styles.username}>
//             👋 {user?.username || "Admin | user"}
//           </div>
//           <div style={styles.userDetail}>📧 {user?.email}</div>
//           <div style={styles.userDetail}>🔐 Role: {user?.role}</div>
//         </div>

//         <div style={styles.navContainer}>
//           <button
//             style={styles.navButton}
//             onClick={() => setView("list")}
//             onMouseEnter={(e) => handleHover(e, true)}
//             onMouseLeave={(e) => handleHover(e, false)}
//           >
//             📁 View Projects
//           </button>

//           <button
//             style={styles.navButton}
//             onClick={() => setView("add")}
//             onMouseEnter={(e) => handleHover(e, true)}
//             onMouseLeave={(e) => handleHover(e, false)}
//           >
//             ➕ Add New Project
//           </button>

//           <button
//             style={styles.navButton}
//             onClick={() => setView("bookings")}
//             onMouseEnter={(e) => handleHover(e, true)}
//             onMouseLeave={(e) => handleHover(e, false)}
//           >
//             📅 Bookings
//           </button>

//           <button
//             style={styles.navButton}
//             onClick={() => setView("video")}
//             onMouseEnter={(e) => handleHover(e, true)}
//             onMouseLeave={(e) => handleHover(e, false)}
//           >
//             🖼️ Manage Main Video
//           </button>
//         </div>
//       </div>

//       <button
//         style={{ ...styles.navButton, ...styles.logoutButton }}
//         onClick={handleLogout}
//         onMouseEnter={(e) => handleHover(e, true, true)}
//         onMouseLeave={(e) => handleHover(e, false, true)}
//       >
//         Logout
//       </button>
//     </aside>
//   );
// }

// export default SidebarNav;
import React from "react";
import { useNavigate } from "react-router-dom";

function SidebarNav({ user, setView, onClose }) {
  const navigate = useNavigate();

  const styles = {
    sidebar: {
      position: "fixed",
      top: 0,
      right: 0, // Changed from left: 0
      height: "100vh",
      width: "270px",
      background: "linear-gradient(160deg, #4f46e5, #3b82f6, #06b6d4)",
      color: "#ffffff",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "-2px 0 12px rgba(0, 0, 0, 0.2)", // Negative for right side
      fontFamily: "'Segoe UI', sans-serif",
      zIndex: 1000,
    },
    closeButton: {
      position: "absolute",
      top: "16px",
      left: "16px", // Adjusted for right-side sidebar
      background: "transparent",
      border: "none",
      color: "#fff",
      fontSize: "20px",
      cursor: "pointer",
    },
    userInfo: {
      marginBottom: "32px",
      marginTop: "40px",
    },
    username: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    userDetail: {
      fontSize: "14px",
      color: "#f3f4f6",
      marginBottom: "4px",
    },
    navContainer: {
      display: "flex",
      flexDirection: "column",
    },
    navButton: {
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      color: "#fff",
      padding: "12px 16px",
      marginBottom: "12px",
      borderRadius: "10px",
      fontSize: "15px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    navButtonHover: {
      background: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-1px)",
    },
    logoutButton: {
      background: "#ef4444",
      color: "#fff",
      fontWeight: "bold",
      border: "none",
      marginTop: "auto",
    },
  };

  const handleHover = (e, isHovering, isLogout = false) => {
    if (isHovering) {
      e.currentTarget.style.background = isLogout
        ? "#dc2626"
        : styles.navButtonHover.background;
      e.currentTarget.style.transform = "scale(1.03)";
    } else {
      e.currentTarget.style.background = isLogout
        ? styles.logoutButton.background
        : styles.navButton.background;
      e.currentTarget.style.transform = "scale(1)";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside style={styles.sidebar}>
      {onClose && (
        <button
          style={styles.closeButton}
          onClick={onClose}
          title="Close Sidebar"
        >
          ✖
        </button>
      )}

      <div>
        <div style={styles.userInfo}>
          <div style={styles.username}>
            👋 {user?.username || "Admin | user"}
          </div>
          <div style={styles.userDetail}>📧 {user?.email}</div>
          <div style={styles.userDetail}>🔐 Role: {user?.role}</div>
        </div>

        <div style={styles.navContainer}>
          <button
            style={styles.navButton}
            onClick={() => setView("list")}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            📁 View Projects
          </button>

          <button
            style={styles.navButton}
            onClick={() => setView("add")}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            ➕ Add New Project
          </button>

          <button
            style={styles.navButton}
            onClick={() => setView("bookings")}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            📅 Bookings
          </button>

          <button
            style={styles.navButton}
            onClick={() => setView("video")}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            🖼️ Manage Main Video
          </button>
        </div>
      </div>

      <button
        style={{ ...styles.navButton, ...styles.logoutButton }}
        onClick={handleLogout}
        onMouseEnter={(e) => handleHover(e, true, true)}
        onMouseLeave={(e) => handleHover(e, false, true)}
      >
        Logout
      </button>
    </aside>
  );
}

export default SidebarNav;
