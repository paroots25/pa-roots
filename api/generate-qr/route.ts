import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    // 🔍 Check current QR status
    const { data: plant, error } = await supabase
      .from("plants")
      .select("qr_generated")
      .eq("id", id)
      .single();

    if (error || !plant) {
      return Response.json({ error: "Plant not found" }, { status: 404 });
    }

    // 🔒 Already generated
    if (plant.qr_generated) {
      return Response.json({ locked: true });
    }

    // 🔐 Lock QR forever
    const { error: updateError } = await supabase
      .from("plants")
      .update({ qr_generated: true })
      .eq("id", id);

    if (updateError) {
      return Response.json({ error: "Failed to lock QR" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("QR ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
