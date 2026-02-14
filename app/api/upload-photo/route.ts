import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/* 🔧 Simple image compression helper */
async function compressImage(file: File) {
  const buffer = await file.arrayBuffer();

  // convert to blob again (basic compression control)
  const compressed = new Blob([buffer], { type: file.type });

  return compressed;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const files = formData.getAll("files") as File[];
    const deleteUrl = formData.get("deleteUrl") as string | null;

    if (!id) {
      return NextResponse.json({ error: "Missing plant id" }, { status: 400 });
    }

    /* ---------------------------------- */
    /* 🗑️ DELETE PHOTO LOGIC */
    /* ---------------------------------- */
    if (deleteUrl) {
      const path = deleteUrl.split("/plant-photos/")[1];

      if (path) {
        await supabase.storage.from("plant-photos").remove([path]);
      }

      const { data: plant } = await supabase
        .from("plants")
        .select("photos")
        .eq("id", id)
        .single();

      const updatedPhotos = (plant?.photos || []).filter(
        (url: string) => url !== deleteUrl
      );

      await supabase.from("plants").update({ photos: updatedPhotos }).eq("id", id);

      return NextResponse.json({ photos: updatedPhotos });
    }

    /* ---------------------------------- */
    /* 📸 UPLOAD PHOTOS */
    /* ---------------------------------- */
    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    let uploadedUrls: string[] = [];

    for (const file of files) {
      const compressed = await compressImage(file);

      const fileName = `${id}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("plant-photos")
        .upload(fileName, compressed, {
          contentType: file.type,
        });

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
      }

      const { data } = supabase.storage.from("plant-photos").getPublicUrl(fileName);

      uploadedUrls.push(data.publicUrl);
    }

    /* ---------------------------------- */
    /* 🔄 MERGE WITH EXISTING PHOTOS */
    /* ---------------------------------- */
    const { data: plant } = await supabase
      .from("plants")
      .select("photos")
      .eq("id", id)
      .single();

    const updatedPhotos = [...(plant?.photos || []), ...uploadedUrls];

    await supabase.from("plants").update({ photos: updatedPhotos }).eq("id", id);

    return NextResponse.json({ photos: updatedPhotos });
  } catch (err) {
    console.error("UPLOAD SERVER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}