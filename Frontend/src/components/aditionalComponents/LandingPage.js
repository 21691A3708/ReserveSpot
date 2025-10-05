import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// ============================================================================
// --- Custom Hooks (Could be moved to a /hooks folder) ---
// ============================================================================

/**
 * @description Custom hook to manage user authentication state from localStorage.
 */
const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const userInfo = JSON.parse(atob(token.split(".")[1]));
      setUser(userInfo);
    } catch (e) {
      console.error("Failed to parse token:", e);
      setUser(null);
    }
  }, []);

  return { user };
};

/**
 * @description Custom hook for handling the word-by-word fading animation.
 * @param {string} text - The full text to animate.
 * @param {number} intervalDuration - Time in ms each word is visible.
 */
const useWordAnimation = (text, intervalDuration = 3000) => {
  const [currentWord, setCurrentWord] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!text) return;

    const words = text.split(" ");
    if (words.length === 0) return;

    setCurrentWord(words[0]);
    let index = 0;

    const interval = setInterval(() => {
      setFadeOut(true); // Start fading out the current word
      setTimeout(() => {
        index = (index + 1) % words.length; // Loop back to the start
        setCurrentWord(words[index]);
        setFadeOut(false); // Fade in the new word
      }, 500); // Wait for fade-out animation to complete
    }, intervalDuration);

    // CRITICAL: Cleanup function to prevent memory leaks when the component unmounts
    return () => clearInterval(interval);
  }, [text, intervalDuration]);

  return { currentWord, fadeOut };
};

// ============================================================================
// --- Child Components (Could be moved to a /components folder) ---
// ============================================================================

const LoadingScreen = ({ progress }) => (
  <div style={styles.loadingScreen}>
    <div style={styles.loadingContainer}>
      <div style={styles.loadingTitle}>Loading {progress}%</div>
      <div style={styles.progressBarBackground}>
        <div style={{ ...styles.progressBarFill, width: `${progress}%` }} />
      </div>
    </div>
  </div>
);

const VideoPlayer = ({ src, onPlay }) => (
  <video
    key={src} // Add key to force re-render on src change
    src={src}
    autoPlay
    loop
    muted
    onPlay={onPlay}
    style={styles.video}
  />
);

const AnimatedTextOverlay = ({ word, fadeOut }) => (
  <div style={styles.textOverlay}>
    <div
      style={{
        ...styles.animatedWord,
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "translateY(30px)" : "translateY(0)",
      }}>
      {word}
    </div>
  </div>
);

const UploadForm = ({ onUpload, isUploading }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [overlayText, setOverlayText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoFile || !overlayText) {
      toast.error("Please provide both a video and overlay text.");
      return;
    }
    onUpload(videoFile, overlayText);
  };

  return (
    <div style={styles.uploadForm}>
      <h4>Update Video & Text</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Select Video:</label>
          <input
            type="file"
            accept="video/*"
            className="form-control form-control-sm"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Overlay Text:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={overlayText}
            onChange={(e) => setOverlayText(e.target.value)}
            placeholder="Enter overlay text"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

// ============================================================================
// --- Main Component ---
// ============================================================================

function AdminVideoUpload() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { currentWord, fadeOut } = useWordAnimation(uploadedVideo?.overlayText);

  // Fetch initial video
  useEffect(() => {
    axios
      .get(`/api/video`)
      .then((res) => setUploadedVideo(res.data))
      .catch((err) => console.log("No video found or error:", err));
  }, []);

  const handleUpload = useCallback(
    async (videoFile, overlayText) => {
      setIsUploading(true);
      setUploadProgress(0);
      const token = localStorage.getItem("token");

      const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });

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
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setUploadProgress(percent);
          },
        });

        setUploadedVideo(res.data.data);
        toast.success("Video updated successfully!");
        setShowUploadForm(false);
      } catch (err) {
        toast.error(err.response?.data?.message || "Video update failed.");
        console.error("Upload error:", err);
      } finally {
        setIsUploading(false);
      }
    },
    [uploadedVideo?._id]
  );

  const isLoading = !uploadedVideo;

  return (
    <>
      {isLoading && <LoadingScreen progress={100} />}

      <div style={styles.pageContainer}>
        {uploadedVideo && <VideoPlayer src={uploadedVideo.videoBase64} />}

        <AnimatedTextOverlay word={currentWord} fadeOut={fadeOut} />

        <div style={styles.enterSiteWrapper}>
          <p onClick={() => navigate("/mhome")} style={styles.enterText}>
            ENTER SITE
          </p>
        </div>

        {user?.role === "admin" && (
          <>
            <div style={styles.uploadButtonWrapper}>
              <button
                className="btn btn-primary rounded-circle"
                style={styles.uploadButton}
                onClick={() => setShowUploadForm(!showUploadForm)}>
                📁
              </button>
            </div>
            {showUploadForm && (
              <UploadForm onUpload={handleUpload} isUploading={isUploading} />
            )}
          </>
        )}
      </div>

      {isUploading && <LoadingScreen progress={uploadProgress} />}

      <style>{`
        @keyframes fadeZoomIn {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

// ============================================================================
// --- Styles ---
// ============================================================================

const styles = {
  loadingScreen: {
    /* ... same as before ... */
  },
  loadingContainer: {
    /* ... same as before ... */
  },
  loadingTitle: {
    /* ... same as before ... */
  },
  progressBarBackground: {
    /* ... same as before ... */
  },
  progressBarFill: {
    /* ... same as before ... */
  },
  pageContainer: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "#111", // Fallback color
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    zIndex: 1,
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
    zIndex: 2,
    pointerEvents: "none",
  },
  animatedWord: {
    color: "white",
    fontSize: "clamp(4rem, 10vw, 8rem)", // Responsive font size
    fontWeight: "bold",
    textAlign: "center",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
    transition: "opacity 0.5s ease-in-out, transform 0.5s ease",
  },
  enterSiteWrapper: {
    // Changed from enterText
    position: "absolute",
    bottom: "3%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: 3,
  },
  enterText: {
    color: "white",
    cursor: "pointer",
    letterSpacing: "2px",
    border: "1px solid white",
    padding: "8px 16px",
    borderRadius: "4px",
    backgroundColor: "rgba(0,0,0,0.3)",
    transition: "background-color 0.3s ease",
    "&:hover": {
      // Note: This pseudo-selector only works with CSS-in-JS libs like JSS
      backgroundColor: "rgba(255,255,255,0.2)",
    },
  },
  uploadButtonWrapper: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 10,
    animation: "floatIn 1s ease-out forwards",
  },
  uploadButton: {
    width: "60px",
    height: "60px",
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadForm: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    zIndex: 10,
    width: "300px",
    animation: "floatIn 0.5s ease-out forwards",
  },
};

// Re-add styles that were identical for brevity
styles.loadingScreen = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};
styles.loadingContainer = {
  textAlign: "center",
  color: "#fff",
  fontSize: "24px",
  width: "50%",
};
styles.loadingTitle = {
  marginBottom: "20px",
  fontSize: "40px",
  fontWeight: "bold",
};
styles.progressBarBackground = {
  height: "10px",
  width: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "5px",
  overflow: "hidden",
};
styles.progressBarFill = {
  height: "100%",
  backgroundColor: "#fff",
  transition: "width 0.4s ease",
};

export default AdminVideoUpload;
