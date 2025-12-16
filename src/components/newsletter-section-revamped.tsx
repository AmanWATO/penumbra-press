'use client'

import { motion } from "framer-motion";
import { useState } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Mail, Sparkles, CheckCircle } from "lucide-react";
import theme, { colors, fonts } from "@/styles/theme";

export default function NewsletterSectionRevamped() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const ref = collection(db, "subscribers");
      const check = query(ref, where("email", "==", email.toLowerCase()));
      const snapshot = await getDocs(check);

      if (!snapshot.empty) {
        setError("You've already subscribed.");
        setIsLoading(false);
        return;
      }

      await addDoc(ref, {
        email: email.toLowerCase(),
        subscribedAt: new Date(),
      });

      setSubmitted(true);
      setEmail("");
      setError("");
      setIsLoading(false);

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Subscription error:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.penumbraBlack} 0%, ${colors.inkBrown} 50%, ${colors.deepSepia} 100%)`,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: colors.gold }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: colors.purple }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 backdrop-blur-md border rounded-full px-6 py-3 mb-6"
              style={{
                backgroundColor: `${colors.white}1A`,
                borderColor: `${colors.white}33`,
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Sparkles className="w-5 h-5" style={{ color: colors.gold }} />
              <span
                className="text-sm font-semibold"
                style={{ color: colors.white, fontFamily: fonts.button }}
              >
                Join Our Community
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: fonts.heading, color: colors.cream }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Stay in the Loop
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: fonts.body, color: colors.gray300 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Subscribe to receive updates on new releases, weekly contests, literary insights, and exclusive content delivered straight to your inbox.
            </motion.p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="relative">
              <div
                className="relative backdrop-blur-xl border rounded-2xl p-3 shadow-2xl"
                style={{
                  backgroundColor: `${colors.white}1A`,
                  borderColor: `${colors.white}33`,
                }}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      style={{ color: colors.gray400 }}
                    />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 transition-all"
                      style={{ fontFamily: fonts.body, backgroundColor: colors.white, color: colors.gray900, '::placeholder': { color: colors.gray500 }, '--ring-color': colors.gold } as React.CSSProperties}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading || submitted}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ fontFamily: fonts.button, background: `linear-gradient(to right, ${colors.gold}, ${colors.deepSepia})` }}
                    whileHover={{ scale: submitted ? 1 : 1.02 }}
                    whileTap={{ scale: submitted ? 1 : 0.98 }}
                    disabled={isLoading || submitted}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-t-transparent rounded-full"
                          style={{ borderColor: colors.white, borderTopColor: 'transparent' }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Subscribing...</span>
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  className="mt-4 p-4 border rounded-xl backdrop-blur-sm"
                  style={{
                    backgroundColor: `${theme.dashboardTheme.colors.success}33`,
                    borderColor: `${theme.dashboardTheme.colors.success}80`,
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-center flex items-center justify-center gap-2" style={{ fontFamily: fonts.body, color: '#6EE7B7' }}>
                    <CheckCircle className="w-5 h-5" />
                    You&apos;re now subscribed to Penumbra Penned! ✨
                  </p>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  className="mt-4 p-4 border rounded-xl backdrop-blur-sm"
                  style={{
                    backgroundColor: `${colors.unavailable}33`,
                    borderColor: `${colors.unavailable}80`,
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-center" style={{ fontFamily: fonts.body, color: '#FCA5A5' }}>
                    {error}
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Privacy Note */}
          <motion.p
            className="text-center text-sm mt-6"
            style={{ color: colors.gray400, fontFamily: fonts.body }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              { title: "Weekly Updates", description: "Get notified about new contest themes" },
              { title: "Exclusive Content", description: "Access behind-the-scenes insights" },
              { title: "New Releases", description: "Be first to know about new books" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6 rounded-xl backdrop-blur-sm border"
                style={{
                  backgroundColor: `${colors.white}0D`,
                  borderColor: `${colors.white}1A`,
                }}
                whileHover={{ scale: 1.05, backgroundColor: `${colors.white}14` }}
                transition={{ duration: 0.2 }}
              >
                <h4
                  className="font-bold mb-2"
                  style={{ color: colors.cream, fontFamily: fonts.heading }}
                >
                  {feature.title}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: colors.gray400, fontFamily: fonts.body }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
