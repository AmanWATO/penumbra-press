'use client'

import { motion } from "framer-motion";
import { BookOpen, Users, PenTool, Award, Heart, TrendingUp, Sparkles } from "lucide-react";
import { colors, fonts } from "@/styles/theme";

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  delay: number;
}

function StatCard({ icon: Icon, value, label, delay }: StatCardProps) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div
        className="relative rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
        style={{
          background: `linear-gradient(to bottom right, ${colors.white}, ${colors.gray100})`,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to bottom right, ${colors.gold}33, ${colors.purple}33)`,
          }}
        />
        
        <div className="relative z-10">
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
            style={{ background: `linear-gradient(to bottom right, ${colors.gold}, ${colors.deepSepia})` }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-8 h-8" style={{ color: colors.white }} />
          </motion.div>

          <motion.h3
            className="text-4xl md:text-5xl font-bold mb-2 text-center bg-clip-text text-transparent"
            style={{ fontFamily: fonts.heading, backgroundImage: `linear-gradient(to right, ${colors.darkSepia}, ${colors.inkBrown})` }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
          >
            {value}
          </motion.h3>

          <p
            className="text-center font-medium"
            style={{ fontFamily: fonts.body, color: colors.gray700 }}
          >
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon: Icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      className="group "
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className="relative h-full rounded-2xl p-8 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border"
        style={{ backgroundColor: colors.white, borderColor: colors.gray200 }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to bottom right, ${colors.gold}1A, ${colors.purple}1A)`,
          }}
        />
        
        <div className="relative z-10">
          <motion.div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
            style={{ background: `linear-gradient(to bottom right, ${colors.gold}, ${colors.deepSepia})` }}
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-7 h-7" style={{ color: colors.white }} />
          </motion.div>

          <h3
            className="text-xl font-bold mb-3"
            style={{ 
              fontFamily: fonts.heading,
              color: colors.darkGray 
            }}
          >
            {title}
          </h3>

          <p
            className="leading-relaxed"
            style={{ fontFamily: fonts.body, color: colors.gray700 }}
          >
            {description}
          </p>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
          style={{ background: `linear-gradient(to right, ${colors.gold}, ${colors.deepSepia})` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
}

export default function FeaturesStatsSection() {
  const stats = [
    { icon: BookOpen, value: "10+", label: "Published Works" },
    { icon: Users, value: "5K+", label: "Active Readers" },
    { icon: PenTool, value: "100+", label: "Contest Entries" },
    { icon: Award, value: "50+", label: "Winners Celebrated" },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Literary Collection",
      description: "Explore a curated selection of poetry, stories, and reflections that illuminate the human experience.",
    },
    {
      icon: PenTool,
      title: "Weekly Contests",
      description: "Join our vibrant community in weekly writing challenges and showcase your creative talents.",
    },
    {
      icon: Heart,
      title: "Community Driven",
      description: "Connect with fellow writers, share feedback, and grow together in a supportive environment.",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Craft",
      description: "Access resources, insights, and guidance to elevate your writing to new heights.",
    },
  ];

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${colors.gray100} 0%, ${colors.white} 50%, ${colors.gray100} 100%)`,
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${colors.gold}4D` }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${colors.purple}4D` }} />
      </div>

      <div className="container mx-auto px-5 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-6 py-2 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span
              className="text-sm font-semibold text-amber-700"
              style={{ fontFamily: fonts.button }}
            >
              Why Choose Penumbra Penned
            </span>
          </motion.div>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: fonts.heading,
              color: colors.darkGray,
            }}
          >
            A Thriving Literary Universe
          </h2>

          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{
              color: colors.gray700,
              fontFamily: fonts.body,
            }}
          >
            Join thousands of readers and writers in a community dedicated to
            celebrating the written word and creative expression.
          </p>
        </motion.div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div> */}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Bottom Accent */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div
            className="h-1 w-32 mx-auto rounded-full"
            style={{
              background: `linear-gradient(90deg, ${colors.gold}, ${colors.deepSepia})`,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
