export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { id, fileName } = await req.json();

    if (!id || !fileName) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    /* -------- Delete from Storage -------- */
    const { error: storageError } = await supabase.storage
      .from("plant-audio")
      .remove([fileName]);

    if (storageError) {
      console.error(storageError);
      return NextResponse.json(
        { error: "Storage delete failed" },
        { status: 500 }
      );
    }

    /* -------- Remove from DB -------- */
    const { error: dbError } = await supabase
      .from("plants")
      .update({
        audio_url: null,
        audio_mode: null,
      })
      .eq("id", id);

    if (dbError) {
      console.error(dbError);
      return NextResponse.json(
        { error: "DB update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}