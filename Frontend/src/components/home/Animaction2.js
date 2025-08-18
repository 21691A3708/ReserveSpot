import React, { useEffect, useRef, useState } from "react";

const AnimatedText = ({ text }) => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // only animate once
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <div ref={containerRef} style={{ display: "inline-block" }}>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            marginRight: "0.4ch",
            transform: inView ? "translateY(0)" : "translateY(100px)",
            opacity: inView ? 1 : 0,
            transition: "all 0.6s ease-out",
            transitionDelay: `${index * 0.2}s`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
