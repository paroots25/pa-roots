import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const order = await razorpay.orders.create({
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: `memory_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("RAZORPAY ORDER ERROR:", error);
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
  }
}
