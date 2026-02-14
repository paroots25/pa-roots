import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";

/* 🔐 Razorpay instance */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plants, email } = body;

    /* ---------------------------------- */
    /* 0️⃣ BASIC VALIDATION */
    /* ---------------------------------- */
    if (!plants || !Array.isArray(plants) || plants.length === 0) {
      return NextResponse.json(
        { error: "No plants provided" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    /* ---------------------------------- */
    /* 1️⃣ CALCULATE TOTAL PRICE SAFELY */
    /* ---------------------------------- */
    const totalAmount = plants.reduce((sum: number, p: any) => {
      const price = Number(p.price) || 0;
      return sum + price;
    }, 0);

    if (totalAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid total amount" },
        { status: 400 }
      );
    }

    /* Razorpay expects paise */
    const amountInPaise = totalAmount * 100;

    /* ---------------------------------- */
    /* 2️⃣ CREATE PLANTS IN DB */
    /* ---------------------------------- */
    const { data: createdPlants, error: plantError } = await supabase
      .from("plants")
      .insert(
        plants.map((p: any) => ({
          name: p.name,
          message: p.message,
          email,
          plant_type: p.type,
          payment_status: false,
        }))
      )
      .select("id");

    if (plantError || !createdPlants) {
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
    /* 4️⃣ RETURN RESPONSE */
    /* ---------------------------------- */
    return NextResponse.json({
      success: true,
      order,
      plantIds,
      totalAmount,
    });
  } catch (error) {
    console.error("CREATE ORDER WITH PLANTS ERROR:", error);

    return NextResponse.json(
      { error: "Server error while creating order" },
      { status: 500 }
    );
  }
}