"use client";

export default function BirthdayAnimation() {
  return (
    <div style={container}>
      <div className="cake">🎂</div>
      <h1 style={text}>Happy Birthday 🎉</h1>

      <div className="confetti" style={{ left: "20%" }}>🎊</div>
      <div className="confetti" style={{ left: "40%", animationDelay: "1s" }}>🎉</div>
      <div className="confetti" style={{ left: "60%", animationDelay: "2s" }}>🎊</div>
      <div className="confetti" style={{ left: "80%", animationDelay: "1.5s" }}>🎉</div>

      <style jsx>{`
        .cake {
          font-size: 80px;
          position: absolute;
          left: -100px;
          animation: roll 2s forwards;
        }

        .confetti {
          position: absolute;
          top: -50px;
          font-size: 30px;
          animation: fall 4s linear infinite;
        }

        @keyframes roll {
          to {
            left: calc(50% - 40px);
          }
        }

        @keyframes fall {
          to {
            transform: translateY(110vh);
          }
        }
      `}</style>
    </div>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  background: "#000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
};

const text: React.CSSProperties = {
  color: "white",
  fontSize: 40,
  zIndex: 10,
};