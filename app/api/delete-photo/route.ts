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

    /* ---------- Delete from Supabase Storage ---------- */
    const { error: storageError } = await supabase.storage
      .from("plant-photos")   // ⚠️ make sure bucket name matches yours
      .remove([fileName]);

    if (storageError) {
      console.error(storageError);
      return NextResponse.json(
        { error: "Storage delete failed" },
        { status: 500 }
      );
    }

    /* ---------- Get Current Photos ---------- */
    const { data: plant } = await supabase
      .from("plants")
      .select("photos")
      .eq("id", id)
      .single();

    if (!plant) {
      return NextResponse.json(
        { error: "Plant not found" },
        { status: 404 }
      );
    }

    const updatedPhotos = plant.photos.filter(
      (url: string) => !url.includes(fileName)
    );

    /* ---------- Update DB ---------- */
    const { error: updateError } = await supabase
      .from("plants")
      .update({ photos: updatedPhotos })
      .eq("id", id);

    if (updateError) {
      console.error(updateError);
      return NextResponse.json(
        { error: "DB update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}