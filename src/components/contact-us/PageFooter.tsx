import { useConfig } from "@/context/ConfigProvider";
import { useTheme } from "@/context/ThemeProvider";

export function PageFooter() {
  const theme = useTheme();
  const config = useConfig();

  return (
    <div className="mt-10 md:mt-16 relative">
      <div
        className="h-0.5 w-full absolute top-0"
        style={{ backgroundColor: theme.border.light }}
      >
        <div
          className="h-2 w-2 rounded-full absolute top-1/2 left-1/4 transform -translate-y-1/2"
          style={{ backgroundColor: theme.background.dark }}
        ></div>
        <div
          className="h-2 w-2 rounded-full absolute top-1/2 right-1/4 transform -translate-y-1/2"
          style={{ backgroundColor: theme.background.dark }}
        ></div>
      </div>

      <div className="text-center pt-6 md:pt-8">
        <p
          className="text-xs md:text-sm"
          style={{
            fontFamily: theme.fonts.body,
            color: theme.text.secondary,
          }}
        >
          {`${config.app.name}`} — Where words dwell between light and shadow
        </p>
      </div>
    </div>
  );
}
