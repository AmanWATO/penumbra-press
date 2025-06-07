'use client'

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";

export default function DashboardPage() {
  const hasSubmissions = false; 
  const router = useRouter();

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ marginBottom: dashboardTheme.spacing.xxl }}
        >
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ 
              fontFamily: dashboardTheme.fonts.heading,
              color: dashboardTheme.colors.textPrimary,
              background: `linear-gradient(135deg, ${dashboardTheme.colors.textPrimary} 0%, ${dashboardTheme.colors.accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome to Your Writing Sanctuary
          </h1>
          <p 
            className="text-lg"
            style={{ 
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body 
            }}
          >
            Where stories come to life in the Penumbra Writing Contest
          </p>
        </motion.div>

        {!hasSubmissions ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative overflow-hidden"
            style={{
              padding: `${dashboardTheme.spacing.xxl} ${dashboardTheme.spacing.xl}`,
              backgroundColor: dashboardTheme.colors.cardBg,
              border: `1px solid ${dashboardTheme.colors.cardBorder}`,
              borderRadius: dashboardTheme.radius.xl,
              boxShadow: dashboardTheme.colors.cardShadow,
              textAlign: "center"
            }}
          >
            {/* Decorative background elements */}
            <div 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                background: dashboardTheme.colors.subtleGradient,
                opacity: 0.3
              }}
            />
            
            {/* Floating decorative elements */}
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 0.95, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-6 right-6 text-4xl opacity-20"
            >
              ✍️
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: [0, -15, 15, 0],
                y: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-6 left-6 text-3xl opacity-20"
            >
              📚
            </motion.div>

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="mb-6 text-6xl"
              >
                📖
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-2xl font-semibold mb-4"
                style={{ 
                  fontFamily: dashboardTheme.fonts.heading,
                  color: dashboardTheme.colors.textPrimary 
                }}
              >
                Your Literary Journey Begins Here
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-lg mb-8"
                style={{ 
                  color: dashboardTheme.colors.textSecondary,
                  fontFamily: dashboardTheme.fonts.body,
                  lineHeight: "1.6"
                }}
              >
                {`You haven't shared your literary masterpiece yet. Every great story starts with a single word—make yours count in the Penumbra Writing Contest.`}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="relative overflow-hidden px-8 py-4 text-lg font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: dashboardTheme.colors.accent,
                    color: dashboardTheme.colors.activeText,
                    border: "none",
                    borderRadius: dashboardTheme.radius.lg,
                    fontFamily: dashboardTheme.fonts.body,
                    boxShadow: dashboardTheme.components.button.primary.shadow,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = dashboardTheme.colors.accentDark;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(139, 110, 87, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = dashboardTheme.colors.accent;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = dashboardTheme.components.button.primary.shadow;
                  }}
                  onClick={() => router.push("/penumbra-dashboard/submit")}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Begin Your Submission
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                  </span>
                  
                  {/* Animated background shimmer */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                      transform: "translateX(-100%)"
                    }}
                    animate={{ transform: "translateX(200%)" }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </Button>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="mt-6 text-sm"
                style={{ 
                  color: dashboardTheme.colors.textTertiary,
                  fontFamily: dashboardTheme.fonts.body 
                }}
              >
                Ready to let your creativity flow? Your story awaits.
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              padding: dashboardTheme.spacing.xl,
              backgroundColor: dashboardTheme.colors.cardBg,
              border: `1px solid ${dashboardTheme.colors.cardBorder}`,
              borderRadius: dashboardTheme.radius.xl,
              boxShadow: dashboardTheme.colors.cardShadow,
            }}
          >
            <h2 
              className="text-xl font-semibold mb-4"
              style={{ 
                fontFamily: dashboardTheme.fonts.heading,
                color: dashboardTheme.colors.textPrimary 
              }}
            >
              Your Submissions
            </h2>
            {/* Submission cards will be mapped here */}
            <p 
              style={{ 
                color: dashboardTheme.colors.textSecondary,
                fontFamily: dashboardTheme.fonts.body 
              }}
            >
              Your creative works will appear here once submitted.
            </p>
          </motion.div>
        )}

     
      </motion.div>
    </DashboardLayout>
  );
}