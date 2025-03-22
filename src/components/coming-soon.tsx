import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { useTheme } from "@/lib/ThemeProvider";
import { Sparkles } from "lucide-react";

export function ComingSoonCard() {
  const theme = useTheme();

  return (
    <Card
      className="overflow-hidden flex flex-col h-full justify-center items-center"
      style={{
        background: `linear-gradient(135deg, ${theme.background.primary} 0%, ${theme.background.secondary} 50%, ${theme.background.dark} 100%)`,
        borderColor: theme.border.light,
      }}
    >
      <div className="relative w-full flex items-center justify-center">
        <div className="absolute inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
          <Sparkles
            className="h-20 w-20 animate-pulse"
            style={{ color: theme.text.secondary }}
          />
        </div>
      </div>
      <div className="p-10 mt-10 space-y-4">
        <CardTitle
          className="text-center text-3xl font-semibold"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.text.primary,
          }}
        >
          Coming Soon
        </CardTitle>
        <CardDescription
          className="text-center text-lg font-bold"
          style={{
            fontFamily: theme.fonts.body,
            color: theme.text.secondary,
          }}
        >
          More exciting titles will be added to our collection soon. Stay tuned!
        </CardDescription>
      </div>
    </Card>
  );
}
