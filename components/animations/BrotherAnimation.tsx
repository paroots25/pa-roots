"use client";

export default function BrotherAnimation() {
  return (
    <div style={container}>
      <h1 style={text}>For My Brother 💙</h1>

      <div className="star" style={{ top: "20%" }}>⭐</div>
      <div className="star" style={{ top: "50%", animationDelay: "1s" }}>⭐</div>
      <div className="star" style={{ top: "75%", animationDelay: "2s" }}>⭐</div>

      <style jsx>{`
        .star {
          position: absolute;
          left: -50px;
          font-size: 32px;
          animation: shoot 4s linear infinite;
        }

        @keyframes shoot {
          to {
            transform: translateX(120vw);
          }
        }
      `}</style>
    </div>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  background: "#dbeafe",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const text: React.CSSProperties = {
  fontSize: 42,
  color: "#1e40af",
};