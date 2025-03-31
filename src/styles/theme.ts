export const colors = {
  gray100: "#f1efe2",
  gray200: "#e8e6d9",
  gray300: "#dfdcd0",
  gray400: "#cfccc0",
  gray500: "#b8b5a9",
  gray600: "#9e9b8f",
  gray700: "#7d7a6e",
  gray800: "#5d5a4e",
  gray900: "#3d3a2e",
  darkGray: "#1d1d1d",
  softBeige: "#f5f5dc",
  deepTeal: "#1a6b6b",
  softEggshell: "#F0EAD6",
  deepSepia: "#5D4037",
  cream: "#f0ebe0",
  parchment: "#e8e2d6",
  lightSepia: "#d5cebf",
  mediumSepia: "#b2aa96",
  darkSepia: "#857f6b",
  inkBrown: "#5a513c",
  moonGray: "#3a3630",
  nightBlue: "#232128",
  penumbraBlack: "#171717",
  unavailable:"#FF4C4C"
};

export const fonts = {
  heading: "var(--font-playfair)",
  body: "var(--font-space-grotesk)",
  button: "var(--font-poppins)",
};

export const theme = {
  colors,
  fonts,
  sections: {
    headFoot: {
      background: colors.penumbraBlack,
      text: colors.cream,
      accent: colors.mediumSepia,
    },
  },
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
