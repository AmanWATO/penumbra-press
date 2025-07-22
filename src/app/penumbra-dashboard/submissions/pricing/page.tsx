"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";

// Extend Window type to include Cashfree
declare global {
  interface Window {
    Cashfree?: any;
  }
}
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { pricingPlans } from "@/lib/dashboardData";
import useAuthState from "@/hooks/useAuthState";
import api from "@/api/backendService";

export default function PricingPage() {
  const router = useRouter();
  const [processing, setProcessing] = useState<string | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => setSdkLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleSelectPlan = async (planId: string) => {
    if (!sdkLoaded) {
      return alert("Loading payment SDK — hang tight!");
    }
    setProcessing(planId);

    try {
      const { data: init } = await api.post("purchase/initiate", {
        plan: planId.toUpperCase(),
      });

      const { orderId, orderToken } = init;
      if (!orderId || !orderToken)
        throw new Error("Missing orderId or orderToken");

      const cashfree = window.Cashfree({
        mode: process.env.NEXT_PUBLIC_CASHFREE_ENV,
      });

      cashfree.checkout({
        paymentSessionId: orderToken,
        redirectTarget: "_self",

        onSuccess: () => {
          console.log("Payment successful — will confirm after modal closes.");
          router.push(
            `/penumbra-dashboard/confirm?plan=${planId}&orderId=${orderId}`
          );
        },

        onFailure: (data: any) => {
          console.warn("Payment failed", data);
          router.push(`/penumbra-dashboard`);
        },

        onClose: async () => {
          console.log("Modal closed by user.");
          router.push(`/penumbra-dashboard`);
        },
      });
    } catch (e: any) {
      console.error("Payment flow error:", e);
      alert(e.message || "Payment failed, please try again.");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
        className="px-4 sm:px-6 lg:px-4"
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 max-md:mb-4 text-sm transition-colors duration-200"
          style={{
            color: dashboardTheme.colors.textSecondary,
            fontFamily: dashboardTheme.fonts.body,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = dashboardTheme.colors.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = dashboardTheme.colors.textSecondary;
          }}
        >
          <ArrowLeft size={16} />
          Back to Guidelines
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 text-center max-md:text-left"
        >
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
            style={{
              fontFamily: dashboardTheme.fonts.heading,
              color: dashboardTheme.colors.textPrimary,
            }}
          >
            Choose Your Submission Plan
          </h1>
          <p
            className="text-sm sm:text-base"
            style={{
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body,
            }}
          >
            Select the plan that best fits your writing journey
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative"
            >
              <div
                className="relative overflow-hidden h-full"
                style={{
                  backgroundColor: dashboardTheme.colors.cardBg,
                  border: `1px solid ${dashboardTheme.colors.cardBorder}`,
                  borderRadius: dashboardTheme.radius.xl,
                  boxShadow: dashboardTheme.colors.cardShadow,
                  padding: dashboardTheme.spacing.lg,
                }}
              >
                <div className="relative z-10 flex flex-col justify-between align-center h-full">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3
                      className="text-lg sm:text-xl font-bold mb-2"
                      style={{
                        fontFamily: dashboardTheme.fonts.heading,
                        color: dashboardTheme.colors.textPrimary,
                      }}
                    >
                      {plan.title}
                    </h3>
                    <div
                      className="text-2xl sm:text-3xl font-bold mb-3"
                      style={{
                        color: dashboardTheme.colors.accent,
                        fontFamily: dashboardTheme.fonts.heading,
                      }}
                    >
                      {plan.price}
                    </div>
                    <p
                      className="text-sm sm:text-base px-2"
                      style={{
                        color: dashboardTheme.colors.textSecondary,
                        fontFamily: dashboardTheme.fonts.body,
                      }}
                    >
                      {plan.description}
                    </p>
                  </div>

                  {/* Select Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleSelectPlan(plan.value)}
                      className="w-full py-3 font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: "transparent",
                        color: dashboardTheme.colors.accent,
                        border: `2px solid ${dashboardTheme.colors.accent}`,
                        borderRadius: dashboardTheme.radius.md,
                        fontFamily: dashboardTheme.fonts.body,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          dashboardTheme.colors.accent;
                        e.currentTarget.style.color =
                          dashboardTheme.colors.activeText;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color =
                          dashboardTheme.colors.accent;
                      }}
                    >
                      Select {plan.title}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
