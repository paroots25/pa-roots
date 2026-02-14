export default function SuccessPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#ecfdf5",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 40, color: "#14532d" }}>
        Payment Successful 🌱
      </h1>

      <p style={{ marginTop: 12, color: "#374151" }}>
        Your memory plants are being prepared with love.
      </p>
    </div>
  );
}