export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import sharp from "sharp";

export async function POST(req: Request) {
  try {

    const formData = await req.formData();
    const id = formData.get("id") as string;
    const files = formData.getAll("files") as File[];

    if (!id) {
      return NextResponse.json(
        { error: "Missing plant id" },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {

      /* Convert file to buffer */

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      /* Compress image */

      const compressed = await sharp(buffer)
        .resize({ width: 1600 }) 
        .jpeg({ quality: 70 })
        .toBuffer();

      const fileName = `${id}-${Date.now()}.jpg`;

      /* Upload to Supabase */

      const { error } = await supabase.storage
        .from("plant-photos")
        .upload(fileName, compressed, {
          contentType: "image/jpeg",
        });

      if (error) {
        console.error("Upload error:", error);
        continue;
      }

      /* Get public URL */

      const { data } = supabase.storage
        .from("plant-photos")
        .getPublicUrl(fileName);

      uploadedUrls.push(data.publicUrl);
    }

    /* Get existing photos */

    const { data: plant, error: fetchError } = await supabase
      .from("plants")
      .select("photos")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error(fetchError);
      return NextResponse.json(
        { error: "Failed to fetch plant" },
        { status: 500 }
      );
    }

    const existingPhotos = plant?.photos || [];

    const updatedPhotos = [...existingPhotos, ...uploadedUrls];

    /* Update database */

    const { error: updateError } = await supabase
      .from("plants")
      .update({ photos: updatedPhotos })
      .eq("id", id);

    if (updateError) {
      console.error(updateError);
      return NextResponse.json(
        { error: "Failed to update photos" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      photos: updatedPhotos,
    });

  } catch (err) {

    console.error("Upload failed:", err);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}