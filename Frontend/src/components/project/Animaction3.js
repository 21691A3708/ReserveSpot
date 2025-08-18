import React, { useEffect, useRef, useState } from "react";

const Animaction3 = ({ text = "", ...styleProps }) => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // animate once
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const lines = text.split("\n");

  return (
    <div ref={containerRef}>
      {lines.map((line, lineIndex) => {
        const words = line.split("\n");
        return (
          <div
            key={lineIndex}
            style={{
              display: "block",
              marginBottom: "0.5em",
            }}
          >
            {words.map((word, wordIndex) => {
              const delay = (lineIndex * 5 + wordIndex) * 0.15;
              return (
                <span
                  key={wordIndex}
                  style={{
                    display: "inline-block",
                    marginRight: "0.4ch",
                    transform: inView ? "translateY(0)" : "translateY(40px)",
                    opacity: inView ? 1 : 0,
                    transition: `all 0.01s ease-out ${delay}s`,
                    ...styleProps,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Animaction3;
