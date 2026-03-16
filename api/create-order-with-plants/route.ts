import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";

/* 🔐 Razorpay */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plants, email, location, phone } = body; // ✅ added phone

    /* ❌ No plants */
    if (!plants || plants.length === 0) {
      return NextResponse.json(
        { error: "No plants provided" },
        { status: 400 }
      );
    }

    /* ---------------------------------- */
    /* 1️⃣ TOTAL PRICE */
    /* ---------------------------------- */
    const totalAmount = plants.reduce(
      (sum: number, p: any) => sum + Number(p.price),
      0
    );

    const amountInPaise = totalAmount * 100;

    /* ---------------------------------- */
    /* 2️⃣ INSERT PLANTS INTO SUPABASE */
    /* ---------------------------------- */
    const { data: createdPlants, error: plantError } = await supabase
      .from("plants")
      .insert(
        plants.map((p: any) => ({
          name: p.plantName,                       // ✅ keep spelling
          message: p.message,
          email: p.email || email || "",
          location: p.location || location || "",
          phone: p.phone || phone || "",           // ✅ NEW
          plant_type: p.plant_type,
          price: p.price,                          // ✅ IMPORTANT for revenue
          payment_status: false,
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

    const plantIds = createdPlants.map((p) => p.id);

    /* ---------------------------------- */
    /* 3️⃣ CREATE RAZORPAY ORDER */
    /* ---------------------------------- */
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    /* ---------------------------------- */
    /* 4️⃣ RETURN */
    /* ---------------------------------- */
    return NextResponse.json({
      order,
      plantIds,
      totalAmount,
    });
  } catch (error) {
    console.error("CREATE ORDER WITH PLANTS ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}