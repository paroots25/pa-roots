"use client";

export default function FatherAnimation() {
  return (
    <div style={container}>
      {/* animation keyframes */}
      <style>
        {`
        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        `}
      </style>

      <h1 style={text}>Happy Father's Day 🌳</h1>

      <div style={{ ...leaf, left: "25%" }}>🍃</div>
      <div style={{ ...leaf, left: "45%", animationDelay: "1s" }}>🍃</div>
      <div style={{ ...leaf, left: "65%", animationDelay: "2s" }}>🍃</div>
      <div style={{ ...leaf, left: "80%", animationDelay: "1.5s" }}>🍃</div>
    </div>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  background: "#dcfce7",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
};

const text: React.CSSProperties = {
  fontSize: 44,
  color: "#166534",
  zIndex: 10,
};

const leaf: React.CSSProperties = {
  position: "absolute",
  top: -40,
  fontSize: 35,
  animation: "fall 4s linear infinite",
};