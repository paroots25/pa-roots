import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const files = formData.getAll("files") as File[];

    if (!id || files.length === 0) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    let uploadedUrls: string[] = [];

    for (const file of files) {
      const fileName = `${id}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("plant-photos")
        .upload(fileName, file);

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
      }

      const { data: publicUrl } = supabase.storage
        .from("plant-photos")
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrl.publicUrl);
    }

    // 🔥 merge with existing photos
    const { data: plant } = await supabase
      .from("plants")
      .select("photos")
      .eq("id", id)
      .single();

    const updatedPhotos = [...(plant?.photos || []), ...uploadedUrls];

    await supabase
      .from("plants")
      .update({ photos: updatedPhotos })
      .eq("id", id);

    return NextResponse.json({ photos: updatedPhotos });
  } catch (err) {
    console.error("UPLOAD SERVER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
