import { useTheme } from "@/context/ThemeProvider";

export function ContactHeader() {
  const theme = useTheme();

  return (
    <div className=" mb-8 md:mb-10 text-center">
      <h2
        className="text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-6 relative inline-block"
        style={{
          fontFamily: theme.fonts.heading,
          color: theme.text.primary,
        }}
      >
        Connect with Penumbra
        <div
          className="absolute -bottom-2 left-1/4 right-1/4 h-0.5"
          style={{ backgroundColor: theme.border.medium }}
        ></div>
      </h2>
      <p
        className="text-base md:text-lg mb-4 md:mb-6 max-w-2xl mx-auto px-2"
        style={{
          fontFamily: theme.fonts.body,
          color: theme.text.secondary,
        }}
      >
        Where words dwell between light and shadow — reach out to us for
        collaborations, inquiries, or simply to share your thoughts.
      </p>
    </div>
  );
}
