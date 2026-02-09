import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { id, password } = await req.json();

    const { error } = await supabase
      .from("plants")
      .update({
        password,
        first_login: false,
        temp_password: null,
      })
      .eq("id", id);

    if (error) {
      return Response.json({ error: "Update failed" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
