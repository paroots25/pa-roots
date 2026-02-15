"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderSuccess() {
  const router = useRouter();

  useEffect(() => {
    const last = sessionStorage.getItem("pa_roots_last_order");
    if (last) {
      const ids = JSON.parse(last);
      router.replace(`/order-result/${ids[0]}`);
    } else {
      router.replace("/");
    }
  }, []);

  return <p style={{ padding: 40 }}>Verifying payment...</p>;
}