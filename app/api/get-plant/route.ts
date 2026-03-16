import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing plant id" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("plants")
      .select("id, name, message, photos")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    return NextResponse.json({ plant: data });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}