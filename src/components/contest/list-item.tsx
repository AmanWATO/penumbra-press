import { colors, fonts } from "@/styles/theme";
import { motion } from "framer-motion";

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="flex items-start"
  >
    <div style={{ fontFamily: fonts.body, color: colors.deepSepia }}>
      {children}
    </div>
  </motion.li>
);

export default ListItem;
