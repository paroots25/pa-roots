import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { code, password } = await req.json();

    const { data: plant, error } = await supabase
      .from("plants")
      .select("id, password, temp_password, first_login")
      .eq("code", code)
      .single();

    if (error || !plant) {
      return Response.json({ error: "Invalid code" }, { status: 400 });
    }

    // 🔐 First login → check temp password
    if (plant.first_login) {
      if (plant.temp_password !== password) {
        return Response.json({ error: "Invalid temporary password" }, { status: 400 });
      }

      return Response.json({
        firstLogin: true,
        plantId: plant.id,
      });
    }

    // 🔐 Normal login → check real password
    if (plant.password !== password) {
      return Response.json({ error: "Invalid password" }, { status: 400 });
    }

    return Response.json({
      success: true,
      plantId: plant.id,
    });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
