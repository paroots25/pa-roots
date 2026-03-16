"use client";

export default function LoveAnimation() {
  return (
    <div style={container}>
      <h1 style={text}>Our love grows forever 💖</h1>

      <div className="loveHearts" style={{ left: "20%" }}>💖</div>
      <div className="loveHearts" style={{ left: "40%", animationDelay: "1s" }}>💗</div>
      <div className="loveHearts" style={{ left: "60%", animationDelay: "2s" }}>💞</div>
    </div>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  background: "#ffe4ec",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const text: React.CSSProperties = {
  fontSize: 40,
  color: "#be185d",
};