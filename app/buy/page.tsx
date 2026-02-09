import { Suspense } from "react";
import BuyClient from "./BuyClient";

export const dynamic = "force-dynamic";

export default function BuyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuyClient />
    </Suspense>
  );
}
