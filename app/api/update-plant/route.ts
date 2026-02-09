import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { id, message, photos } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing plant id" }, { status: 400 });
    }

    const updateData: any = {};

    if (message !== undefined) updateData.message = message;
    if (photos !== undefined) updateData.photos = photos;

    const { error } = await supabase
      .from("plants")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error("UPDATE ERROR:", error);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
