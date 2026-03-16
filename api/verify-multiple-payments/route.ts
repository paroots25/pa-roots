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

    /* 🔐 Verify Razorpay signature */
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    /* ✅ Mark all plants as paid */
    const { error } = await supabase
      .from("plants")
      .update({ payment_status: true })
      .in("id", plantIds);

    if (error) {
      console.error("PAYMENT UPDATE ERROR:", error);
      return NextResponse.json(
        { error: "Failed to update payment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("VERIFY MULTIPLE PAYMENT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}