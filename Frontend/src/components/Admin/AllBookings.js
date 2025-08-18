// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import { format, parseISO } from "date-fns";

// // // // export default function AllBookings() {
// // // //   const [bookings, setBookings] = useState([]);
// // // //   const [filteredBookings, setFilteredBookings] = useState([]);
// // // //   const [projectNames, setProjectNames] = useState([]);
// // // //   const [selectedProject, setSelectedProject] = useState("All");
// // // //   const [searchText, setSearchText] = useState("");
// // // //   const [fromDate, setFromDate] = useState("");
// // // //   const [toDate, setToDate] = useState("");
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const bookingsPerPage = 10;

// // // //   useEffect(() => {
// // // //     const fetchBookings = async () => {
// // // //       try {
// // // //         const res = await axios.get("/api/bookings/all");
// // // //         const data = res.data;
// // // //         setBookings(data);
// // // //         setFilteredBookings(data);
// // // //         const names = [
// // // //           ...new Set(
// // // //             data.map((b) =>
// // // //               b.projectId && b.projectId.title ? b.projectId.title : "Unknown"
// // // //             )
// // // //           ),
// // // //         ];
// // // //         setProjectNames(names);
// // // //       } catch (err) {
// // // //         console.error("Error fetching bookings:", err);
// // // //       }
// // // //     };
// // // //     fetchBookings();
// // // //   }, []);

// // // //   const applyFilters = () => {
// // // //     let results = [...bookings];

// // // //     if (selectedProject !== "All") {
// // // //       results = results.filter((b) => b.projectId?.title === selectedProject);
// // // //     }

// // // //     if (searchText.trim()) {
// // // //       const lowerSearch = searchText.toLowerCase();
// // // //       results = results.filter(
// // // //         (b) =>
// // // //           b.name.toLowerCase().includes(lowerSearch) ||
// // // //           b.email.toLowerCase().includes(lowerSearch) ||
// // // //           b.phone.toLowerCase().includes(lowerSearch)
// // // //       );
// // // //     }

// // // //     if (fromDate) {
// // // //       const from = new Date(fromDate);
// // // //       results = results.filter((b) => new Date(b.checkIn) >= from);
// // // //     }

// // // //     if (toDate) {
// // // //       const to = new Date(toDate);
// // // //       results = results.filter((b) => new Date(b.checkOut) <= to);
// // // //     }

// // // //     setFilteredBookings(results);
// // // //     setCurrentPage(1);
// // // //   };

// // // //   useEffect(() => {
// // // //     applyFilters();
// // // //   }, [selectedProject, searchText, fromDate, toDate, bookings]);

// // // //   const updateStatus = async (id, newStatus) => {
// // // //     try {
// // // //       const res = await axios.patch(
// // // //         `/api/bookings/${id}/status`,
// // // //         { status: newStatus }
// // // //       );
// // // //       const updated = res.data;
// // // //       const updatedList = bookings.map((b) =>
// // // //         b._id === id ? { ...b, status: updated.status } : b
// // // //       );
// // // //       setBookings(updatedList);
// // // //     } catch (err) {
// // // //       console.error("Failed to update status", err);
// // // //       alert("Error updating status.");
// // // //     }
// // // //   };

// // // //   const exportToCSV = () => {
// // // //     const headers = [
// // // //       "Name",
// // // //       "Email",
// // // //       "Phone",
// // // //       "Guests",
// // // //       "Check-In",
// // // //       "Check-Out",
// // // //       "Project",
// // // //       "Status",
// // // //     ];
// // // //     const rows = filteredBookings.map((b) => [
// // // //       b.name,
// // // //       b.email,
// // // //       b.phone,
// // // //       b.guests,
// // // //       format(new Date(b.checkIn), "dd/MM/yyyy"),
// // // //       format(new Date(b.checkOut), "dd/MM/yyyy"),
// // // //       b.projectId?.title || "Unknown",
// // // //       b.status || "Pending",
// // // //     ]);
// // // //     const csvContent =
// // // //       "data:text/csv;charset=utf-8," +
// // // //       [headers, ...rows].map((e) => e.join(",")).join("\n");
// // // //     const encodedUri = encodeURI(csvContent);
// // // //     const link = document.createElement("a");
// // // //     link.setAttribute("href", encodedUri);
// // // //     link.setAttribute("download", "bookings.csv");
// // // //     document.body.appendChild(link);
// // // //     link.click();
// // // //     document.body.removeChild(link);
// // // //   };

// // // //   // Pagination logic
// // // //   const indexOfLastBooking = currentPage * bookingsPerPage;
// // // //   const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
// // // //   const currentBookings = filteredBookings.slice(
// // // //     indexOfFirstBooking,
// // // //     indexOfLastBooking
// // // //   );
// // // //   const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

// // // //   return (
// // // //     <>
// // // //       <h2>All Bookings</h2>
// // // //       <div style={{ padding: "30px", backgroundColor: "#ecf0f1" }}>
// // // //         <div style={{ marginBottom: "20px" }}>
// // // //           <label>Filter by Project:</label>
// // // //           <select
// // // //             value={selectedProject}
// // // //             onChange={(e) => setSelectedProject(e.target.value)}
// // // //             style={{ marginLeft: "10px" }}
// // // //           >
// // // //             <option value="All">All</option>
// // // //             {projectNames.map((name, idx) => (
// // // //               <option key={idx} value={name}>
// // // //                 {name}
// // // //               </option>
// // // //             ))}
// // // //           </select>

// // // //           <input
// // // //             type="text"
// // // //             placeholder="Search by name, email, phone"
// // // //             value={searchText}
// // // //             onChange={(e) => setSearchText(e.target.value)}
// // // //             style={{ marginLeft: "20px", padding: "5px", width: "200px" }}
// // // //           />

// // // //           <input
// // // //             type="date"
// // // //             value={fromDate}
// // // //             onChange={(e) => setFromDate(e.target.value)}
// // // //             style={{ marginLeft: "20px" }}
// // // //           />
// // // //           <input
// // // //             type="date"
// // // //             value={toDate}
// // // //             onChange={(e) => setToDate(e.target.value)}
// // // //             style={{ marginLeft: "10px" }}
// // // //           />

// // // //           <button
// // // //             onClick={exportToCSV}
// // // //             style={{
// // // //               marginLeft: "20px",
// // // //               padding: "5px 10px",
// // // //               backgroundColor: "#3498db",
// // // //               color: "white",
// // // //               border: "none",
// // // //               cursor: "pointer",
// // // //             }}
// // // //           >
// // // //             Export CSV
// // // //           </button>
// // // //         </div>

// // // //         {currentBookings.length === 0 ? (
// // // //           <p>No bookings found.</p>
// // // //         ) : (
// // // //           <>
// // // //             <table style={{ width: "100%", borderCollapse: "collapse" }}>
// // // //               <thead>
// // // //                 <tr style={{ backgroundColor: "#34495e", color: "white" }}>
// // // //                   <th style={thTdStyle}>Name</th>
// // // //                   <th style={thTdStyle}>Email</th>
// // // //                   <th style={thTdStyle}>Phone</th>
// // // //                   <th style={thTdStyle}>Guests</th>
// // // //                   <th style={thTdStyle}>Check-In</th>
// // // //                   <th style={thTdStyle}>Check-Out</th>
// // // //                   <th style={thTdStyle}>Project</th>
// // // //                   <th style={thTdStyle}>Status</th>
// // // //                   <th style={thTdStyle}>Actions</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {currentBookings.map((b) => (
// // // //                   <tr key={b._id}>
// // // //                     <td style={thTdStyle}>{b.name}</td>
// // // //                     <td style={thTdStyle}>{b.email}</td>
// // // //                     <td style={thTdStyle}>{b.phone}</td>
// // // //                     <td style={thTdStyle}>{b.guests}</td>
// // // //                     <td style={thTdStyle}>
// // // //                       {format(new Date(b.checkIn), "dd/MM/yyyy")}
// // // //                     </td>
// // // //                     <td style={thTdStyle}>
// // // //                       {format(new Date(b.checkOut), "dd/MM/yyyy")}
// // // //                     </td>
// // // //                     <td style={thTdStyle}>{b.projectId?.title || "Unknown"}</td>
// // // //                     <td style={thTdStyle}>
// // // //                       <strong>{b.status || "Pending"}</strong>
// // // //                     </td>
// // // //                     <td style={thTdStyle}>
// // // //                       {b.status === "Accepted" || b.status === "Rejected" ? (
// // // //                         "—"
// // // //                       ) : (
// // // //                         <>
// // // //                           <button
// // // //                             onClick={() => updateStatus(b._id, "Accepted")}
// // // //                             style={{
// // // //                               marginRight: "10px",
// // // //                               backgroundColor: "#2ecc71",
// // // //                               color: "white",
// // // //                               border: "none",
// // // //                               padding: "5px 10px",
// // // //                               cursor: "pointer",
// // // //                             }}
// // // //                           >
// // // //                             Accept
// // // //                           </button>
// // // //                           <button
// // // //                             onClick={() => updateStatus(b._id, "Rejected")}
// // // //                             style={{
// // // //                               backgroundColor: "#e74c3c",
// // // //                               color: "white",
// // // //                               border: "none",
// // // //                               padding: "5px 10px",
// // // //                               cursor: "pointer",
// // // //                             }}
// // // //                           >
// // // //                             Reject
// // // //                           </button>
// // // //                         </>
// // // //                       )}
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>

// // // //             <div style={{ marginTop: "20px", textAlign: "center" }}>
// // // //               {Array.from({ length: totalPages }, (_, index) => (
// // // //                 <button
// // // //                   key={index + 1}
// // // //                   onClick={() => setCurrentPage(index + 1)}
// // // //                   style={{
// // // //                     margin: "0 5px",
// // // //                     padding: "5px 10px",
// // // //                     backgroundColor:
// // // //                       currentPage === index + 1 ? "#2980b9" : "#bdc3c7",
// // // //                     color: "white",
// // // //                     border: "none",
// // // //                     cursor: "pointer",
// // // //                   }}
// // // //                 >
// // // //                   {index + 1}
// // // //                 </button>
// // // //               ))}
// // // //             </div>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </>
// // // //   );
// // // // }

// // // // const thTdStyle = {
// // // //   border: "1px solid #ddd",
// // // //   padding: "8px",
// // // //   textAlign: "left",
// // // // };
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { format } from "date-fns";

// // // export default function AllBookings() {
// // //   const [bookings, setBookings] = useState([]);
// // //   const [filteredBookings, setFilteredBookings] = useState([]);
// // //   const [projectNames, setProjectNames] = useState([]);
// // //   const [selectedProject, setSelectedProject] = useState("All");
// // //   const [searchText, setSearchText] = useState("");
// // //   const [fromDate, setFromDate] = useState("");
// // //   const [toDate, setToDate] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const bookingsPerPage = 10;

// // //   useEffect(() => {
// // //     const fetchBookings = async () => {
// // //       try {
// // //         const res = await axios.get("/api/bookings/all");
// // //         const data = res.data;
// // //         setBookings(data);
// // //         setFilteredBookings(data);
// // //         const names = [
// // //           ...new Set(data.map((b) => b.projectId?.title || "Unknown")),
// // //         ];
// // //         setProjectNames(names);
// // //       } catch (err) {
// // //         console.error("Error fetching bookings:", err);
// // //       }
// // //     };
// // //     fetchBookings();
// // //   }, []);

// // //   const applyFilters = () => {
// // //     let results = [...bookings];

// // //     if (selectedProject !== "All") {
// // //       results = results.filter((b) => b.projectId?.title === selectedProject);
// // //     }

// // //     if (searchText.trim()) {
// // //       const q = searchText.toLowerCase();
// // //       results = results.filter(
// // //         (b) =>
// // //           b.name.toLowerCase().includes(q) ||
// // //           b.email.toLowerCase().includes(q) ||
// // //           b.phone.toLowerCase().includes(q)
// // //       );
// // //     }

// // //     if (fromDate) {
// // //       results = results.filter(
// // //         (b) => new Date(b.checkIn) >= new Date(fromDate)
// // //       );
// // //     }

// // //     if (toDate) {
// // //       results = results.filter((b) => new Date(b.checkOut) <= new Date(toDate));
// // //     }

// // //     setFilteredBookings(results);
// // //     setCurrentPage(1);
// // //   };
// // //   const confirmChange = async (id, newStatus) => {
// // //     const confirm = window.confirm(`Change status to ${newStatus}?`);
// // //     if (confirm) {
// // //       await updateStatus(id, newStatus);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     applyFilters();
// // //   }, [searchText, selectedProject, fromDate, toDate, bookings]);

// // //   const updateStatus = async (id, newStatus) => {
// // //     try {
// // //       const res = await axios.patch(
// // //         `/api/bookings/${id}/status`,
// // //         { status: newStatus }
// // //       );
// // //       const updated = res.data;
// // //       const updatedList = bookings.map((b) =>
// // //         b._id === id ? { ...b, status: updated.status } : b
// // //       );
// // //       setBookings(updatedList);
// // //     } catch (err) {
// // //       alert("Status update failed");
// // //     }
// // //   };

// // //   const indexOfLast = currentPage * bookingsPerPage;
// // //   const indexOfFirst = indexOfLast - bookingsPerPage;
// // //   const current = filteredBookings.slice(indexOfFirst, indexOfLast);
// // //   const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

// // //   return (
// // //     <div style={styles.container}>
// // //       <h2 style={styles.heading}>📋 All Bookings</h2>
// // //       <div style={styles.filterBar}>
// // //         <select
// // //           style={styles.select}
// // //           value={selectedProject}
// // //           onChange={(e) => setSelectedProject(e.target.value)}
// // //         >
// // //           <option value="All">All Projects</option>
// // //           {projectNames.map((name, i) => (
// // //             <option key={i} value={name}>
// // //               {name}
// // //             </option>
// // //           ))}
// // //         </select>

// // //         <input
// // //           type="text"
// // //           placeholder="Search by name, email or phone"
// // //           style={styles.input}
// // //           value={searchText}
// // //           onChange={(e) => setSearchText(e.target.value)}
// // //         />
// // //         <input
// // //           type="date"
// // //           value={fromDate}
// // //           onChange={(e) => setFromDate(e.target.value)}
// // //           style={styles.input}
// // //         />
// // //         <input
// // //           type="date"
// // //           value={toDate}
// // //           onChange={(e) => setToDate(e.target.value)}
// // //           style={styles.input}
// // //         />
// // //       </div>

// // //       <div style={styles.tableWrapper}>
// // //         {current.length === 0 ? (
// // //           <p>No bookings found.</p>
// // //         ) : (
// // //           <table style={styles.table}>
// // //             <thead>
// // //               <tr>
// // //                 {[
// // //                   "Name",
// // //                   "Email",
// // //                   "Phone",
// // //                   "Guests",
// // //                   "Check-In",
// // //                   "Check-Out",
// // //                   "Project",
// // //                   "Status",
// // //                   "Actions",
// // //                 ].map((head, i) => (
// // //                   <th key={i} style={styles.th}>
// // //                     {head}
// // //                   </th>
// // //                 ))}
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {current.map((b) => (
// // //                 <tr key={b._id}>
// // //                   <td style={styles.td}>{b.name}</td>
// // //                   <td style={styles.td}>{b.email}</td>
// // //                   <td style={styles.td}>{b.phone}</td>
// // //                   <td style={styles.td}>{b.guests}</td>
// // //                   <td style={styles.td}>
// // //                     {format(new Date(b.checkIn), "dd/MM/yyyy")}
// // //                   </td>
// // //                   <td style={styles.td}>
// // //                     {format(new Date(b.checkOut), "dd/MM/yyyy")}
// // //                   </td>
// // //                   <td style={styles.td}>{b.projectId?.title || "Unknown"}</td>
// // //                   <td style={styles.td}>
// // //                     <strong>{b.status || "Pending"}</strong>
// // //                   </td>
// // //                   <td style={styles.td}>
// // //                     {b.status === "Accepted" || b.status === "Rejected" ? (
// // //                       "-"
// // //                     ) : (
// // //                       <>
// // //                         <button
// // //                           onClick={() => updateStatus(b._id, "Accepted")}
// // //                           style={{
// // //                             ...styles.button,
// // //                             backgroundColor: "#2ecc71",
// // //                           }}
// // //                         >
// // //                           Accept
// // //                         </button>
// // //                         <button
// // //                           onClick={() => updateStatus(b._id, "Rejected")}
// // //                           style={{
// // //                             ...styles.button,
// // //                             backgroundColor: "#e74c3c",
// // //                           }}
// // //                         >
// // //                           Reject
// // //                         </button>
// // //                       </>
// // //                     )}
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         )}
// // //       </div>

// // //       <div style={styles.pagination}>
// // //         {Array.from({ length: totalPages }, (_, i) => (
// // //           <button
// // //             key={i}
// // //             style={{
// // //               ...styles.pageButton,
// // //               backgroundColor: currentPage === i + 1 ? "#3498db" : "#ecf0f1",
// // //               color: currentPage === i + 1 ? "white" : "#2c3e50",
// // //             }}
// // //             onClick={() => setCurrentPage(i + 1)}
// // //           >
// // //             {i + 1}
// // //           </button>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   container: {
// // //     padding: "30px",
// // //     fontFamily: "Arial, sans-serif",
// // //     backgroundColor: "#f9f9f9",
// // //   },
// // //   heading: {
// // //     marginBottom: "20px",
// // //     color: "#2c3e50",
// // //   },
// // //   filterBar: {
// // //     display: "flex",
// // //     gap: "15px",
// // //     marginBottom: "20px",
// // //     flexWrap: "wrap",
// // //   },
// // //   input: {
// // //     padding: "8px",
// // //     borderRadius: "5px",
// // //     border: "1px solid #ccc",
// // //     minWidth: "180px",
// // //   },
// // //   select: {
// // //     padding: "8px",
// // //     borderRadius: "5px",
// // //     border: "1px solid #ccc",
// // //     minWidth: "200px",
// // //   },
// // //   tableWrapper: {
// // //     overflowX: "auto",
// // //     backgroundColor: "#fff",
// // //     borderRadius: "10px",
// // //     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
// // //   },
// // //   table: {
// // //     width: "100%",
// // //     borderCollapse: "collapse",
// // //   },
// // //   th: {
// // //     backgroundColor: "#34495e",
// // //     color: "white",
// // //     padding: "10px",
// // //     textAlign: "left",
// // //   },
// // //   td: {
// // //     padding: "10px",
// // //     borderBottom: "1px solid #ecf0f1",
// // //   },
// // //   button: {
// // //     padding: "5px 10px",
// // //     color: "white",
// // //     border: "none",
// // //     borderRadius: "4px",
// // //     marginRight: "5px",
// // //     cursor: "pointer",
// // //   },
// // //   pagination: {
// // //     marginTop: "20px",
// // //     textAlign: "center",
// // //   },
// // //   pageButton: {
// // //     padding: "8px 12px",
// // //     margin: "0 4px",
// // //     border: "none",
// // //     borderRadius: "4px",
// // //     cursor: "pointer",
// // //   },
// // // };
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { format } from "date-fns";

// // export default function AllBookings() {
// //   const [bookings, setBookings] = useState([]);
// //   const [filteredBookings, setFilteredBookings] = useState([]);
// //   const [projectNames, setProjectNames] = useState([]);
// //   const [selectedProject, setSelectedProject] = useState("All");
// //   const [searchText, setSearchText] = useState("");
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const bookingsPerPage = 10;

// //   useEffect(() => {
// //     const fetchBookings = async () => {
// //       try {
// //         const res = await axios.get("/api/bookings/all");
// //         const data = res.data;
// //         setBookings(data);
// //         const names = [
// //           ...new Set(data.map((b) => b.projectId?.title || "Unknown")),
// //         ];
// //         setProjectNames(names);
// //       } catch (err) {
// //         console.error("Error fetching bookings:", err);
// //       }
// //     };
// //     fetchBookings();
// //   }, []);

// //   useEffect(() => {
// //     applyFilters();
// //   }, [bookings, selectedProject, searchText, fromDate, toDate]);

// //   const applyFilters = () => {
// //     let results = [...bookings];

// //     if (selectedProject !== "All") {
// //       results = results.filter((b) => b.projectId?.title === selectedProject);
// //     }

// //     if (searchText.trim()) {
// //       const q = searchText.toLowerCase();
// //       results = results.filter(
// //         (b) =>
// //           b.name.toLowerCase().includes(q) ||
// //           b.email.toLowerCase().includes(q) ||
// //           b.phone.toLowerCase().includes(q)
// //       );
// //     }

// //     if (fromDate) {
// //       const from = new Date(fromDate).setHours(0, 0, 0, 0);
// //       results = results.filter(
// //         (b) => new Date(b.checkIn).setHours(0, 0, 0, 0) >= from
// //       );
// //     }

// //     if (toDate) {
// //       const to = new Date(toDate).setHours(23, 59, 59, 999);
// //       results = results.filter(
// //         (b) => new Date(b.checkOut).setHours(0, 0, 0, 0) <= to
// //       );
// //     }

// //     setFilteredBookings(results);
// //     setCurrentPage(1);
// //   };

// //   const confirmChange = async (id, newStatus) => {
// //     const confirm = window.confirm(`Change status to ${newStatus}?`);
// //     if (confirm) {
// //       await updateStatus(id, newStatus);
// //     }
// //   };

// //   const updateStatus = async (id, newStatus) => {
// //     try {
// //       const res = await axios.patch(`/api/bookings/${id}`, {
// //         status: newStatus,
// //       });
// //       const updated = res.data;
// //       const updatedList = bookings.map((b) =>
// //         b._id === id ? { ...b, status: updated.status } : b
// //       );
// //       setBookings(updatedList);
// //     } catch (err) {
// //       alert("Status update failed");
// //       console.error(err);
// //     }
// //   };

// //   const indexOfLast = currentPage * bookingsPerPage;
// //   const indexOfFirst = indexOfLast - bookingsPerPage;
// //   const current = filteredBookings.slice(indexOfFirst, indexOfLast);
// //   const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

// //   return (
// //     <div style={styles.container}>
// //       <h2 style={styles.heading}>📋 All Bookings</h2>

// //       <div style={styles.filterBar}>
// //         <select
// //           style={styles.select}
// //           value={selectedProject}
// //           onChange={(e) => setSelectedProject(e.target.value)}
// //         >
// //           <option value="All">All Projects</option>
// //           {projectNames.map((name, i) => (
// //             <option key={i} value={name}>
// //               {name}
// //             </option>
// //           ))}
// //         </select>

// //         <input
// //           type="text"
// //           placeholder="Search by name, email or phone"
// //           style={styles.input}
// //           value={searchText}
// //           onChange={(e) => setSearchText(e.target.value)}
// //         />

// //         <input
// //           type="date"
// //           value={fromDate}
// //           onChange={(e) => setFromDate(e.target.value)}
// //           style={styles.input}
// //         />

// //         <input
// //           type="date"
// //           value={toDate}
// //           onChange={(e) => setToDate(e.target.value)}
// //           style={styles.input}
// //         />
// //       </div>

// //       <div style={styles.tableWrapper}>
// //         {current.length === 0 ? (
// //           <p>No bookings found.</p>
// //         ) : (
// //           <table style={styles.table}>
// //             <thead>
// //               <tr>
// //                 {[
// //                   "Name",
// //                   "Email",
// //                   "Phone",
// //                   "Guests",
// //                   "Check-In",
// //                   "Check-Out",
// //                   "Project",
// //                   "Status",
// //                   "Actions",
// //                 ].map((head, i) => (
// //                   <th key={i} style={styles.th}>
// //                     {head}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {current.map((b) => (
// //                 <tr key={b._id}>
// //                   <td style={styles.td}>{b.name}</td>
// //                   <td style={styles.td}>{b.email}</td>
// //                   <td style={styles.td}>{b.phone}</td>
// //                   <td style={styles.td}>{b.guests}</td>
// //                   <td style={styles.td}>
// //                     {format(new Date(b.checkIn), "dd/MM/yyyy")}
// //                   </td>
// //                   <td style={styles.td}>
// //                     {format(new Date(b.checkOut), "dd/MM/yyyy")}
// //                   </td>
// //                   <td style={styles.td}>{b.projectId?.title || "Unknown"}</td>
// //                   <td style={styles.td}>
// //                     <strong>{b.status || "Pending"}</strong>
// //                   </td>
// //                   <td style={styles.td}>
// //                     {b.status === "Accepted" || b.status === "Rejected" ? (
// //                       "-"
// //                     ) : (
// //                       <>
// //                         <button
// //                           onClick={() => confirmChange(b._id, "Accepted")}
// //                           style={{
// //                             ...styles.button,
// //                             backgroundColor: "#2ecc71",
// //                           }}
// //                         >
// //                           Accept
// //                         </button>
// //                         <button
// //                           onClick={() => confirmChange(b._id, "Rejected")}
// //                           style={{
// //                             ...styles.button,
// //                             backgroundColor: "#e74c3c",
// //                           }}
// //                         >
// //                           Reject
// //                         </button>
// //                       </>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>

// //       <div style={styles.pagination}>
// //         {Array.from({ length: totalPages }, (_, i) => (
// //           <button
// //             key={i}
// //             style={{
// //               ...styles.pageButton,
// //               backgroundColor: currentPage === i + 1 ? "#3498db" : "#ecf0f1",
// //               color: currentPage === i + 1 ? "white" : "#2c3e50",
// //             }}
// //             onClick={() => setCurrentPage(i + 1)}
// //           >
// //             {i + 1}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   container: {
// //     padding: "30px",
// //     fontFamily: "Arial, sans-serif",
// //     backgroundColor: "#f9f9f9",
// //   },
// //   heading: {
// //     marginBottom: "20px",
// //     color: "#2c3e50",
// //   },
// //   filterBar: {
// //     display: "flex",
// //     gap: "15px",
// //     marginBottom: "20px",
// //     flexWrap: "wrap",
// //   },
// //   input: {
// //     padding: "8px",
// //     borderRadius: "5px",
// //     border: "1px solid #ccc",
// //     minWidth: "180px",
// //   },
// //   select: {
// //     padding: "8px",
// //     borderRadius: "5px",
// //     border: "1px solid #ccc",
// //     minWidth: "200px",
// //   },
// //   tableWrapper: {
// //     overflowX: "auto",
// //     backgroundColor: "#fff",
// //     borderRadius: "10px",
// //     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
// //   },
// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //   },
// //   th: {
// //     backgroundColor: "#34495e",
// //     color: "white",
// //     padding: "10px",
// //     textAlign: "left",
// //   },
// //   td: {
// //     padding: "10px",
// //     borderBottom: "1px solid #ecf0f1",
// //   },
// //   button: {
// //     padding: "5px 10px",
// //     color: "white",
// //     border: "none",
// //     borderRadius: "4px",
// //     marginRight: "5px",
// //     cursor: "pointer",
// //   },
// //   pagination: {
// //     marginTop: "20px",
// //     textAlign: "center",
// //   },
// //   pageButton: {
// //     padding: "8px 12px",
// //     margin: "0 4px",
// //     border: "none",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //   },
// // };
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";

// export default function AllBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [projectNames, setProjectNames] = useState([]);
//   const [selectedProject, setSelectedProject] = useState("All");
//   const [searchText, setSearchText] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const bookingsPerPage = 10;

//   const navigate = useNavigate();

//   // Load data on mount
//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [bookings, selectedProject, searchText, fromDate, toDate]);

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("/api/bookings/all");
//       const data = res.data;
//       setBookings(data);
//       const names = [
//         ...new Set(data.map((b) => b.projectId?.title || "Unknown")),
//       ];
//       setProjectNames(names);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     }
//   };

//   const applyFilters = () => {
//     let results = [...bookings];

//     if (selectedProject !== "All") {
//       results = results.filter((b) => b.projectId?.title === selectedProject);
//     }

//     if (searchText.trim()) {
//       const q = searchText.toLowerCase();
//       results = results.filter(
//         (b) =>
//           b.name.toLowerCase().includes(q) ||
//           b.email.toLowerCase().includes(q) ||
//           b.phone.toLowerCase().includes(q)
//       );
//     }

//     if (fromDate) {
//       const from = new Date(fromDate).setHours(0, 0, 0, 0);
//       results = results.filter(
//         (b) => new Date(b.checkIn).setHours(0, 0, 0, 0) >= from
//       );
//     }

//     if (toDate) {
//       const to = new Date(toDate).setHours(23, 59, 59, 999);
//       results = results.filter(
//         (b) => new Date(b.checkOut).setHours(0, 0, 0, 0) <= to
//       );
//     }

//     setFilteredBookings(results);
//     setCurrentPage(1);
//   };

//   const confirmChange = async (id, newStatus) => {
//     if (window.confirm(`Change status to ${newStatus}?`)) {
//       await updateStatus(id, newStatus);
//     }
//   };

//   const updateStatus = async (id, newStatus) => {
//     try {
//       const res = await axios.patch(`/api/bookings/${id}`, {
//         status: newStatus,
//       });
//       const updated = res.data;
//       const updatedList = bookings.map((b) =>
//         b._id === id ? { ...b, status: updated.status } : b
//       );
//       setBookings(updatedList);
//     } catch (err) {
//       alert("Status update failed");
//       console.error(err);
//     }
//   };

//   const indexOfLast = currentPage * bookingsPerPage;
//   const indexOfFirst = indexOfLast - bookingsPerPage;
//   const current = filteredBookings.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

//   return (
//     <div style={styles.container}>
//       <div style={styles.headerRow}>
//         <h2 style={styles.heading}>📋 All Bookings</h2>
//         <div>
//           <button
//             onClick={() => fetchBookings()}
//             title="Reload"
//             style={styles.iconButton}
//           >
//             🔄
//           </button>
//           <button
//             onClick={() => navigate(-1)}
//             title="Go Back"
//             style={styles.iconButton}
//           >
//             🔙
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div style={styles.filterBar}>
//         <select
//           style={styles.select}
//           value={selectedProject}
//           onChange={(e) => setSelectedProject(e.target.value)}
//         >
//           <option value="All">All Projects</option>
//           {projectNames.map((name, i) => (
//             <option key={i} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           placeholder="Search by name, email or phone"
//           style={styles.input}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />

//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           style={styles.input}
//         />

//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           style={styles.input}
//         />
//       </div>

//       {/* Table */}
//       <div style={styles.tableWrapper}>
//         {current.length === 0 ? (
//           <p>No bookings found.</p>
//         ) : (
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 {[
//                   "Name",
//                   "Email",
//                   "Phone",
//                   "Guests",
//                   "Check-In",
//                   "Check-Out",
//                   "Project",
//                   "Status",
//                   "Actions",
//                 ].map((head, i) => (
//                   <th key={i} style={styles.th}>
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {current.map((b) => (
//                 <tr key={b._id}>
//                   <td style={styles.td}>{b.name}</td>
//                   <td style={styles.td}>{b.email}</td>
//                   <td style={styles.td}>{b.phone}</td>
//                   <td style={styles.td}>{b.guests}</td>
//                   <td style={styles.td}>
//                     {format(new Date(b.checkIn), "dd/MM/yyyy")}
//                   </td>
//                   <td style={styles.td}>
//                     {format(new Date(b.checkOut), "dd/MM/yyyy")}
//                   </td>
//                   <td style={styles.td}>{b.projectId?.title || "Unknown"}</td>
//                   <td style={styles.td}>
//                     <strong>{b.status || "Pending"}</strong>
//                   </td>
//                   <td style={styles.td}>
//                     {b.status === "Accepted" || b.status === "Rejected" ? (
//                       "-"
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => confirmChange(b._id, "Accepted")}
//                           style={{
//                             ...styles.button,
//                             backgroundColor: "#2ecc71",
//                           }}
//                         >
//                           Accept
//                         </button>
//                         <button
//                           onClick={() => confirmChange(b._id, "Rejected")}
//                           style={{
//                             ...styles.button,
//                             backgroundColor: "#e74c3c",
//                           }}
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Pagination */}
//       <div style={styles.pagination}>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             style={{
//               ...styles.pageButton,
//               backgroundColor: currentPage === i + 1 ? "#3498db" : "#ecf0f1",
//               color: currentPage === i + 1 ? "white" : "#2c3e50",
//             }}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Styles
// const styles = {
//   container: {
//     padding: "30px",
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#f9f9f9",
//   },
//   headerRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px",
//   },
//   heading: {
//     color: "#2c3e50",
//   },
//   iconButton: {
//     fontSize: "20px",
//     backgroundColor: "transparent",
//     border: "none",
//     cursor: "pointer",
//     marginLeft: "10px",
//   },
//   filterBar: {
//     display: "flex",
//     gap: "15px",
//     marginBottom: "20px",
//     flexWrap: "wrap",
//   },
//   input: {
//     padding: "8px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     minWidth: "180px",
//   },
//   select: {
//     padding: "8px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     minWidth: "200px",
//   },
//   tableWrapper: {
//     overflowX: "auto",
//     backgroundColor: "#fff",
//     borderRadius: "10px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   th: {
//     backgroundColor: "#34495e",
//     color: "white",
//     padding: "10px",
//     textAlign: "left",
//   },
//   td: {
//     padding: "10px",
//     borderBottom: "1px solid #ecf0f1",
//   },
//   button: {
//     padding: "5px 10px",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     marginRight: "5px",
//     cursor: "pointer",
//   },
//   pagination: {
//     marginTop: "20px",
//     textAlign: "center",
//   },
//   pageButton: {
//     padding: "8px 12px",
//     margin: "0 4px",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [projectNames, setProjectNames] = useState([]);
  const [selectedProject, setSelectedProject] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const bookingsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, selectedProject, searchText, fromDate, toDate]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/bookings/all");
      const data = res.data;
      setBookings(data);
      const names = [
        ...new Set(data.map((b) => b.projectId?.title || "Unknown")),
      ];
      setProjectNames(names);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let results = [...bookings];

    if (selectedProject !== "All") {
      results = results.filter((b) => b.projectId?.title === selectedProject);
    }

    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      results = results.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q)
      );
    }

    if (fromDate) {
      const from = new Date(fromDate).setHours(0, 0, 0, 0);
      results = results.filter(
        (b) => new Date(b.checkIn).setHours(0, 0, 0, 0) >= from
      );
    }

    if (toDate) {
      const to = new Date(toDate).setHours(23, 59, 59, 999);
      results = results.filter(
        (b) => new Date(b.checkOut).setHours(0, 0, 0, 0) <= to
      );
    }

    setFilteredBookings(results);
    setCurrentPage(1);
  };

  const confirmChange = async (id, newStatus) => {
    if (window.confirm(`Change status to ${newStatus}?`)) {
      await updateStatus(id, newStatus);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(`/api/bookings/${id}`, {
        status: newStatus,
      });
      const updated = res.data;
      const updatedList = bookings.map((b) =>
        b._id === id ? { ...b, status: updated.status } : b
      );
      setBookings(updatedList);
    } catch (err) {
      alert("Status update failed");
      console.error(err);
    }
  };

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const current = filteredBookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  return (
    <div style={styles.container}>
      <style>
        {`
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={styles.headerRow}>
        {/* <button
          onClick={fetchBookings}
          title="Reload"
          style={styles.iconButton}
        >
          <ImSpinner2 className="spin" />
        </button> */}
        <button
          onClick={fetchBookings}
          title="Reload"
          style={styles.iconButton}
        >
          <ImSpinner2 className={isLoading ? "spin" : ""} />
        </button>
        <h2 style={{ ...styles.heading, textAlign: "center", flex: 1 }}>
          📋 All Bookings
        </h2>
        <button
          onClick={() => navigate(-1)}
          title="Go Back"
          style={styles.iconButton}
        >
          <FaArrowLeft />
        </button>
      </div>

      {/* Filters */}
      <div style={styles.filterBar}>
        <select
          style={styles.select}
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="All">All Projects</option>
          {projectNames.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by name, email or phone"
          style={styles.input}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        {current.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                {[
                  "Name",
                  "Email",
                  "Phone",
                  "Guests",
                  "Check-In",
                  "Check-Out",
                  "Project",
                  "Status",
                  "Actions",
                ].map((head, i) => (
                  <th key={i} style={styles.th}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {current.map((b) => (
                <tr key={b._id}>
                  <td style={styles.td}>{b.name}</td>
                  <td style={styles.td}>{b.email}</td>
                  <td style={styles.td}>{b.phone}</td>
                  <td style={styles.td}>{b.guests}</td>
                  <td style={styles.td}>
                    {format(new Date(b.checkIn), "dd/MM/yyyy")}
                  </td>
                  <td style={styles.td}>
                    {format(new Date(b.checkOut), "dd/MM/yyyy")}
                  </td>
                  <td style={styles.td}>{b.projectId?.title || "Unknown"}</td>
                  <td style={styles.td}>
                    {b.status === "Accepted" ? (
                      <span style={styles.acceptedBadge}>
                        <FaCheckCircle /> Accepted
                      </span>
                    ) : b.status === "Rejected" ? (
                      <span style={styles.rejectedBadge}>
                        <FaTimesCircle /> Rejected
                      </span>
                    ) : (
                      <span style={styles.pendingBadge}>Pending</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    {b.status === "Accepted" || b.status === "Rejected" ? (
                      "-"
                    ) : (
                      <>
                        <FaCheckCircle
                          title="Accept"
                          onClick={() => confirmChange(b._id, "Accepted")}
                          style={styles.acceptIcon}
                        />
                        <FaTimesCircle
                          title="Reject"
                          onClick={() => confirmChange(b._id, "Rejected")}
                          style={styles.rejectIcon}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            style={{
              ...styles.pageButton,
              backgroundColor: currentPage === i + 1 ? "#3498db" : "#ecf0f1",
              color: currentPage === i + 1 ? "white" : "#2c3e50",
            }}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

// Styles
const styles = {
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "24px",
  },
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  heading: {
    color: "#2c3e50",
  },
  iconButton: {
    fontSize: "20px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    marginLeft: "10px",
  },
  filterBar: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minWidth: "180px",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minWidth: "200px",
  },
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#34495e",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ecf0f1",
  },
  acceptedBadge: {
    color: "#27ae60",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  rejectedBadge: {
    color: "#c0392b",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  pendingBadge: {
    color: "#f39c12",
    fontWeight: "bold",
  },
  acceptIcon: {
    color: "#2ecc71",
    fontSize: "20px",
    cursor: "pointer",
    marginRight: "10px",
  },
  rejectIcon: {
    color: "#e74c3c",
    fontSize: "20px",
    cursor: "pointer",
  },
  pagination: {
    marginTop: "20px",
    textAlign: "center",
  },
  pageButton: {
    padding: "8px 12px",
    margin: "0 4px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
