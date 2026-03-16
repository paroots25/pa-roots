import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import sharp from "sharp";

export async function POST(req: Request) {
  try {

    const formData = await req.formData();
    const id = formData.get("id") as string;
    const files = formData.getAll("files") as File[];

    if (!id) {
      return NextResponse.json({ error: "Missing plant id" }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      /* 🔥 IMAGE COMPRESSION */

      const compressed = await sharp(buffer)
        .resize({ width: 1600 }) // limit width
        .jpeg({ quality: 70 })   // compression quality
        .toBuffer();

      const fileName = `${id}-${Date.now()}.jpg`;

      const { data, error } = await supabase.storage
        .from("plant-images")
        .upload(fileName, compressed, {
          contentType: "image/jpeg",
        });

      if (error) {
        console.error(error);
        continue;
      }

      const { data: publicUrl } = supabase.storage
        .from("plant-images")
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrl.publicUrl);
    }

    /* GET OLD PHOTOS */

    const { data: plant } = await supabase
      .from("plants")
      .select("photos")
      .eq("id", id)
      .single();

    const existingPhotos = plant?.photos || [];

    const updatedPhotos = [...existingPhotos, ...uploadedUrls];

    /* UPDATE DATABASE */

    await supabase
      .from("plants")
      .update({ photos: updatedPhotos })
      .eq("id", id);

    return NextResponse.json({
      success: true,
      photos: updatedPhotos,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );

  }
}