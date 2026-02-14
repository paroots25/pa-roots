import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plantIds, // 👈 array of plant IDs from checkout
    } = body;

    /* ---------------------------------- */
    /* 1️⃣ VERIFY SIGNATURE */
    /* ---------------------------------- */
    const secret = process.env.RAZORPAY_KEY_SECRET!;

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    /* ---------------------------------- */
    /* 2️⃣ MARK ALL PLANTS AS PAID */
    /* ---------------------------------- */
    const { error: updateError } = await supabase
      .from("plants")
      .update({ payment_status: true })
      .in("id", plantIds); // 👈 update multiple rows

    if (updateError) {
      console.error("SUPABASE UPDATE ERROR:", updateError);

      return NextResponse.json(
        { error: "Failed to update payment status" },
        { status: 500 }
      );
    }

    /* ---------------------------------- */
    /* 3️⃣ SUCCESS RESPONSE */
    /* ---------------------------------- */
    return NextResponse.json({
      success: true,
      firstPlantId: plantIds[0], // 👈 used for redirect to result page
    });
  } catch (error) {
    console.error("VERIFY PAYMENT WITH PLANTS ERROR:", error);

    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}