import React, { useEffect, useState } from "react";
import lawFacts from "../data/lawFacts";

const DidYouKnow = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    // Pick a random fact every time the page refreshes
    const randomIndex = Math.floor(Math.random() * lawFacts.length);
    setFact(lawFacts[randomIndex]);
  }, []);

  return (
    <div
      style={{
        marginTop: "-1cm",
        marginBottom: "2rem", // extra spacing after the section
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="relative text-[#1c1c1c] p-6 text-center max-w-xl w-full"
        style={{
          background: "linear-gradient(#fdf6e3, #f5deb3)", // scroll paper color
          border: "2px solid #d2b48c",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
          fontFamily: "'Georgia', serif",
          position: "relative",
        }}
      >
        {/* Scroll edges */}
        <div
          style={{
            position: "absolute",
            top: "-10px",
            left: 0,
            right: 0,
            height: "20px",
            background: "radial-gradient(circle, #d2b48c 40%, transparent 70%)",
            borderTopLeftRadius: "50%",
            borderTopRightRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            left: 0,
            right: 0,
            height: "20px",
            background: "radial-gradient(circle, #d2b48c 40%, transparent 70%)",
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
          }}
        />

        {/* Content */}
        <h2 className="text-xl font-semibold mb-3 text-[#4a5fc1]">
          📜 Did You Know?
        </h2>
        <p className="text-base">{fact}</p>
      </div>
    </div>
  );
};

export default DidYouKnow;
