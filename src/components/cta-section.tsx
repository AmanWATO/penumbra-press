'use client'

import { motion } from "framer-motion";
import { BookOpen, PenTool, ArrowRight } from "lucide-react";
import { colors, fonts } from "@/styles/theme";
import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.softBeige} 0%, ${colors.parchment} 50%, ${colors.lightSepia} 100%)`,
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${colors.gold}4D` }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${colors.purple}4D` }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CTA Card 1: Books */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative group h-full">
                <div 
                  className="relative h-full rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border overflow-hidden"
                  style={{
                    backgroundColor: colors.white,
                    borderColor: colors.gray200
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    background: `linear-gradient(to bottom right, ${colors.gold}1A, ${colors.purple}1A)`
                  }} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                      style={{ background: `linear-gradient(to bottom right, ${colors.gold}, ${colors.deepSepia})` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BookOpen className="w-8 h-8" style={{ color: colors.white }} />
                    </motion.div>

                    <h3
                      className="text-3xl md:text-4xl font-bold mb-4"
                      style={{ 
                        fontFamily: fonts.heading,
                        color: colors.darkGray 
                      }}
                    >
                      Explore My Books
                    </h3>

                    <p
                      className="text-lg mb-8 leading-relaxed"
                      style={{ 
                        fontFamily: fonts.body,
                        color: colors.gray700 
                      }}
                    >
                      Dive into a collection of stories and poetry that explore the depths of human experience. Each book is a journey waiting to unfold.
                    </p>

                    <Link href="/my-books">
                      <motion.button
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl"
                        style={{
                          fontFamily: fonts.button,
                          background: `linear-gradient(to right, ${colors.gold}, ${colors.deepSepia})`,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Books
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-2 rounded-b-3xl"
                    style={{ background: `linear-gradient(to right, ${colors.gold}, ${colors.deepSepia})` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* CTA Card 2: Weekly Contest */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative group h-full">
                <div 
                  className="relative h-full rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border overflow-hidden"
                  style={{
                    backgroundColor: colors.white,
                    borderColor: colors.gray200
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    background: `linear-gradient(to bottom right, ${colors.purple}1A, ${colors.gold}1A)`
                  }} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                      style={{ background: `linear-gradient(to bottom right, ${colors.purple}, ${colors.nightBlue})` }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PenTool className="w-8 h-8" style={{ color: colors.white }} />
                    </motion.div>

                    <h3
                      className="text-3xl md:text-4xl font-bold mb-4"
                      style={{ 
                        fontFamily: fonts.heading,
                        color: colors.darkGray 
                      }}
                    >
                      Join Weekly Contest
                    </h3>

                    <p
                      className="text-lg mb-8 leading-relaxed"
                      style={{ 
                        fontFamily: fonts.body,
                        color: colors.gray700 
                      }}
                    >
                      Challenge yourself with our weekly writing prompts. Share your stories, connect with fellow writers, and win recognition.
                    </p>

                    <Link href="/penumbra-weekly">
                      <motion.button
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl"
                        style={{
                          fontFamily: fonts.button,
                          background: `linear-gradient(to right, ${colors.purple}, ${colors.nightBlue})`,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Enter Contest
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-2 rounded-b-3xl"
                    style={{ background: `linear-gradient(to right, ${colors.purple}, ${colors.nightBlue})` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
