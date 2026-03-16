"use client";

export default function MotherAnimation() {
  return (
    <div style={container}>
      <h1 style={text}>Happy Mother's Day 🌸</h1>

      <div className="flower" style={{ left: "20%" }}>🌸</div>
      <div className="flower" style={{ left: "40%", animationDelay: "1s" }}>🌺</div>
      <div className="flower" style={{ left: "60%", animationDelay: "2s" }}>🌸</div>
      <div className="flower" style={{ left: "80%", animationDelay: "3s" }}>🌺</div>

      <style jsx>{`
        .flower {
          position: absolute;
          top: -40px;
          font-size: 36px;
          animation: fall 6s infinite linear;
        }

        @keyframes fall {
          to {
            transform: translateY(120vh);
          }
        }
      `}</style>
    </div>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  background: "#ffe4e6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const text: React.CSSProperties = {
  fontSize: 42,
  color: "#be123c",
};