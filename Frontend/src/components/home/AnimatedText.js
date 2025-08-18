import React, { useEffect, useRef, useState } from "react";

const AnimatedText = ({ text }) => {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // Only run once
        }
      },
      {
        threshold: 0.2, // Trigger when 20% is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            transform: visible ? "translateY(0)" : "translateY(100px)",
            opacity: visible ? 1 : 0,
            transition: "transform 0.5s ease, opacity 0.5s ease",
            transitionDelay: `${index * 0.1}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
