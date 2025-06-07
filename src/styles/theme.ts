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
  unavailable: "#FF4C4C",
  gold: "#FFBE00",
  purple: "#4C3F91",
};

export const fonts = {
  heading: "var(--font-playfair)",
  body: "var(--font-space-grotesk)",
  button: "var(--font-poppins)",
};

export const dashboardTheme = {
  fonts: {
    heading: "var(--font-ibm-plex-sans)",
    body: "var(--font-inter)",
    accent: "var(--font-space-grotesk)",
  },
  colors: {
    primary: "#FEFEFE", // Pure white
    secondary: "#F8F9FB", // Soft off-white
    tertiary: "#F1F3F7", // Light gray-blue

    sidebarBg: "linear-gradient(180deg, #FFFEF9 0%, #FDF8F0 50%, #F9F4ED 100%)",
    sidebarBorder: "rgba(139, 110, 87, 0.15)",
    sidebarShadow: "0 8px 32px rgba(139, 110, 87, 0.12)",

    textPrimary: "#2D2A26", // Warm dark brown
    textSecondary: "#5A524A", // Medium brown
    textTertiary: "#8D7F73", // Light brown
    textMuted: "#B8ADA1", // Very light brown

    accent: "#8B6E57", // Warm brown (like aged paper)
    accentLight: "#A8896F", // Lighter brown
    accentDark: "#6D5240", // Darker brown

    hover: "rgba(139, 110, 87, 0.08)",
    active: "#8B6E57",
    activeText: "#FFFFFF",
    focus: "rgba(139, 110, 87, 0.20)",

    success: "#4A7C59", // Forest green
    warning: "#B8860B", // Dark goldenrod
    error: "#A0522D", // Sienna
    info: "#4682B4", // Steel blue

    border: "rgba(139, 110, 87, 0.12)",
    borderLight: "rgba(139, 110, 87, 0.06)",
    borderMedium: "rgba(139, 110, 87, 0.18)",

    cardBg: "#FFFFFF",
    cardBorder: "rgba(139, 110, 87, 0.10)",
    cardShadow: "0 4px 16px rgba(139, 110, 87, 0.08)",
    cardHover: "0 8px 32px rgba(139, 110, 87, 0.12)",

    glassOverlay: "rgba(255, 255, 255, 0.7)",
    subtleGradient:
      "linear-gradient(135deg, rgba(139, 110, 87, 0.02) 0%, rgba(139, 110, 87, 0.06) 100%)",

    manuscript: "#FFFEF7", // Cream paper color
    ink: "#2D2A26", // Deep ink brown
    quill: "#8B6E57", // Quill brown
    parchment: "#F7F3ED", // Aged paper

    loading: "#E5DDD5",
    skeleton: "linear-gradient(90deg, #F1F3F7 25%, #E5DDD5 50%, #F1F3F7 75%)",
  },

  components: {
    button: {
      primary: {
        bg: "#8B6E57",
        color: "#FFFFFF",
        hover: "#6D5240",
        shadow: "0 2px 8px rgba(139, 110, 87, 0.25)",
      },
      secondary: {
        bg: "transparent",
        color: "#8B6E57",
        border: "1px solid rgba(139, 110, 87, 0.25)",
        hover: "rgba(139, 110, 87, 0.08)",
      },
    },

    navigation: {
      active: {
        bg: "#8B6E57",
        color: "#FFFFFF",
        shadow: "0 2px 12px rgba(139, 110, 87, 0.3)",
      },
      inactive: {
        color: "#5A524A",
        hover: "rgba(139, 110, 87, 0.08)",
      },
    },

    input: {
      bg: "#FFFFFF",
      border: "rgba(139, 110, 87, 0.20)",
      focus: "rgba(139, 110, 87, 0.35)",
      placeholder: "#B8ADA1",
    },
  },

  animation: {
    fast: "0.15s",
    medium: "0.25s",
    slow: "0.4s",
    spring: [0.34, 1.56, 0.64, 1],
    ease: [0.25, 0.46, 0.45, 0.94],
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },

  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
};

const theme = {
  colors,
  fonts,
  dashboardTheme,
  sections: {
    headFoot: {
      background: colors.penumbraBlack,
      text: colors.cream,
      accent: colors.mediumSepia,
    },

    quotes: {
      background: "#F9F7FE",
      text: "#333333",
      subtext: "#777777",
      accent: colors.penumbraBlack,
      cardBackground: "rgba(0, 0, 0, 0.02)",
      cardBackgroundActive: "rgba(0, 0, 0, 0.06)",
      decorativeElements: colors.gray600,
      quoteNumber: "#282520",
      explanation: "#555555",
      divider: colors.nightBlue,
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
