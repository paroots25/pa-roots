import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { cart } = await req.json();

    const total = cart.reduce((sum: number, p: any) => sum + p.price, 0);

    const order = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt: "pa_roots_cart",
    });

    const plantIds = cart.map((p: any) => p.id).filter(Boolean);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      plantIds,
    });
  } catch (err) {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}