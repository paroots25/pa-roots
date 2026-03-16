export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/* ---------------- POST ---------------- */

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const action = formData.get("action");

    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json(
        { error: "Missing plant id" },
        { status: 400 }
      );
    }

    /* ---------------- UPLOAD PHOTO ---------------- */

    if (action === "upload_photo") {
      const files = formData.getAll("files") as File[];

      if (!files || files.length === 0) {
        return NextResponse.json(
          { error: "No files uploaded" },
          { status: 400 }
        );
      }

      const uploadedUrls: string[] = [];

      for (const file of files) {
        const fileName = `${id}-${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
          .from("plant-photos")
          .upload(fileName, file);

        if (error) throw error;

        const { data } = supabase.storage
          .from("plant-photos")
          .getPublicUrl(fileName);

        uploadedUrls.push(data.publicUrl);
      }

      const { data: plant } = await supabase
        .from("plants")
        .select("photos")
        .eq("id", id)
        .single();

      const newPhotos = [...(plant?.photos || []), ...uploadedUrls];

      await supabase
        .from("plants")
        .update({ photos: newPhotos })
        .eq("id", id);

      return NextResponse.json({ photos: newPhotos });
    }

    /* ---------------- DELETE PHOTO ---------------- */

    if (action === "delete_photo") {
      const fileName = formData.get("fileName") as string;

      if (!fileName) {
        return NextResponse.json(
          { error: "Missing file name" },
          { status: 400 }
        );
      }

      await supabase.storage
        .from("plant-photos")
        .remove([fileName]);

      const { data: plant } = await supabase
        .from("plants")
        .select("photos")
        .eq("id", id)
        .single();

      const filtered = (plant?.photos || []).filter(
        (url: string) => !url.includes(fileName)
      );

      await supabase
        .from("plants")
        .update({ photos: filtered })
        .eq("id", id);

      return NextResponse.json({ success: true });
    }

    /* ---------------- UPLOAD AUDIO ---------------- */

    if (action === "upload_audio") {
      const audio = formData.get("audio") as File;
      const mode = formData.get("mode");

      if (!audio) {
        return NextResponse.json(
          { error: "No audio provided" },
          { status: 400 }
        );
      }

      const fileName = `${id}-${Date.now()}-${audio.name}`;

      const { error } = await supabase.storage
        .from("plant-audio")
        .upload(fileName, audio);

      if (error) throw error;

      const { data } = supabase.storage
        .from("plant-audio")
        .getPublicUrl(fileName);

      await supabase
        .from("plants")
        .update({
          audio_url: data.publicUrl,
          audio_mode: mode,
        })
        .eq("id", id);

      return NextResponse.json({
        audioUrl: data.publicUrl,
      });
    }

    /* ---------------- DELETE AUDIO ---------------- */

    if (action === "delete_audio") {
      const fileName = formData.get("fileName") as string;

      if (!fileName) {
        return NextResponse.json(
          { error: "Missing file name" },
          { status: 400 }
        );
      }

      await supabase.storage
        .from("plant-audio")
        .remove([fileName]);

      await supabase
        .from("plants")
        .update({
          audio_url: null,
        })
        .eq("id", id);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );

  } catch (err) {
    console.error("MEDIA API ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}