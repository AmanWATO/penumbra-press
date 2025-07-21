"use client";

import api from "@/api/backendService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; 

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const plan = searchParams.get("plan");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId || !plan) return;

    const confirm = async () => {
      try {
        const { data } = await api.post("purchase/confirm", { orderId });

        if (data?.slotsAdded >= 1) {
          router.replace(`/penumbra-dashboard/submissions/form?plan=${plan}`);
        } else {
          alert("Payment not confirmed. Try again.");
          router.replace("/penumbra-dashboard");
        }
      } catch (err) {
        console.error("Confirm failed:", err);
        alert("Something went wrong.");
        router.replace("/penumbra-dashboard");
      } finally {
        setLoading(false);
      }
    };

    confirm();
  }, [orderId, plan, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 to-black text-white px-4">
      <div className="text-center max-w-md space-y-4">
        <div className="flex justify-center">
          {loading ? (
            <Loader2 className="animate-spin h-10 w-10 text-purple-300" />
          ) : (
            <span className="text-4xl">🎉</span>
          )}
        </div>

        <h1 className="text-2xl font-semibold">
          {loading
            ? "Confirming your payment..."
            : "Redirecting you shortly..."}
        </h1>

        {loading ? (
          <p className="text-sm text-gray-300">
            Just a moment — we’re checking the stars, syncing the scrolls, and
            validating your slot...
          </p>
        ) : (
          <p className="text-sm text-green-400">
            All set! Redirecting to your submission form.
          </p>
        )}
      </div>
    </div>
  );
}
