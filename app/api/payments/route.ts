export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    /* ---------------- VERIFY SINGLE PAYMENT ---------------- */

    if (action === "verify") {
      const { plant_id } = body;

      const { error } = await supabase
        .from("plants")
        .update({ payment_status: true })
        .eq("id", plant_id);

      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    /* ---------------- VERIFY PAYMENT WITH PLANTS ---------------- */

    if (action === "verify_with_plants") {
      const { plant_ids } = body;

      const { error } = await supabase
        .from("plants")
        .update({ payment_status: true })
        .in("id", plant_ids);

      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    /* ---------------- VERIFY MULTIPLE PAYMENTS ---------------- */

    if (action === "verify_multiple") {
      const { ids } = body;

      const { error } = await supabase
        .from("plants")
        .update({ payment_status: true })
        .in("id", ids);

      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );

  } catch (err) {
    console.error("PAYMENT VERIFY ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}