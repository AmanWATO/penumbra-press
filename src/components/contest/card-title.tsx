import { colors, fonts } from "@/styles/theme";


const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3
    style={{
      fontFamily: fonts.heading,
      color: colors.nightBlue,
    }}
    className="text-xl md:text-2xl mb-3"
  >
    {children}
  </h3>
);

export default CardTitle