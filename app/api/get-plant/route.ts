import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("plants")
    .select("id, name, message, photos")
    .eq("id", id)
    .single();

  if (error) {
    console.error("GET PLANT ERROR:", error);
    return NextResponse.json({ error: "Plant not found" }, { status: 404 });
  }

  return NextResponse.json({ plant: data });
}
