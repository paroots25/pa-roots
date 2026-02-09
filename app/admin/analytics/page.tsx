import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  // 1️⃣ Fetch all paid plants
  const { data: orders, error } = await supabase
    .from("plants")
    .select("id, plant_type, payment_status, created_at")
    .eq("payment_status", true)
    .order("created_at", { ascending: false });

  if (error) {
    return <div style={center}>Failed to load analytics ❌</div>;
  }

  const totalOrders = orders.length;

  // 2️⃣ Price map (same as buy page)
  const prices: Record<string, number> = {
    "red-gerbera": 399,
    "pink-gerbera": 349,
    "yellow-gerbera": 349,
    "white-gerbera": 399,
    "orange-gerbera": 349,
    "red-rose": 449,
    "yellow-chrysanthemum": 299,
    "white-chrysanthemum": 299,
    "pink-chrysanthemum": 299,
    "money-plant": 349,
  };

  // 3️⃣ Calculate revenue
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (prices[order.plant_type] || 0),
    0
  );

  // 4️⃣ Find best-selling plant
  const count: Record<string, number> = {};

  orders.forEach((o) => {
    count[o.plant_type] = (count[o.plant_type] || 0) + 1;
  });

  const bestPlant =
    Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  return (
    <div style={page}>
      <h1 style={title}>PA Roots Admin Analytics 🌱</h1>

      {/* STATS */}
      <div style={statsGrid}>
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard label="Total Revenue" value={`₹${totalRevenue}`} />
        <StatCard label="Best Selling Plant" value={bestPlant} />
      </div>

      {/* RECENT ORDERS */}
      <h2 style={sectionTitle}>Recent Orders</h2>

      <div style={table}>
        {orders.map((o) => (
          <div key={o.id} style={row}>
            <span>{o.plant_type}</span>
            <span>₹{prices[o.plant_type]}</span>
            <span>{new Date(o.created_at).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENT ---------- */

function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <div style={card}>
      <p style={cardLabel}>{label}</p>
      <h2 style={cardValue}>{value}</h2>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#ecfdf5",
  padding: 40,
  fontFamily: "sans-serif",
};

const title: React.CSSProperties = {
  fontSize: 32,
  color: "#14532d",
  marginBottom: 30,
};

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 20,
  marginBottom: 40,
};

const card: React.CSSProperties = {
  background: "white",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const cardLabel: React.CSSProperties = {
  color: "#6b7280",
  fontSize: 14,
};

const cardValue: React.CSSProperties = {
  fontSize: 24,
  color: "#14532d",
};

const sectionTitle: React.CSSProperties = {
  fontSize: 22,
  marginBottom: 12,
};

const table: React.CSSProperties = {
  background: "white",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

const center: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
