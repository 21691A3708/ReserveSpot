import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function AdminVideoUpload() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [overlayText, setOverlayText] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
    else setUser(null);

    const token = localStorage.getItem("token");
    // if (!token) return;
    axios
      .get(`/api/video`, {
        headers: { Authorization: `Bearer ${token}` },
        onDownloadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      })
      .then((res) => {
        setUploadedVideo(res.data);
        startWordAnimation(res.data?.overlayText || "");
      })
      .catch((err) => {
        console.log("No video found or error:", err);
      });
  }, []);

  const startWordAnimation = (text) => {
    if (!text) return;
    const splitWords = text.split(" ");
    setWords(splitWords);
    setCurrentWordIndex(0);
    setFadeOut(false);

    let index = 0;
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        index++;
        if (index < splitWords.length) {
          setCurrentWordIndex(index);
          setFadeOut(false);
        } else {
          clearInterval(interval);
        }
      }, 500);
    }, 3000);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !overlayText) {
      toast.error("Please provide both video and overlay text.");
      return;
    }

    setIsUploading(true);
    const token = localStorage.getItem("token");

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    };

    try {
      const base64Video = await convertToBase64(videoFile);

      const payload = {
        overlayText,
        videoBase64: base64Video,
        videoId: uploadedVideo?._id,
      };

      const res = await axios.put(`/api/video`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      setUploadedVideo(res.data.data);
      toast.success("Video updated successfully!");
      setVideoFile(null);
      setOverlayText("");
      setShowUploadForm(false);
      startWordAnimation(res.data.data.overlayText);
    } catch (err) {
      toast.error("Video update failed.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {uploadProgress < 100 && (
        <div className="loading-screen" style={styles.loadingScreen}>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingTitle}>Loading {uploadProgress}%</div>
            <div style={styles.progressBarBackground}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${uploadProgress}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div onClick={() => navigate("/mhome")} style={styles.pageContainer}>
        {uploadedVideo && (
          <video
            ref={videoRef}
            src={uploadedVideo?.videoBase64}
            autoPlay
            loop
            muted
            onPlay={() => startWordAnimation(uploadedVideo.overlayText)}
            style={styles.video}
          />
        )}

        <div style={styles.textOverlay}>
          <div
            style={{
              color: "white",
              fontSize: "8rem",
              textAlign: "center",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
              opacity: fadeOut ? 0 : 1,
              transform: fadeOut ? "translateY(30px)" : "translateY(0)",
              transition: "opacity 0.5s ease-in-out, transform 0.5s ease",
            }}
          >
            {words[currentWordIndex]}
          </div>
        </div>
      </div>

      <div onClick={() => navigate("/mhome")} style={styles.enterText}>
        <p style={{ color: "white" }}>ENTER SITE</p>
      </div>

      {user?.role === "admin" && (
        <>
          <div style={styles.uploadButtonWrapper}>
            <button
              className="btn btn-primary rounded-circle"
              style={styles.uploadButton}
              onClick={() => setShowUploadForm(!showUploadForm)}
            >
              📁
            </button>
          </div>

          {showUploadForm && (
            <div style={styles.uploadForm}>
              <h4>Upload Video</h4>
              <form onSubmit={handleUpload}>
                <div className="mb-2">
                  <label>Select Video:</label>
                  <input
                    type="file"
                    accept="video/*"
                    className="form-control"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                  />
                </div>
                <div className="mb-2">
                  <label>Overlay Text:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={overlayText}
                    onChange={(e) => setOverlayText(e.target.value)}
                    placeholder="Enter overlay text"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </form>
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes fadeZoomIn {
          0% { opacity: 0; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes floatIn {
          0% { opacity: 0; transform: translateY(40px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}

const styles = {
  loadingScreen: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingContainer: { textAlign: "center", color: "#fff", fontSize: "24px" },
  loadingTitle: { marginBottom: "20px", fontSize: "40px", fontWeight: "bold" },
  progressBarBackground: {
    height: "20px",
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4caf50",
    transition: "width 0.2s ease-in-out",
  },
  pageContainer: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
    animation: "fadeZoomIn 1.5s ease-out forwards",
  },
  textOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    pointerEvents: "none",
  },
  enterText: {
    zIndex: 999,
    bottom: "1%",
    position: "absolute",
    left: "47%",
    cursor: "pointer",
  },
  uploadButtonWrapper: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 2,
    animation: "floatIn 1s ease-out forwards",
    opacity: 1,
  },
  uploadButton: { width: "60px", height: "60px", fontSize: "24px" },
  uploadForm: {
    position: "fixed",
    bottom: "100px",
    right: "20px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    zIndex: 2,
    width: "300px",
  },
};

export default AdminVideoUpload;
