export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type PlantInput = {
  name: string;
  message?: string;
  email?: string;
  type?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const plants: PlantInput[] = body?.plants || [];

    if (!Array.isArray(plants) || plants.length === 0) {
      return NextResponse.json(
        { error: "No plants provided" },
        { status: 400 }
      );
    }

    /* 🌱 Prepare plants data */
    const plantsToInsert = plants.map((p) => ({
      name: p.name,
      message: p.message ?? "",
      email: p.email ?? "",
      plant_type: p.type ?? "",
      payment_status: false,
    }));

    /* 🌱 Insert all plants into DB */
    const { data, error } = await supabase
      .from("plants")
      .insert(plantsToInsert)
      .select("id");

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return NextResponse.json(
        { error: "Failed to create plants" },
        { status: 500 }
      );
    }

    /* 📦 Collect all created plant IDs */
    const ids = data?.map((p: { id: string }) => p.id) || [];

    return NextResponse.json({ ids });
  } catch (err) {
    console.error("CREATE MULTIPLE PLANTS ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}