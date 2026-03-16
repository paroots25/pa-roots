export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    /* ---------------- CREATE SINGLE ORDER ---------------- */

    if (action === "create_order") {
      const { plant_id, payment_id, amount } = body;

      if (!plant_id || !payment_id) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      const { data, error } = await supabase
        .from("orders")
        .insert({
          plant_id,
          payment_id,
          amount,
        })
        .select("*");

      if (error) {
        console.error("ORDER CREATE ERROR:", error);
        return NextResponse.json(
          { error: "Failed to create order" },
          { status: 500 }
        );
      }

      return NextResponse.json({ order: data });
    }

    /* ---------------- CREATE ORDER WITH MULTIPLE PLANTS ---------------- */

    if (action === "create_order_with_plants") {
      const { plants, payment_id, amount } = body;

      if (!plants || plants.length === 0) {
        return NextResponse.json(
          { error: "No plants provided" },
          { status: 400 }
        );
      }

      const { data: plantData, error: plantError } = await supabase
        .from("plants")
        .insert(
          plants.map((p: any) => ({
            name: p.name,
            message: p.message || "",
            email: p.email || "",
            plant_type: p.type,
            payment_status: true,
          }))
        )
        .select("id");

      if (plantError) {
        console.error("PLANT INSERT ERROR:", plantError);
        return NextResponse.json(
          { error: "Failed to create plants" },
          { status: 500 }
        );
      }

      const plantIds = plantData.map((p) => p.id);

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          plant_ids: plantIds,
          payment_id,
          amount,
        })
        .select("*");

      if (orderError) {
        console.error("ORDER INSERT ERROR:", orderError);
        return NextResponse.json(
          { error: "Failed to create order" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        order: orderData,
        plant_ids: plantIds,
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (err) {
    console.error("ORDERS API ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}