import { useTheme } from "@/context/ThemeProvider";
import { Check } from "lucide-react";

export function SuccessMessage() {
  const theme = useTheme();

  return (
    <div
      className="h-full flex flex-col items-center justify-center text-center p-6 md:p-8 rounded-lg shadow-lg"
      style={{
        backgroundColor: theme.background.secondary,
        borderLeft: `4px solid ${theme.border.dark}`,
      }}
    >
      <Check
        className="h-12 w-12 md:h-16 md:w-16 mb-4"
        style={{ color: theme.text.primary }}
      />
      <h3
        className="text-xl md:text-2xl mb-2"
        style={{
          fontFamily: theme.fonts.heading,
          color: theme.text.primary,
        }}
      >
        Message Sent
      </h3>
      <p
        className="text-base md:text-lg"
        style={{
          fontFamily: theme.fonts.body,
          color: theme.text.secondary,
        }}
      >
        {`Thank you for reaching out. We'll respond to your inquiry
        shortly.`}
      </p>
    </div>
  );
}
