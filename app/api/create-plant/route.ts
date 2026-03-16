import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("CREATE PLANT BODY:", body); // 🔍 debug

    const { name, message, email, location, phone, plant_type, price } = body;

    if (!name || !message || !email || !location || !phone) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("plants")
      .insert([
        {
          name,
          message,
          email,
          location,      // ✅ NEW
          phone,         // ✅ NEW
          plant_type,    // ✅ NEW
          price,         // ✅ NEW
          payment_status: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ plant: data });
  } catch (err) {
    console.error("CREATE PLANT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}