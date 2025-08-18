// export default Reel;
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function Reel() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [user, setUser] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [overlayText, setOverlayText] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const userInfo = getUser();
    if (userInfo) setUser(userInfo);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_BASE_URL}/api/video`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data && res.data._id) {
          setUploadedVideo(res.data);
        }
      })
      .catch((err) => {
        console.log("No video found or error:", err);
      });
  }, []);

  const startWordAnimation = (text) => {
    if (!text || animationStarted) return;

    const splitWords = text.trim().split(" ");
    setWords(splitWords);
    setCurrentWordIndex(0);
    setFadeOut(false);
    setAnimationStarted(true);

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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !overlayText.trim()) {
      toast.error("Please provide both video and overlay text.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setIsUploading(true);
      const base64Video = await convertToBase64(videoFile);

      const payload = {
        overlayText,
        videoBase64: base64Video,
      };

      const res = await axios.post(`${API_BASE_URL}/api/video`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data?.data) {
        setUploadedVideo(res.data.data);
        toast.success("Video uploaded successfully!");
        setOverlayText("");
        setVideoFile(null);
        setShowUploadForm(false);
        setAnimationStarted(false);
        startWordAnimation(res.data.data.overlayText);
      }
    } catch (err) {
      console.error(err);
      toast.error("Video upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Video Preview */}
      <div
        onDoubleClick={() => navigate("/mhome")}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {uploadedVideo && (
          <video
            ref={videoRef}
            src={uploadedVideo.videoBase64}
            autoPlay
            loop
            muted
            onPlay={() => {
              setAnimationStarted(false);
              startWordAnimation(uploadedVideo.overlayText);
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
              animation: "fadeZoomIn 1.5s ease-out forwards",
            }}
          />
        )}

        {/* Animated Overlay Text */}
        <div
          style={{
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
          }}
        >
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

      {/* Close Button */}
      <div
        onClick={() => navigate("/mhome")}
        style={{
          zIndex: 999,
          position: "absolute",
          bottom: "1%",
          left: "47%",
          cursor: "pointer",
        }}
      >
        <p style={{ color: "white" }}>CLOSE SHOWREEL</p>
      </div>

      {/* Floating Upload Button */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 2,
          animation: "floatIn 1s ease-out forwards",
          opacity: 1,
        }}
      >
        {user?.role === "admin" && (
          <button
            className="btn btn-primary rounded-circle"
            style={{
              width: "60px",
              height: "60px",
              fontSize: "24px",
            }}
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            📁
          </button>
        )}
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 2,
            width: "300px",
          }}
        >
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

      {/* Keyframe Styles */}
      <style>{`
        @keyframes fadeZoomIn {
          0% {
            opacity: 0;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}

export default Reel;
