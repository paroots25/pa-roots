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
      plantIds,
    } = body;

    /* 0️⃣ validation */
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !Array.isArray(plantIds) ||
      plantIds.length === 0
    ) {
      console.log("❌ Missing payment fields", body);
      return NextResponse.json(
        { error: "Missing payment data" },
        { status: 400 }
      );
    }

    /* 1️⃣ verify signature */
    const secret = process.env.RAZORPAY_KEY_SECRET!;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    console.log("🔍 Expected:", expectedSignature);
    console.log("🔍 Razorpay :", razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
      console.log("❌ Signature mismatch");
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    /* 2️⃣ update plants as paid */
    const { error: updateError } = await supabase
      .from("plants")
      .update({
        payment_status: true,
        razorpay_order_id,
        razorpay_payment_id,
      })
      .in("id", plantIds);

    if (updateError) {
      console.error("❌ Supabase update error:", updateError);
      return NextResponse.json(
        { error: "DB update failed" },
        { status: 500 }
      );
    }

    /* 3️⃣ success */
    return NextResponse.json({
      success: true,
      firstPlantId: plantIds[0],
    });
  } catch (err) {
    console.error("❌ VERIFY ERROR:", err);
    return NextResponse.json(
      { error: "Server verification failed" },
      { status: 500 }
    );
  }
}