import React from "react";

const AnimatedText = ({ text }) => {
  return (
    <div style={{ display: "inline-block" }}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            transform: "translateY(100px)",
            opacity: 0,
            animationName: "flyInUp",
            animationDuration: "0.6s",
            animationDelay: `${index * 0.1}s`,
            animationFillMode: "forwards",
            animationTimingFunction: "ease-out",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      {/* Keyframes added dynamically */}
      <style>
        {`
          @keyframes flyInUp {
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedText;
