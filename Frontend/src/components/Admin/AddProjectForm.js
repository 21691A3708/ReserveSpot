// // export default AddProjectForm;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const injectGlobalStyles = () => {
//   const style = document.createElement("style");
//   style.innerHTML = `
//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(10px); }
//       to { opacity: 1; transform: translateY(0); }
//     }

//     @keyframes scaleIn {
//       from { transform: scale(0.95); opacity: 0; }
//       to { transform: scale(1); opacity: 1; }
//     }

//     .form-container {
//       animation: fadeIn 0.6s ease-in-out;
//     }

//     .image-preview {
//       animation: scaleIn 0.3s ease-out;
//       transition: transform 0.3s;
//     }

//     .image-preview:hover {
//       transform: scale(1.05);
//     }

//     .submit-btn {
//       transition: background-color 0.3s, transform 0.2s;
//     }

//     .submit-btn:hover {
//       background-color: #1d4ed8;
//       transform: scale(1.03);
//     }

//     input:focus, textarea:focus {
//       border-color: #3b82f6;
//       box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
//     }

//     .error-input {
//       border: 1px solid red !important;
//     }

//     .error-text {
//       color: red;
//       font-size: 12px;
//     }
//   `;
//   document.head.appendChild(style);
// };

// function AddProjectForm({ setView }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     images: [],
//     location: { address: "", latitude: "", longitude: "", mapLink: "" },
//     infoTable: {
//       bedrooms: "",
//       bathrooms: "",
//       squareFootage: "",
//       lotSize: "",
//       amenities: "",
//       soldPrice: "",
//     },
//   });

//   const [previewImages, setPreviewImages] = useState([]);
//   const [formErrors, setFormErrors] = useState({});
//   const MAX_IMAGES = 50;
//   const MAX_IMAGE_SIZE_MB = 50;

//   useEffect(() => {
//     injectGlobalStyles();
//     return () => previewImages.forEach((img) => URL.revokeObjectURL(img.url));
//   }, [previewImages]);

//   const validateAll = () => {
//     const errors = {};
//     if (!formData.title.trim()) {
//       errors.title = "Title is required";
//     } else if (formData.title.length < 3) {
//       errors.title = "Title must be at least 3 characters";
//     }

//     if (!formData.description.trim()) {
//       errors.description = "Description is required";
//     } else if (formData.description.length < 10) {
//       errors.description = "Description must be at least 10 characters";
//     }

//     const { address, latitude, longitude, mapLink } = formData.location;

//     if (!address || address.length < 5) {
//       errors.address =
//         "Address is required and should be at least 5 characters.";
//     }

//     const lat = parseFloat(latitude);
//     if (isNaN(lat) || lat < -90 || lat > 90) {
//       errors.latitude = "Latitude must be a number between -90 and 90.";
//     }

//     const lng = parseFloat(longitude);
//     if (isNaN(lng) || lng < -180 || lng > 180) {
//       errors.longitude = "Longitude must be a number between -180 and 180.";
//     }

//     if (mapLink && !/^https?:\/\/\S+\.\S+/.test(mapLink)) {
//       errors.mapLink = "Map link must be a valid URL.";
//     }

//     const requiredInfoFields = [
//       "bedrooms",
//       "bathrooms",
//       "squareFootage",
//       "lotSize",
//       "soldPrice",
//     ];

//     requiredInfoFields.forEach((field) => {
//       if (!formData.infoTable[field]) {
//         errors[field] = `${
//           field.charAt(0).toUpperCase() + field.slice(1)
//         } is required.`;
//       }
//     });

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleImageChange = (e) => {
//     let files = Array.from(e.target.files);
//     const oversized = files.filter(
//       (file) => file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024
//     );
//     if (oversized.length) {
//       toast.error(`Some files are larger than ${MAX_IMAGE_SIZE_MB}MB.`);
//       files = files.filter(
//         (file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024
//       );
//     }

//     const total = [...formData.images, ...files];
//     if (total.length > MAX_IMAGES) {
//       toast.error(`You can upload a maximum of ${MAX_IMAGES} images.`);
//       files = files.slice(0, MAX_IMAGES - formData.images.length);
//     }

//     const newPreviews = files.map((file) => ({
//       url: URL.createObjectURL(file),
//       description: "",
//     }));

//     setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
//     setPreviewImages((prev) => [...prev, ...newPreviews]);
//   };

//   const handleRemoveImage = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//     setPreviewImages((prev) => {
//       URL.revokeObjectURL(prev[index].url);
//       return prev.filter((_, i) => i !== index);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateAll()) {
//       toast.error("Please fix validation errors.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return toast.error("Unauthorized");

//       const convertToBase64 = (file) =>
//         new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.readAsDataURL(file);
//           reader.onload = () => resolve(reader.result);
//           reader.onerror = reject;
//         });

//       const base64Images = await Promise.all(
//         formData.images.map((img) => convertToBase64(img))
//       );

//       const payload = {
//         title: formData.title,
//         description: formData.description,
//         images: base64Images,
//         locationData: {
//           ...formData.location,
//           latitude: parseFloat(formData.location.latitude) || 0,
//           longitude: parseFloat(formData.location.longitude) || 0,
//         },
//         infoTableData: formData.infoTable,
//       };

//       await axios.post("/api/projects", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       toast.success("Project saved!");
//       setFormData({
//         title: "",
//         description: "",
//         images: [],
//         location: { address: "", latitude: "", longitude: "", mapLink: "" },
//         infoTable: {
//           bedrooms: "",
//           bathrooms: "",
//           squareFootage: "",
//           lotSize: "",
//           amenities: "",
//           soldPrice: "",
//         },
//       });
//       setPreviewImages([]);
//       setView("list");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save project.");
//     }
//   };

//   const inputStyle = (field) =>
//     formErrors[field]
//       ? { border: "1px solid red", padding: "10px", width: "100%" }
//       : { padding: "10px", width: "100%" };

//   return (
//     <div style={{ position: "relative" }}>
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           width: "78.5%",
//           right: 0,
//           backgroundColor: "white",
//           zIndex: 950,
//           padding: "1.5%",
//           borderBottom: "1px solid #ddd",
//         }}
//       >
//         <h3 style={{ margin: 0, textAlign: "center" }}>Add New Project</h3>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="form-container"
//         style={{
//           background: "white",
//           padding: "2%",
//           borderRadius: "1%",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//           marginTop: "7%",
//           width: "96%",
//           marginLeft: "2%",
//           marginRight: "2%",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Project Title"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           style={inputStyle("title")}
//         />
//         {formErrors.title && (
//           <div className="error-text">{formErrors.title}</div>
//         )}

//         <textarea
//           placeholder="Project Description"
//           value={formData.description}
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//           style={inputStyle("description")}
//         />
//         {formErrors.description && (
//           <div className="error-text">{formErrors.description}</div>
//         )}

//         <label>
//           <strong>Upload Images</strong>
//         </label>
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleImageChange}
//         />

//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "10px",
//             marginTop: "10px",
//           }}
//         >
//           {previewImages.map((img, index) => (
//             <div
//               key={index}
//               className="image-preview"
//               style={{
//                 position: "relative",
//                 width: "120px",
//                 height: "120px",
//                 border: "1px solid #ddd",
//                 borderRadius: "6px",
//                 overflow: "hidden",
//               }}
//             >
//               <img
//                 src={img.url}
//                 alt="preview"
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//               <button
//                 type="button"
//                 onClick={() => handleRemoveImage(index)}
//                 style={{
//                   position: "absolute",
//                   top: "5px",
//                   right: "5px",
//                   background: "red",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   fontSize: "12px",
//                   padding: "4px 6px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <h5>Location Info</h5>
//         {["address", "latitude", "longitude", "mapLink"].map((field) => (
//           <div key={field} style={{ marginBottom: "10px" }}>
//             <input
//               type="text"
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               value={formData.location[field]}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   location: { ...prev.location, [field]: e.target.value },
//                 }))
//               }
//               style={inputStyle(field)}
//             />
//             {formErrors[field] && (
//               <div className="error-text">{formErrors[field]}</div>
//             )}
//           </div>
//         ))}

//         <h5>Property Info</h5>
//         {[
//           "bedrooms",
//           "bathrooms",
//           "squareFootage",
//           "lotSize",
//           "amenities",
//           "soldPrice",
//         ].map((field) => (
//           <div key={field} style={{ marginBottom: "10px" }}>
//             <input
//               type={
//                 ["amenities", "lotSize"].includes(field) ? "text" : "number"
//               }
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               value={formData.infoTable[field]}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   infoTable: { ...prev.infoTable, [field]: e.target.value },
//                 }))
//               }
//               style={inputStyle(field)}
//             />
//             {formErrors[field] && (
//               <div className="error-text">{formErrors[field]}</div>
//             )}
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="submit-btn"
//           style={{
//             backgroundColor: "#0066cc",
//             color: "white",
//             padding: "1.5% 4%",
//             border: "none",
//             borderRadius: "0.5%",
//             cursor: "pointer",
//           }}
//         >
//           Save Project
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddProjectForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa"; // <-- Back icon

const injectGlobalStyles = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes scaleIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .form-container {
      animation: fadeIn 0.6s ease-in-out;
    }

    .image-preview {
      animation: scaleIn 0.3s ease-out;
      transition: transform 0.3s;
    }

    .image-preview:hover {
      transform: scale(1.05);
    }

    .submit-btn {
      transition: background-color 0.3s, transform 0.2s;
    }

    .submit-btn:hover {
      background-color: #1d4ed8;
      transform: scale(1.03);
    }

    input:focus, textarea:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    .error-input {
      border: 1px solid red !important;
    }

    .error-text {
      color: red;
      font-size: 12px;
    }
  `;
  document.head.appendChild(style);
};

function AddProjectForm({ setView }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    location: { address: "", latitude: "", longitude: "", mapLink: "" },
    infoTable: {
      bedrooms: "",
      bathrooms: "",
      squareFootage: "",
      lotSize: "",
      amenities: "",
      soldPrice: "",
    },
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const MAX_IMAGES = 50;
  const MAX_IMAGE_SIZE_MB = 50;

  useEffect(() => {
    injectGlobalStyles();
    return () => previewImages.forEach((img) => URL.revokeObjectURL(img.url));
  }, [previewImages]);

  const validateAll = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.length < 3) {
      errors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    const { address, latitude, longitude, mapLink } = formData.location;

    if (!address || address.length < 5) {
      errors.address =
        "Address is required and should be at least 5 characters.";
    }

    const lat = parseFloat(latitude);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.latitude = "Latitude must be a number between -90 and 90.";
    }

    const lng = parseFloat(longitude);
    if (isNaN(lng) || lng < -180 || lng > 180) {
      errors.longitude = "Longitude must be a number between -180 and 180.";
    }

    if (mapLink && !/^https?:\/\/\S+\.\S+/.test(mapLink)) {
      errors.mapLink = "Map link must be a valid URL.";
    }

    const requiredInfoFields = [
      "bedrooms",
      "bathrooms",
      "squareFootage",
      "lotSize",
      "soldPrice",
    ];

    requiredInfoFields.forEach((field) => {
      if (!formData.infoTable[field]) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (e) => {
    let files = Array.from(e.target.files);
    const oversized = files.filter(
      (file) => file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024
    );
    if (oversized.length) {
      toast.error(`Some files are larger than ${MAX_IMAGE_SIZE_MB}MB.`);
      files = files.filter(
        (file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024
      );
    }

    const total = [...formData.images, ...files];
    if (total.length > MAX_IMAGES) {
      toast.error(`You can upload a maximum of ${MAX_IMAGES} images.`);
      files = files.slice(0, MAX_IMAGES - formData.images.length);
    }

    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      description: "",
    }));

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      toast.error("Please fix validation errors.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Unauthorized");

      const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });

      const base64Images = await Promise.all(
        formData.images.map((img) => convertToBase64(img))
      );

      const payload = {
        title: formData.title,
        description: formData.description,
        images: base64Images,
        locationData: {
          ...formData.location,
          latitude: parseFloat(formData.location.latitude) || 0,
          longitude: parseFloat(formData.location.longitude) || 0,
        },
        infoTableData: formData.infoTable,
      };

      await axios.post("/api/projects", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Project saved!");
      setFormData({
        title: "",
        description: "",
        images: [],
        location: { address: "", latitude: "", longitude: "", mapLink: "" },
        infoTable: {
          bedrooms: "",
          bathrooms: "",
          squareFootage: "",
          lotSize: "",
          amenities: "",
          soldPrice: "",
        },
      });
      setPreviewImages([]);
      setView("list");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project.");
    }
  };

  const inputStyle = (field) =>
    formErrors[field]
      ? { border: "1px solid red", padding: "10px", width: "100%" }
      : { padding: "10px", width: "100%" };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingLeft: "2.5%",
        overflowY: "auto",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="form-container"
        style={{
          background: "white",
          padding: "2%",
          borderRadius: "1%",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          marginTop: "7%",
          width: "96%",
          marginLeft: "2%",
          marginRight: "2%",
        }}
      >
        <div
          className="div"
          style={{
            left: 0,
            display: "flex",
            alignItems: "center",
            background: "none",
            border: "none",
            color: "#333",
            fontSize: "1rem",
            cursor: "pointer",
            padding: "0",
          }}
        >
          <button
            onClick={() => setView("list")}
            style={{
              left: 0,
              display: "flex",
              alignItems: "center",
              background: "none",
              border: "none",
              color: "#333",
              fontSize: "1rem",
              cursor: "pointer",
              padding: "0",
            }}
          >
            <FaArrowLeft style={{ marginRight: "6px", fontSize: "1.2rem" }} />
          </button>

          <h3 style={{ margin: 0 }}>Add New Project</h3>
        </div>
        <input
          type="text"
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={inputStyle("title")}
        />
        {formErrors.title && (
          <div className="error-text">{formErrors.title}</div>
        )}

        <textarea
          placeholder="Project Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          style={inputStyle("description")}
        />
        {formErrors.description && (
          <div className="error-text">{formErrors.description}</div>
        )}

        <label>
          <strong>Upload Images</strong>
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {previewImages.map((img, index) => (
            <div
              key={index}
              className="image-preview"
              style={{
                position: "relative",
                width: "120px",
                height: "120px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <img
                src={img.url}
                alt="preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "12px",
                  padding: "4px 6px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <h5>Location Info</h5>
        {["address", "latitude", "longitude", "mapLink"].map((field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData.location[field]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  location: { ...prev.location, [field]: e.target.value },
                }))
              }
              style={inputStyle(field)}
            />
            {formErrors[field] && (
              <div className="error-text">{formErrors[field]}</div>
            )}
          </div>
        ))}

        <h5>Property Info</h5>
        {[
          "bedrooms",
          "bathrooms",
          "squareFootage",
          "lotSize",
          "amenities",
          "soldPrice",
        ].map((field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <input
              type={
                ["amenities", "lotSize"].includes(field) ? "text" : "number"
              }
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData.infoTable[field]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  infoTable: { ...prev.infoTable, [field]: e.target.value },
                }))
              }
              style={inputStyle(field)}
            />
            {formErrors[field] && (
              <div className="error-text">{formErrors[field]}</div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="submit-btn"
          style={{
            backgroundColor: "#0066cc",
            color: "white",
            padding: "1.5% 4%",
            border: "none",
            borderRadius: "0.5%",
            cursor: "pointer",
          }}
        >
          Save Project
        </button>
      </form>
    </div>
  );
}

export default AddProjectForm;
