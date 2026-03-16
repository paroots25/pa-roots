export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    /* CREATE PLANT */
    if (action === "create") {
      const { name, message, email, type } = body;

      const { data, error } = await supabase
        .from("plants")
        .insert({
          name,
          message,
          email,
          plant_type: type,
          payment_status: false,
        })
        .select("id");

      if (error) throw error;

      return NextResponse.json({ plant: data });
    }

    /* GET PLANT */
    if (action === "get") {
      const { id } = body;

      const { data, error } = await supabase
        .from("plants")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return NextResponse.json({ plant: data });
    }

    /* UPDATE PLANT */
    if (action === "update") {
      const { id, message } = body;

      const { error } = await supabase
        .from("plants")
        .update({ message })
        .eq("id", id);

      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );

  } catch (err) {
    console.error("PLANTS API ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}