"use client";

export default function SisterAnimation() {
  return (
    <div style={container}>
      <h1 style={text}>For My Amazing Sister 💜</h1>

      <div className="heart" style={{ left: "25%" }}>💜</div>
      <div className="heart" style={{ left: "45%", animationDelay: "1s" }}>💖</div>
      <div className="heart" style={{ left: "65%", animationDelay: "2s" }}>💜</div>

      <style jsx>{`
        .heart {
          position: absolute;
          bottom: -40px;
          font-size: 36px;
          animation: rise 5s infinite ease-in;
        }

        @keyframes rise {
          to {
            transform: translateY(-120vh);
          }
        }
      `}</style>
    </div>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  background: "#ede9fe",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const text: React.CSSProperties = {
  fontSize: 42,
  color: "#7c3aed",
};