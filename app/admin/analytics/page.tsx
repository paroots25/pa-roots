import { supabase } from "@/lib/supabase";
import Link from "next/link";

/* 🔐 NEW → protect admin route */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  /* 🔐 CHECK ADMIN SESSION */
  const cookieStore = await cookies();

  const supabaseServer = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
      },
    }
  );

  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  /* ❌ If not logged in → go to login page */
  if (!session) {
    redirect("/admin/login");
  }

  /* 1️⃣ Fetch all paid plants (✅ added email + price) */
  const { data: orders, error } = await supabase
    .from("plants")
    .select("id, name, plant_type, email, price, payment_status, created_at")
    .eq("payment_status", true)
    .order("created_at", { ascending: false });

  if (error) {
    return <div style={center}>Failed to load analytics ❌</div>;
  }

  const totalOrders = orders.length;

  /* 2️⃣ Calculate revenue (✅ REAL revenue from DB price) */
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.price || 0),
    0
  );

  /* 3️⃣ Best selling plant */
  const count: Record<string, number> = {};
  orders.forEach((o) => {
    count[o.plant_type] = (count[o.plant_type] || 0) + 1;
  });

  const bestPlant =
    Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  return (
    <div style={page}>
      {/* 🔐 Logout button */}
      <form action="/auth/logout" method="post" style={{ marginBottom: 20 }}>
        <button style={logoutBtn}>Logout</button>
      </form>

      <h1 style={title}>PA Roots Admin Analytics 🌱</h1>

      {/* 📊 STATS */}
      <div style={statsGrid}>
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard label="Total Revenue" value={`₹${totalRevenue}`} />
        <StatCard label="Best Selling Plant" value={bestPlant} />
      </div>

      {/* 📦 RECENT ORDERS */}
      <h2 style={sectionTitle}>Recent Orders</h2>

      <div style={table}>
        {orders.map((o) => (
          <div key={o.id} style={row}>
            {/* 🌿 Plant info */}
            <div>
              <p style={plantName}>{o.name}</p>
              <p style={plantType}>{o.plant_type}</p>

              {/* ✅ Registered Email */}
              <p style={emailText}>{o.email}</p>
            </div>

            {/* 💰 Real price from DB */}
            <span>₹{o.price || "-"}</span>

            {/* 📅 Date */}
            <span>{new Date(o.created_at).toLocaleDateString()}</span>

            {/* 🔗 View QR */}
            <Link href={`/admin/qr/${o.id}`} target="_blank">
              <button style={qrBtn}>View QR</button>
            </Link>
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
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr auto",
  alignItems: "center",
  gap: 10,
  padding: "12px 0",
  borderBottom: "1px solid #eee",
};

const plantName: React.CSSProperties = {
  fontWeight: "bold",
  color: "#14532d",
};

const plantType: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
};

const emailText: React.CSSProperties = {
  fontSize: 12,
  color: "#9ca3af",
  marginTop: 2,
};

const qrBtn: React.CSSProperties = {
  background: "#166534",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
};

/* 🔐 NEW logout style */
const logoutBtn: React.CSSProperties = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
};

const center: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};