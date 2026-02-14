import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { id, url } = await req.json();

    if (!id || !url) {
      return NextResponse.json(
        { error: "Missing id or url" },
        { status: 400 }
      );
    }

    /* ---------------- EXTRACT FILE PATH ---------------- */
    // URL format:
    // https://xxxx.supabase.co/storage/v1/object/public/plant-photos/<path>
    const path = url.split("/plant-photos/")[1];

    if (!path) {
      return NextResponse.json(
        { error: "Invalid file path" },
        { status: 400 }
      );
    }

    /* ---------------- DELETE FROM STORAGE ---------------- */
    const { error: storageError } = await supabase.storage
      .from("plant-photos")
      .remove([path]);

    if (storageError) {
      console.error("STORAGE DELETE ERROR:", storageError);
      return NextResponse.json(
        { error: "Storage delete failed" },
        { status: 500 }
      );
    }

    /* ---------------- GET CURRENT PHOTOS ---------------- */
    const { data: plant, error: fetchError } = await supabase
      .from("plants")
      .select("photos")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("FETCH ERROR:", fetchError);
      return NextResponse.json(
        { error: "Plant fetch failed" },
        { status: 500 }
      );
    }

    /* ---------------- REMOVE URL FROM ARRAY ---------------- */
    const updatedPhotos = (plant.photos || []).filter(
      (p: string) => p !== url
    );

    /* ---------------- UPDATE DB ---------------- */
    const { error: updateError } = await supabase
      .from("plants")
      .update({ photos: updatedPhotos })
      .eq("id", id);

    if (updateError) {
      console.error("UPDATE ERROR:", updateError);
      return NextResponse.json(
        { error: "DB update failed" },
        { status: 500 }
      );
    }

    /* ---------------- SUCCESS ---------------- */
    return NextResponse.json({ photos: updatedPhotos });
  } catch (err) {
    console.error("DELETE API ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}