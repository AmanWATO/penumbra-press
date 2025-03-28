export const colors = {
  gray100: "#e5e6e6",
  gray200: "#dcdcd4",
  gray300: "#d4dcd4",
  gray400: "#b3b3b2",
  gray500: "#8d8e8c",
  gray600: "#848486",
  gray700: "#727576",
  gray800: "#626464",
  gray900: "#5c5c5f",
  darkGray: "#363739",
  softBeige: "#f5f5dc",
  deepTeal: "#1a6b6b",
  softEggshell: "#F0EAD6",
  deepSepia: "#5D4037"
};

export const fonts = {
  heading: "var(--font-playfair)",
  body: "var(--font-space-grotesk)",
  button: "var(--font-poppins)",
};

export const theme = {
  colors,
  fonts,
  background: {
    primary: colors.gray100,
    secondary: colors.gray300,
    dark: colors.darkGray,
  },
  text: {
    primary: colors.darkGray,
    secondary: colors.gray900,
    light: colors.gray100,
  },
  border: {
    light: colors.gray400,
    medium: colors.gray700,
    dark: colors.gray900,
  },
};

export default theme;
