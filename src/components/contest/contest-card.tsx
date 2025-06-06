import { colors } from "@/styles/theme";
import { motion } from "framer-motion";

const ContestCard = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    style={{
      backgroundColor: colors.parchment,
      borderColor: colors.nightBlue,
    }}
    className={`p-6 rounded-lg border ${className} shadow-lg hover:shadow-xl transition-shadow duration-300`}
  >
    {children}
  </motion.div>
);

export default ContestCard;
