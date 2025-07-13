"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function SubmissionSuccessPage() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
        className="p-8 flex items-center justify-center min-h-[80vh]"
      >
        <div className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${dashboardTheme.colors.success} 0%, #5A8A68 100%)`,
              }}
            >
              <CheckCircle
                size={40}
                style={{ color: dashboardTheme.colors.activeText }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: dashboardTheme.fonts.heading,
              color: dashboardTheme.colors.textPrimary,
            }}
          >
            Submission Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg mb-8"
            style={{
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body,
              lineHeight: "1.6",
            }}
          >
            {`Your literary masterpiece has been submitted successfully to the
            Penumbra Writing Contest. We'll review your submission and get back
            to you soon.`}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => router.push("/penumbra-dashboard/submissions")}
              className="px-8 py-3 font-semibold transition-all duration-300 flex items-center gap-2"
              style={{
                backgroundColor: dashboardTheme.colors.accent,
                color: dashboardTheme.colors.activeText,
                border: "none",
                borderRadius: dashboardTheme.radius.lg,
                fontFamily: dashboardTheme.fonts.body,
              }}
            >
              View Your Submissions
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
