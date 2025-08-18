// // import React, { useEffect, useState } from "react";
// // import { motion } from "framer-motion";
// // import axios from "axios";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { useNavigate } from "react-router-dom";
// // import Amination from "./AnimatedText";
// // import { Link } from "react-router-dom";
// // const getUser = () => {
// //   const token = localStorage.getItem("token");
// //   if (!token) return null;
// //   try {
// //     return JSON.parse(atob(token.split(".")[1]));
// //   } catch (e) {
// //     return null;
// //   }
// // };

// // export default function Mhome() {
// //   const [projects, setProjects] = useState([]);
// //   const [user, setUser] = useState(null);
// //   const navigate = useNavigate();
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedProject, setSelectedProject] = useState(null);
// //   const [newImage, setNewImage] = useState(null);
// //   const [newAddress, setNewAddress] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isPaused, setIsPaused] = useState(false);
// //   const [isHovered, setIsHovered] = useState(false);

// //   useEffect(() => {
// //     const userInfo = getUser();
// //     if (userInfo) setUser(userInfo);
// //     else setUser(null);

// //     const token = localStorage.getItem("token");
// //     axios
// //       .get("/api/home/")
// //       .then((res) => {
// //         setProjects(res.data);
// //       })
// //       .catch((err) => console.error("Error fetching projects:", err));
// //   }, []);

// //   useEffect(() => {
// //     if (projects.length === 0) return;

// //     const interval = setInterval(() => {
// //       if (!isPaused && !isModalOpen) {
// //         setCurrentIndex((prevIndex) =>
// //           prevIndex === projects.length - 1 ? 0 : prevIndex + 1
// //         );
// //       }
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, [projects, isPaused, isModalOpen]);

// //   useEffect(() => {
// //     const handleKeyDown = (e) => {
// //       if (isModalOpen) return;
// //       if (e.key === "ArrowRight") {
// //         setCurrentIndex((prev) =>
// //           prev + 1 === projects.length - 1 ? 0 : prev + 1
// //         );
// //       } else if (e.key === "ArrowLeft") {
// //         setCurrentIndex((prev) =>
// //           prev === 0 ? projects.length - 1 : prev - 1
// //         );
// //       }
// //     };
// //     window.addEventListener("keydown", handleKeyDown);
// //     return () => window.removeEventListener("keydown", handleKeyDown);
// //   }, [projects, isModalOpen]);

// //   const updateImage = async (projectId, base64Image, newAddress) => {
// //     if (!base64Image && !newAddress.trim()) {
// //       setErrorMessage("Please select a new image or update the address.");
// //       return;
// //     }

// //     try {
// //       setIsLoading(true);
// //       const formData = {
// //         image: base64Image,
// //         address: newAddress.trim() || selectedProject.address,
// //       };

// //       const response = await axios.put(
// //         `/api/home/update-image/${projectId}`,
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       setProjects((prevProjects) =>
// //         prevProjects.map((project) =>
// //           project.id === projectId
// //             ? {
// //                 ...project,
// //                 image: response.data.imageUrl || project.image,
// //                 address: newAddress,
// //               }
// //             : project
// //         )
// //       );

// //       setIsModalOpen(false);
// //       setErrorMessage("");
// //       toast.success("Project updated successfully!");
// //     } catch (err) {
// //       console.error("Error updating image:", err);
// //       setErrorMessage("Failed to update the project. Please try again.");
// //       toast.error("Failed to update the project.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setNewImage(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleAddressChange = (e) => {
// //     setNewAddress(e.target.value);
// //   };

// //   if (projects.length === 0) return;

// //   const slideshowStyles = {
// //     position: "relative",
// //     width: "100%",
// //     height: "100vh",
// //     overflow: "hidden",
// //   };

// //   const imageScrollerStyles = {
// //     display: "flex",
// //     height: "100vh",
// //     width: `${projects.length * 100}vw`,
// //     transform: `translateX(-${currentIndex * 100}vw)`,
// //     transition: "transform 1s ease-in-out",
// //   };

// //   const imageSlideStyles = {
// //     flex: "0 0 100vw",
// //     height: "100vh",
// //     backgroundSize: "cover",
// //     backgroundPosition: "center",
// //     transition: "transform 0.6s ease-in-out",
// //   };

// //   const overlayStyles = {
// //     padding: "20px 40px",
// //     borderRadius: "10px",
// //     position: "absolute",
// //     bottom: "3%",
// //     left: "35%",
// //     transform: "translateX(-50%)",
// //     width: "25%",
// //     height: "13%",
// //     zIndex: 1,
// //   };

// //   const overlayHeaderStyles = {
// //     color: "white",
// //     fontSize: "1rem",
// //     textAlign: "center",
// //     fontFamily: "'Grande', 'sans-serif'",
// //     fontWeight: "bold",
// //   };

// //   const nextOverlayStyles = {
// //     ...overlayStyles,
// //     opacity: 1,
// //     bottom: "3%",
// //     left: "70%",
// //     width: "25%",
// //     height: "13%",
// //     transform: "translateX(-50%)",
// //   };

// //   const updateButtonStyles = {
// //     position: "absolute",
// //     bottom: "20px",
// //     right: "20px",
// //     padding: "10px 20px",
// //     backgroundColor: "#4CAF50",
// //     color: "white",
// //     border: "none",
// //     borderRadius: "5px",
// //     cursor: "pointer",
// //   };

// //   const modalStyles = {
// //     position: "absolute",
// //     top: "50%",
// //     left: "50%",
// //     transform: "translate(-50%, -50%)",
// //     backgroundColor: "white",
// //     padding: "20px",
// //     borderRadius: "10px",
// //     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
// //     zIndex: 10,
// //     width: "90%",
// //     maxWidth: "400px",
// //     maxHeight: "80vh",
// //     overflow: "auto",
// //   };

// //   const modalInputStyles = {
// //     width: "100%",
// //     padding: "10px",
// //     marginBottom: "10px",
// //     borderRadius: "5px",
// //     border: "1px solid #ccc",
// //   };

// //   const modalButtonStyles = {
// //     padding: "10px 20px",
// //     backgroundColor: "#4CAF50",
// //     color: "white",
// //     border: "none",
// //     borderRadius: "5px",
// //     cursor: "pointer",
// //   };

// //   const cancelButtonStyles = {
// //     padding: "10px 20px",
// //     backgroundColor: "#f44336",
// //     color: "white",
// //     border: "none",
// //     borderRadius: "5px",
// //     cursor: "pointer",
// //     marginTop: "10px",
// //   };

// //   const handleHover = () => {
// //     setIsPaused(true);
// //   };

// //   const handleMouseLeave = () => {
// //     setIsPaused(false);
// //   };

// //   const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
// //   const nextProject = projects[nextIndex];

// //   return (
// //     <>
// //       <div style={slideshowStyles}>
// //         <div style={imageScrollerStyles}>
// //           {projects.map((project, index) => (
// //             <div
// //               key={project.id}
// //               style={{
// //                 ...imageSlideStyles,
// //                 transform:
// //                   index === currentIndex && isPaused && !isModalOpen
// //                     ? "scale(1.12)"
// //                     : "scale(1)",
// //               }}
// //             >
// //               <Link
// //                 to={`/mprojects/${project.id}`}
// //                 style={{ height: "100%", couser: "pointer" }}
// //               >
// //                 {project.image?.url && (
// //                   <img
// //                     src={project.image.url}
// //                     alt={`Project ${project.id}`}
// //                     style={{
// //                       width: "100%",
// //                       height: "100%",
// //                       objectFit: "cover",
// //                     }}
// //                   />
// //                 )}
// //               </Link>
// //             </div>
// //           ))}
// //         </div>

// //         <div style={overlayStyles}>
// //           <motion.h1
// //             style={overlayHeaderStyles}
// //             key={projects[currentIndex].id}
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //           >
// //             {projects[currentIndex] && (
// //               <Link
// //                 to={`/mprojects/${projects[currentIndex].id}`}
// //                 style={{
// //                   color: "white",
// //                   textDecoration: "none",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 <strong>
// //                   {projects[currentIndex].title}
// //                   <br />
// //                   {projects[currentIndex].address}
// //                 </strong>
// //               </Link>
// //             )}
// //           </motion.h1>
// //         </div>

// //         {nextProject && (
// //           <div style={nextOverlayStyles}>
// //             <motion.h1
// //               onMouseEnter={() => setIsHovered(true)}
// //               onMouseLeave={() => setIsHovered(false)}
// //               style={overlayHeaderStyles}
// //               key={projects[currentIndex].id + "_next"}
// //               initial={{ opacity: 0, y: 30 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6 }}
// //             >
// //               <Link
// //                 to={`/mprojects/${nextProject.id}`}
// //                 style={{
// //                   color: "white",
// //                   textDecoration: "none",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 <strong
// //                   style={{
// //                     fontSize: "1.5rem",
// //                     fontFamily: "'Grande', 'sans-serif'",
// //                     color: isHovered ? "white" : "gray",
// //                   }}
// //                 >
// //                   <p
// //                     style={{
// //                       fontFamily: "'Grande', 'sans-serif'",
// //                       fontSize: "1rem",
// //                     }}
// //                   >
// //                     {nextProject.title}
// //                     <br />
// //                     {nextProject.address}
// //                   </p>
// //                   <br />
// //                 </strong>
// //               </Link>
// //             </motion.h1>
// //           </div>
// //         )}
// //         {user?.role === "admin" && (
// //           <button
// //             style={updateButtonStyles}
// //             onClick={() => {
// //               const project = projects[currentIndex];
// //               setSelectedProject(project);
// //               setNewImage(null);
// //               setNewAddress(project.address);
// //               setIsModalOpen(true);
// //             }}
// //           >
// //             Update Image
// //           </button>
// //         )}

// //         <div
// //           style={{
// //             position: "absolute",
// //             bottom: "10px",
// //             left: "50%",
// //             transform: "translateX(-50%)",
// //             display: "flex",
// //             gap: "10px",
// //           }}
// //         >
// //           {projects.map((_, i) => (
// //             <div
// //               key={i}
// //               style={{
// //                 width: "10px",
// //                 height: "10px",
// //                 borderRadius: "50%",
// //                 backgroundColor: i === currentIndex ? "white" : "#aaa",
// //               }}
// //             />
// //           ))}
// //         </div>

// //         <div
// //           className="hoverdiv"
// //           style={{
// //             width: "55%",
// //             height: "55%",
// //             position: "absolute",
// //             left: "20%",
// //             top: "25%",
// //             zIndex: 2,
// //           }}
// //           onMouseEnter={handleHover}
// //           onMouseLeave={handleMouseLeave}
// //           onClick={() => navigate(`/mprojects/${projects[currentIndex].id}`)}
// //         ></div>

// //         <h1
// //           style={{
// //             fontSize: "5rem",
// //             margin: 0,
// //             padding: 0,
// //             color: "white",
// //             position: "absolute",
// //             top: "8%",
// //             left: "33%",
// //             fontFamily: "'Grande', 'sans-serif'",
// //           }}
// //         >
// //           <Amination text="LUXITALIA" />
// //         </h1>

// //         <p
// //           onClick={() => navigate("/mprojects")}
// //           style={{
// //             margin: 0,
// //             color: "white",
// //             position: "absolute",
// //             left: "1%",
// //             bottom: "6%",
// //             cursor: "pointer",
// //             fontFamily: "'Grande', 'sans-serif'",
// //           }}
// //         >
// //           VIEW ALL
// //         </p>
// //         <h5
// //           style={{
// //             margin: 0,
// //             padding: "10px",
// //             color: "white",
// //             position: "absolute",
// //             top: "0%",
// //             left: "0%",
// //             zIndex: "999",
// //             fontFamily: "'Grande', 'sans-serif'",
// //           }}
// //         >
// //           LUXITALIA
// //         </h5>
// //       </div>

// //       {isModalOpen && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             width: "100%",
// //             height: "100%",
// //             backgroundColor: "rgba(0,0,0,0.5)",
// //             zIndex: 9,
// //           }}
// //         />
// //       )}

// //       {isModalOpen && selectedProject && (
// //         <div style={modalStyles}>
// //           <h2>Update Project Details</h2>
// //           <p>Updating project: {selectedProject.address}</p>
// //           <img
// //             src={selectedProject.image.url}
// //             alt="current"
// //             style={{ width: "100%", marginBottom: "10px", borderRadius: "5px" }}
// //           />
// //           {newImage && (
// //             <img
// //               src={newImage}
// //               alt="preview"
// //               style={{
// //                 width: "100%",
// //                 marginBottom: "10px",
// //                 borderRadius: "5px",
// //               }}
// //             />
// //           )}
// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={handleImageChange}
// //             style={modalInputStyles}
// //           />
// //           <input
// //             type="text"
// //             value={newAddress}
// //             onChange={handleAddressChange}
// //             placeholder="New address"
// //             style={modalInputStyles}
// //           />
// //           <button
// //             style={modalButtonStyles}
// //             onClick={() =>
// //               updateImage(selectedProject.id, newImage, newAddress)
// //             }
// //             disabled={isLoading || (!newImage && !newAddress.trim())}
// //           >
// //             {isLoading ? "Updating..." : "Update"}
// //           </button>
// //           <button
// //             style={cancelButtonStyles}
// //             onClick={() => setIsModalOpen(false)}
// //           >
// //             Cancel
// //           </button>

// //           {errorMessage && (
// //             <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
// //           )}
// //         </div>
// //       )}

// //       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
// //     </>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import Amination from "./AnimatedText";
// import { Link } from "react-router-dom";
// const getUser = () => {
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   try {
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch (e) {
//     return null;
//   }
// };

// export default function Mhome(data) {
//   const [projects, setProjects] = useState([]);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [newImage, setNewImage] = useState(null);
//   const [newAddress, setNewAddress] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const userInfo = getUser();
//     if (userInfo) setUser(userInfo);
//     else setUser(null);
//     setProjects(data.project);
//   }, []);
//   //  useEffect(() => {
//   //   const userInfo = getUser();
//   //   if (userInfo) setUser(userInfo);
//   //   else setUser(null);

//   //   const token = localStorage.getItem("token");
//   //   axios
//   //     .get("/api/home/")
//   //     .then((res) => {
//   //       setProjects(res.data);
//   //     })
//   //     .catch((err) => console.error("Error fetching projects:", err));
//   // }, []);

//   useEffect(() => {
//     if (projects.length === 0) return;

//     const interval = setInterval(() => {
//       if (!isPaused && !isModalOpen) {
//         setCurrentIndex((prevIndex) =>
//           prevIndex === projects.length - 1 ? 0 : prevIndex + 1
//         );
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [projects, isPaused, isModalOpen]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (isModalOpen) return;
//       if (e.key === "ArrowRight") {
//         setCurrentIndex((prev) =>
//           prev + 1 === projects.length - 1 ? 0 : prev + 1
//         );
//       } else if (e.key === "ArrowLeft") {
//         setCurrentIndex((prev) =>
//           prev === 0 ? projects.length - 1 : prev - 1
//         );
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [projects, isModalOpen]);

//   const updateImage = async (projectId, base64Image, newAddress) => {
//     if (!base64Image && !newAddress.trim()) {
//       setErrorMessage("Please select a new image or update the address.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const formData = {
//         image: base64Image,
//         address: newAddress.trim() || selectedProject.address,
//       };

//       const response = await axios.put(
//         `/api/home/update-image/${projectId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setProjects((prevProjects) =>
//         prevProjects.map((project) =>
//           project.id === projectId
//             ? {
//                 ...project,
//                 image: response.data.imageUrl || project.image,
//                 address: newAddress,
//               }
//             : project
//         )
//       );

//       setIsModalOpen(false);
//       setErrorMessage("");
//       toast.success("Project updated successfully!");
//     } catch (err) {
//       console.error("Error updating image:", err);
//       setErrorMessage("Failed to update the project. Please try again.");
//       toast.error("Failed to update the project.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setNewImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleAddressChange = (e) => {
//     setNewAddress(e.target.value);
//   };

//   if (projects.length === 0) return;

//   const slideshowStyles = {
//     position: "relative",
//     width: "100%",
//     height: "100vh",
//     overflow: "hidden",
//   };

//   const imageScrollerStyles = {
//     display: "flex",
//     height: "100vh",
//     width: `${projects.length * 100}vw`,
//     transform: `translateX(-${currentIndex * 100}vw)`,
//     transition: "transform 1s ease-in-out",
//   };

//   const imageSlideStyles = {
//     flex: "0 0 100vw",
//     height: "100vh",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     transition: "transform 0.6s ease-in-out",
//   };

//   const overlayStyles = {
//     padding: "20px 40px",
//     borderRadius: "10px",
//     position: "absolute",
//     bottom: "3%",
//     left: "35%",
//     transform: "translateX(-50%)",
//     width: "25%",
//     height: "13%",
//     zIndex: 1,
//   };

//   const overlayHeaderStyles = {
//     color: "white",
//     fontSize: "1rem",
//     textAlign: "center",
//     fontFamily: "'Grande', 'sans-serif'",
//     fontWeight: "bold",
//   };

//   const nextOverlayStyles = {
//     ...overlayStyles,
//     opacity: 1,
//     bottom: "3%",
//     left: "70%",
//     width: "25%",
//     height: "13%",
//     transform: "translateX(-50%)",
//   };

//   const updateButtonStyles = {
//     position: "absolute",
//     bottom: "20px",
//     right: "20px",
//     padding: "10px 20px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   };

//   const modalStyles = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//     zIndex: 10,
//     width: "90%",
//     maxWidth: "400px",
//     maxHeight: "80vh",
//     overflow: "auto",
//   };

//   const modalInputStyles = {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   };

//   const modalButtonStyles = {
//     padding: "10px 20px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   };

//   const cancelButtonStyles = {
//     padding: "10px 20px",
//     backgroundColor: "#f44336",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//   };

//   const handleHover = () => {
//     setIsPaused(true);
//   };

//   const handleMouseLeave = () => {
//     setIsPaused(false);
//   };

//   const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
//   const nextProject = projects[nextIndex];

//   return (
//     <>
//       <div style={slideshowStyles}>
//         <div style={imageScrollerStyles}>
//           {projects.map((project, index) => (
//             <div
//               key={project.id}
//               style={{
//                 ...imageSlideStyles,
//                 transform:
//                   index === currentIndex && isPaused && !isModalOpen
//                     ? "scale(1.12)"
//                     : "scale(1)",
//               }}
//             >
//               <Link
//                 to={`/mprojects/${project.id}`}
//                 style={{ height: "100%", couser: "pointer" }}
//               >
//                 {project.image?.url && (
//                   <img
//                     src={project.image.url}
//                     alt={`Project ${project.id}`}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 )}
//               </Link>
//             </div>
//           ))}
//         </div>

//         <div style={overlayStyles}>
//           <motion.h1
//             style={overlayHeaderStyles}
//             key={projects[currentIndex].id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             {projects[currentIndex] && (
//               <Link
//                 to={`/mprojects/${projects[currentIndex].id}`}
//                 style={{
//                   color: "white",
//                   textDecoration: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 <strong>
//                   {projects[currentIndex].title}
//                   <br />
//                   {projects[currentIndex].address}
//                 </strong>
//               </Link>
//             )}
//           </motion.h1>
//         </div>

//         {nextProject && (
//           <div style={nextOverlayStyles}>
//             <motion.h1
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//               style={overlayHeaderStyles}
//               key={projects[currentIndex].id + "_next"}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <Link
//                 to={`/mprojects/${nextProject.id}`}
//                 style={{
//                   color: "white",
//                   textDecoration: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 <strong
//                   style={{
//                     fontSize: "1.5rem",
//                     fontFamily: "'Grande', 'sans-serif'",
//                     color: isHovered ? "white" : "gray",
//                   }}
//                 >
//                   <p
//                     style={{
//                       fontFamily: "'Grande', 'sans-serif'",
//                       fontSize: "1rem",
//                     }}
//                   >
//                     {nextProject.title}
//                     <br />
//                     {nextProject.address}
//                   </p>
//                   <br />
//                 </strong>
//               </Link>
//             </motion.h1>
//           </div>
//         )}
//         {user?.role === "admin" && (
//           <button
//             style={updateButtonStyles}
//             onClick={() => {
//               const project = projects[currentIndex];
//               setSelectedProject(project);
//               setNewImage(null);
//               setNewAddress(project.address);
//               setIsModalOpen(true);
//             }}
//           >
//             Update Image
//           </button>
//         )}

//         <div
//           style={{
//             position: "absolute",
//             bottom: "10px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             display: "flex",
//             gap: "10px",
//           }}
//         >
//           {projects.map((_, i) => (
//             <div
//               key={i}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 backgroundColor: i === currentIndex ? "white" : "#aaa",
//               }}
//             />
//           ))}
//         </div>

//         <div
//           className="hoverdiv"
//           style={{
//             width: "55%",
//             height: "55%",
//             position: "absolute",
//             left: "20%",
//             top: "25%",
//             zIndex: 2,
//           }}
//           onMouseEnter={handleHover}
//           onMouseLeave={handleMouseLeave}
//           onClick={() => navigate(`/mprojects/${projects[currentIndex].id}`)}
//         ></div>

//         <h1
//           style={{
//             fontSize: "5rem",
//             margin: 0,
//             padding: 0,
//             color: "white",
//             position: "absolute",
//             top: "8%",
//             left: "33%",
//             fontFamily: "'Grande', 'sans-serif'",
//           }}
//         >
//           <Amination text="LUXITALIA" />
//         </h1>

//         <p
//           onClick={() => navigate("/mprojects")}
//           style={{
//             margin: 0,
//             color: "white",
//             position: "absolute",
//             left: "1%",
//             bottom: "6%",
//             cursor: "pointer",
//             fontFamily: "'Grande', 'sans-serif'",
//           }}
//         >
//           VIEW ALL
//         </p>
//         <h5
//           style={{
//             margin: 0,
//             padding: "10px",
//             color: "white",
//             position: "absolute",
//             top: "0%",
//             left: "0%",
//             zIndex: "999",
//             fontFamily: "'Grande', 'sans-serif'",
//           }}
//         >
//           LUXITALIA
//         </h5>
//       </div>

//       {isModalOpen && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 9,
//           }}
//         />
//       )}

//       {isModalOpen && selectedProject && (
//         <div style={modalStyles}>
//           <h2>Update Project Details</h2>
//           <p>Updating project: {selectedProject.address}</p>
//           <img
//             src={selectedProject.image.url}
//             alt="current"
//             style={{ width: "100%", marginBottom: "10px", borderRadius: "5px" }}
//           />
//           {newImage && (
//             <img
//               src={newImage}
//               alt="preview"
//               style={{
//                 width: "100%",
//                 marginBottom: "10px",
//                 borderRadius: "5px",
//               }}
//             />
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={modalInputStyles}
//           />
//           <input
//             type="text"
//             value={newAddress}
//             onChange={handleAddressChange}
//             placeholder="New address"
//             style={modalInputStyles}
//           />
//           <button
//             style={modalButtonStyles}
//             onClick={() =>
//               updateImage(selectedProject.id, newImage, newAddress)
//             }
//             disabled={isLoading || (!newImage && !newAddress.trim())}
//           >
//             {isLoading ? "Updating..." : "Update"}
//           </button>
//           <button
//             style={cancelButtonStyles}
//             onClick={() => setIsModalOpen(false)}
//           >
//             Cancel
//           </button>

//           {errorMessage && (
//             <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
//           )}
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Amination from "./AnimatedText";

const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function Slider({ data }) {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  console.log("project", data);

  useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    setProjects(data || []);
  }, [data]);

  useEffect(() => {
    if (!projects.length) return;
    const interval = setInterval(() => {
      if (!isPaused && !isModalOpen) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [projects, isPaused, isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen || !projects.length) return;
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex(
          (prev) => (prev - 1 + projects.length) % projects.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects, isModalOpen]);

  const updateImage = async (projectId, base64Image, updatedAddress) => {
    if (!base64Image && !updatedAddress.trim()) {
      setErrorMessage("Please select a new image or update the address.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = {
        image: base64Image,
        address: updatedAddress.trim() || selectedProject.address,
      };

      const res = await axios.put(
        `/api/home/update-image/${projectId}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                image: res.data.imageUrl || p.image,
                address: updatedAddress,
              }
            : p
        )
      );
      setIsModalOpen(false);
      setErrorMessage("");
      toast.success("Project updated successfully!");
    } catch (err) {
      console.error("Error updating project:", err);
      toast.error("Failed to update the project.");
      setErrorMessage("Failed to update the project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setNewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddressChange = (e) => setNewAddress(e.target.value);

  if (!projects.length)
    return <div style={{ backgroundColor: "rgb(227, 225, 215)" }}></div>;

  const nextIndex = (currentIndex + 1) % projects.length;
  const current = projects[currentIndex];
  const next = projects[nextIndex];

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: `${projects.length * 100}vw`,
            transform: `translateX(-${currentIndex * 100}vw)`,
            transition: "transform 1s ease-in-out",
          }}
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              style={{
                flex: "0 0 100vw",
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Link
                to={`/mprojects/${proj.id}`}
                style={{ height: "100%", cursor: "pointer" }}
              >
                {proj.image?.url && (
                  <img
                    src={proj.image.url}
                    alt={proj.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Overlay Text */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "3%",
            left: "35%",
            width: "25%",
            zIndex: 1,
            textAlign: "center",
            color: "white",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={current.id}
        >
          <Link
            to={`/mprojects/${current.id}`}
            style={{ color: "white", textDecoration: "none" }}
          >
            <strong>
              {current.title}
              <br />
              {current.address}
            </strong>
          </Link>
        </motion.div>

        {/* Next Project Preview */}
        {next && (
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: "absolute",
              bottom: "3%",
              left: "70%",
              width: "25%",
              textAlign: "center",
              color: isHovered ? "white" : "gray",
              fontSize: "1rem",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            key={`${current.id}_next`}
          >
            <Link
              to={`/mprojects/${next.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <strong>
                {next.title}
                <br />
                {next.address}
              </strong>
            </Link>
          </motion.div>
        )}

        {/* Admin Update Button */}
        {user?.role === "admin" && (
          <button
            onClick={() => {
              setSelectedProject(current);
              setNewImage(null);
              setNewAddress(current.address);
              setIsModalOpen(true);
            }}
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Update Image
          </button>
        )}

        {/* Dots Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
          }}
        >
          {projects.map((_, i) => (
            <div
              key={i}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: i === currentIndex ? "white" : "#aaa",
              }}
            />
          ))}
        </div>

        {/* Hover Overlay */}
        <div
          style={{
            width: "55%",
            height: "55%",
            position: "absolute",
            left: "20%",
            top: "25%",
            zIndex: 2,
            cursor: "pointer",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => navigate(`/mprojects/${current.id}`)}
        />

        {/* Branding */}
        <h1
          style={{
            fontSize: "5rem",
            position: "absolute",
            top: "8%",
            left: "33%",
            color: "white",
            fontFamily: "'Grande', 'sans-serif'",
          }}
        >
          <Amination text="LUXITALIA" />
        </h1>
        <p
          onClick={() => navigate("/mprojects")}
          style={{
            position: "absolute",
            bottom: "6%",
            left: "1%",
            color: "white",
            cursor: "pointer",
          }}
        >
          VIEW ALL
        </p>
        <h5
          style={{
            position: "absolute",
            top: "0%",
            left: "0%",
            padding: "10px",
            color: "white",
          }}
        >
          LUXITALIA
        </h5>
      </div>

      {/* Modal Background */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9,
          }}
        />
      )}

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 10,
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <h2>Update Project</h2>
          <img
            src={selectedProject.image.url}
            alt="current"
            style={{ width: "100%", borderRadius: "5px", marginBottom: "10px" }}
          />
          {newImage && (
            <img
              src={newImage}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "10px" }}
          />
          <input
            type="text"
            value={newAddress}
            onChange={handleAddressChange}
            placeholder="New address"
            style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
          />
          <button
            onClick={() =>
              updateImage(selectedProject.id, newImage, newAddress)
            }
            disabled={isLoading || (!newImage && !newAddress.trim())}
            style={{
              marginRight: "10px",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
            }}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              padding: "10px",
              backgroundColor: "#f44336",
              color: "white",
            }}
          >
            Cancel
          </button>
          {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}
