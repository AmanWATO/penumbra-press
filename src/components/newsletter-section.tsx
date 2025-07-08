"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeProvider";
import { motion } from "framer-motion";
import { useState } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

function NewsletterSection() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay },
    }),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const ref = collection(db, "subscribers");
      const check = query(ref, where("email", "==", email.toLowerCase()));
      const snapshot = await getDocs(check);

      if (!snapshot.empty) {
        setError("You've already subscribed.");
        return;
      }

      await addDoc(ref, {
        email: email.toLowerCase(),
        subscribedAt: new Date(),
      });

      setSubmitted(true);
      setEmail("");
      setError("");

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Subscription error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      className="py-16 max-md:py-12"
      style={{
        backgroundColor: theme.background.dark,
        color: theme.text.light,
        fontFamily: theme.fonts.body,
      }}
    >
      <div className="container mx-auto px-5 text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: theme.fonts.heading }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Join the Literary Journey
        </motion.h2>

        <motion.p
          className="text-lg max-w-2xl mx-auto mb-8"
          variants={fadeInUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Subscribe to receive updates on new releases, literary events, and
          exclusive content.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 items-center max-md:w-full max-w-md mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.input
            type="email"
            placeholder="Your email address"
            className="px-4 py-2 rounded-md max-md:w-full flex-grow"
            style={{
              backgroundColor: theme.background.primary,
              color: theme.text.primary,
            }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variants={fadeInUp}
            custom={0.4}
          />

          <motion.div
            className="max-md:self-end mt-2"
            variants={fadeInUp}
            custom={0.6}
          >
            <Button
              type="submit"
              className="cursor-pointer"
              style={{
                backgroundColor: theme.background.secondary,
                color: theme.text.primary,
                fontFamily: theme.fonts.body,
              }}
              disabled={submitted}
            >
              {submitted ? "✅ Subscribed!" : "Subscribe"}
            </Button>
          </motion.div>
        </motion.form>

        {error && <p className="text-sm text-red-400 mt-4">{error}</p>}

        {submitted && (
          <motion.p
            className="text-green-400 mt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {`You're now subscribed to Penumbra Penned. ✨ Our team has received your email.`}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export default NewsletterSection;
