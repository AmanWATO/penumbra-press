import { colors, fonts } from "@/styles/theme";
import { motion } from "framer-motion";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{
      fontFamily: fonts.heading,
      color: colors.parchment,
      borderColor: colors.softBeige,
    }}
    className="text-3xl mb-6 border-b pb-2"
  >
    {children}
  </motion.h2>
);

export default SectionTitle;
