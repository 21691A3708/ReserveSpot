// export default AdminVideoUpload;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { FaArrowLeft } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

function AdminVideoUpload({ setView }) {
  const [videoFile, setVideoFile] = useState(null);
  const [overlayText, setOverlayText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const [textUpdate, setTextUpdate] = useState("");
  const [newVideoFile, setNewVideoFile] = useState(null);
  const [isTextUpdating, setIsTextUpdating] = useState(false);
  const [isVideoUpdating, setIsVideoUpdating] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/video`)
      .then((res) => {
        if (res.data && res.data._id) {
          setUploadedVideo(res.data);
          setTextUpdate(res.data.overlayText);
        }
      })
      .catch((err) => {
        console.log("No video found or error:", err);
      });
  }, []);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  if (isVideoUpdating) return <Loader />;

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !overlayText) {
      toast.error("Please provide both video and overlay text.");
      return;
    }

    try {
      setIsUploading(true);
      const videoBase64 = await convertToBase64(videoFile);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE_URL}/api/video`,
        { videoBase64, overlayText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUploadedVideo(res.data.data);
      toast.success("Video uploaded!");
      setVideoFile(null);
      setOverlayText("");
      setTextUpdate(res.data.data.overlayText);
    } catch (err) {
      toast.error("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleOverlayTextUpdate = async () => {
    if (!textUpdate) return toast.error("Please enter overlay text.");

    try {
      setIsTextUpdating(true);
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/api/video/${uploadedVideo._id}/text`,
        { overlayText: textUpdate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Overlay text updated.");
      setUploadedVideo(res.data.data);
    } catch (err) {
      toast.error("Failed to update text.");
    } finally {
      setIsTextUpdating(false);
    }
  };

  const handleVideoFileUpdate = async () => {
    if (!newVideoFile) return toast.error("Please select a video file.");

    try {
      setIsVideoUpdating(true);
      const videoBase64 = await convertToBase64(newVideoFile);
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/api/video/${uploadedVideo._id}/file`,
        { videoBase64 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Video file updated.");
      setUploadedVideo(res.data.data);
      setNewVideoFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update video.");
    } finally {
      setIsVideoUpdating(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          // maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header with back icon */}
        <div
          style={{
            top: 0,
            left: "auto",
            right: 0,
            zIndex: 1000,
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.5%",
            width: "100%",
            boxShadow: "0 2px 5px rgba(31, 24, 24, 0.05)",
            background: "",
          }}
        >
          <button
            onClick={() => setView("list")}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "20px",
              cursor: "pointer",
              color: "#333",
              marginRight: "10px",
            }}
            title="Back"
          >
            <FaArrowLeft />
          </button>
          <h2 style={{ color: "#333", textAlign: "center", flex: 1 }}>
            🎥 Admin Video Upload
          </h2>
        </div>

        {/* Upload section */}
        {!uploadedVideo && (
          <form onSubmit={handleUpload} style={{ marginTop: "80px" }}>
            <h4 style={{ color: "#007bff" }}>⬆️ Upload New Video</h4>
            <div className="mb-3">
              <label>🎬 Video File</label>
              <input
                className="form-control"
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label>📝 Overlay Text</label>
              <input
                className="form-control"
                type="text"
                value={overlayText}
                onChange={(e) => setOverlayText(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        )}

        {/* Video preview & edit */}
        {uploadedVideo && (
          <div style={{ marginTop: "100px" }}>
            <h4 style={{ color: "#333" }}>📺 Uploaded Video Preview</h4>
            <video
              src={uploadedVideo.videoBase64}
              controls
              autoPlay
              muted
              loop
              width="100%"
              style={{
                borderRadius: "8px",
                marginBottom: "10px",
                border: "1px solid #dee2e6",
              }}
            />
            <p>
              <strong>🖋 Current Overlay Text:</strong>{" "}
              {uploadedVideo.overlayText}
            </p>

            <div style={{ marginTop: "25px" }}>
              <h5 style={{ color: "#ffc107" }}>🟡 Update Overlay Text Only</h5>
              <input
                type="text"
                className="form-control"
                value={textUpdate}
                onChange={(e) => setTextUpdate(e.target.value)}
              />
              <button
                style={{
                  backgroundColor: "#ffc107",
                  color: "#000",
                  marginTop: "10px",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                }}
                onClick={handleOverlayTextUpdate}
                disabled={isTextUpdating}
              >
                {isTextUpdating ? "Updating..." : "Update Text"}
              </button>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h5 style={{ color: "#17a2b8" }}>🔄 Update Video File Only</h5>
              <input
                type="file"
                className="form-control"
                accept="video/*"
                onChange={(e) => setNewVideoFile(e.target.files[0])}
              />
              <button
                style={{
                  backgroundColor: "#17a2b8",
                  color: "#fff",
                  marginTop: "10px",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                }}
                onClick={handleVideoFileUpdate}
                disabled={isVideoUpdating}
              >
                {isVideoUpdating ? "Updating..." : "Update Video File"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminVideoUpload;
