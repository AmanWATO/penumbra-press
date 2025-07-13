"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { ArrowLeft, Check, Star } from "lucide-react";
import { useState } from "react";

const pricingPlans = [
  {
    id: "early-bird",
    title: "Early Bird",
    price: "₹49",
    description: "Perfect for getting started with early submission benefits",
    features: [
      "Early submission access",
      "Standard review process",
      "Email notifications",
      "Basic submission tracking",
    ],
    popular: false,
  },
  {
    id: "standard",
    title: "Standard",
    price: "₹149",
    description: "Most popular choice with enhanced features",
    features: [
      "Priority review process",
      "Detailed feedback report",
      "Advanced submission tracking",
      "Email and SMS notifications",
      "Editorial consultation (15 min)",
    ],
    popular: true,
  },
  {
    id: "penumbra-prism",
    title: "Penumbra Prism",
    price: "₹349",
    description: "Premium experience with exclusive benefits",
    features: [
      "Express review process",
      "Comprehensive feedback report",
      "One-on-one editorial consultation (45 min)",
      "Priority placement consideration",
      "Exclusive author networking access",
      "Publication guarantee consideration",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Navigate to form with selected plan
    router.push(`/penumbra-dashboard/submissions/form?plan=${planId}`);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
        className="p-8"
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-sm transition-colors duration-200"
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
          className="mb-8 text-center"
        >
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: dashboardTheme.fonts.heading,
              color: dashboardTheme.colors.textPrimary,
            }}
          >
            Choose Your Submission Plan
          </h1>
          <p
            style={{
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body,
            }}
          >
            Select the plan that best fits your writing journey
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative"
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 text-sm font-semibold rounded-full flex items-center gap-1"
                  style={{
                    backgroundColor: dashboardTheme.colors.accent,
                    color: dashboardTheme.colors.activeText,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                >
                  <Star size={14} />
                  Most Popular
                </motion.div>
              )}

              <div
                className="relative overflow-hidden h-full"
                style={{
                  backgroundColor: dashboardTheme.colors.cardBg,
                  border: plan.popular
                    ? `2px solid ${dashboardTheme.colors.accent}`
                    : `1px solid ${dashboardTheme.colors.cardBorder}`,
                  borderRadius: dashboardTheme.radius.xl,
                  boxShadow: plan.popular
                    ? "0 8px 32px rgba(139, 110, 87, 0.2)"
                    : dashboardTheme.colors.cardShadow,
                  padding: dashboardTheme.spacing.xl,
                }}
              >
                {/* Background gradient for popular plan */}
                {plan.popular && (
                  <div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${dashboardTheme.colors.accent}05 0%, ${dashboardTheme.colors.accentLight}05 100%)`,
                    }}
                  />
                )}

                <div className="relative z-10">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{
                        fontFamily: dashboardTheme.fonts.heading,
                        color: dashboardTheme.colors.textPrimary,
                      }}
                    >
                      {plan.title}
                    </h3>
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{
                        color: dashboardTheme.colors.accent,
                        fontFamily: dashboardTheme.fonts.heading,
                      }}
                    >
                      {plan.price}
                    </div>
                    <p
                      className="text-sm"
                      style={{
                        color: dashboardTheme.colors.textSecondary,
                        fontFamily: dashboardTheme.fonts.body,
                      }}
                    >
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.6 + featureIndex * 0.1,
                            duration: 0.3,
                          }}
                          className="flex items-center gap-3"
                        >
                          <div
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: `${dashboardTheme.colors.accent}20`,
                            }}
                          >
                            <Check
                              size={12}
                              style={{ color: dashboardTheme.colors.accent }}
                            />
                          </div>
                          <span
                            className="text-sm"
                            style={{
                              color: dashboardTheme.colors.textSecondary,
                              fontFamily: dashboardTheme.fonts.body,
                            }}
                          >
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Select Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleSelectPlan(plan.id)}
                      className="w-full py-3 font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: plan.popular
                          ? dashboardTheme.colors.accent
                          : "transparent",
                        color: plan.popular
                          ? dashboardTheme.colors.activeText
                          : dashboardTheme.colors.accent,
                        border: plan.popular
                          ? "none"
                          : `2px solid ${dashboardTheme.colors.accent}`,
                        borderRadius: dashboardTheme.radius.lg,
                        fontFamily: dashboardTheme.fonts.body,
                      }}
                      onMouseEnter={(e) => {
                        if (!plan.popular) {
                          e.currentTarget.style.backgroundColor =
                            dashboardTheme.colors.accent;
                          e.currentTarget.style.color =
                            dashboardTheme.colors.activeText;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!plan.popular) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color =
                            dashboardTheme.colors.accent;
                        }
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
