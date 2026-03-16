export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const file = formData.get("audio") as File;
    const mode = formData.get("mode") as string;

    if (!id || !file) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    /* ---------- Prepare file ---------- */
    const fileExt = file.name.split(".").pop();
    const fileName = `${id}-${Date.now()}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer); // 🔥 IMPORTANT FIX

    /* ---------- Upload to Supabase Storage ---------- */
    const { error: uploadError } = await supabase.storage
      .from("plant-audio") // bucket name
      .upload(fileName, fileData, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("UPLOAD ERROR:", uploadError);
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    /* ---------- Get Public URL ---------- */
    const { data: publicData } = supabase.storage
      .from("plant-audio")
      .getPublicUrl(fileName);

    const audioUrl = publicData.publicUrl;

    /* ---------- Save in Database ---------- */
    const { error: dbError } = await supabase
      .from("plants") // table name
      .update({
        audio_url: audioUrl,  // ⚠ must match DB column name
        audio_mode: mode,
      })
      .eq("id", id);

    if (dbError) {
      console.error("DB ERROR:", dbError);
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ audioUrl });
  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}