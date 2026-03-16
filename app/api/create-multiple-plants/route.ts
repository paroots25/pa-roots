import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const plants = body.plants;

    if (!plants || plants.length === 0) {
      return NextResponse.json(
        { error: "No plants provided" },
        { status: 400 }
      );
    }

    /* 🌱 Insert all plants into DB */
    const { data, error } = await supabase
      .from("plants")
      .insert(
        plants.map((p: any) => ({
          name: p.name,
          message: p.message || "",
          email: p.email || "",
          plant_type: p.type,
          payment_status: false,
        }))
      )
      .select("id");

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return NextResponse.json(
        { error: "Failed to create plants" },
        { status: 500 }
      );
    }

    /* 📦 Collect all created plant IDs */
    const ids = data.map((p) => p.id);

    return NextResponse.json({ ids });
  } catch (err) {
    console.error("CREATE MULTIPLE PLANTS ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}