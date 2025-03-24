import { ReactNode } from "react";
import { Copy, Check } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

interface ContactMethodProps {
  icon: ReactNode;
  title: string;
  value: string;
  isCopied: boolean;
  onCopy: () => void;
  className?: string;
}

export function ContactMethod({
  icon,
  title,
  value,
  isCopied,
  onCopy,
  className = "",
}: ContactMethodProps) {
  const theme = useTheme();

  return (
    <div className="flex items-start space-x-3 md:space-x-4">
      <div
        className="p-2 md:p-3 rounded-full"
        style={{ backgroundColor: theme.background.dark }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h4
          className="text-base md:text-lg font-medium mb-1"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.text.primary,
          }}
        >
          {title}
        </h4>
        <div className="flex items-center flex-wrap space-x-2">
          <p
            className={`text-sm md:text-base ${className}`}
            style={{ color: theme.text.secondary }}
          >
            {value}
          </p>
          <button
            onClick={onCopy}
            className="p-1 rounded hover:bg-gray-200 transition-colors flex-shrink-0"
            aria-label={`Copy ${title.toLowerCase()} to clipboard`}
          >
            {isCopied ? (
              <Check
                className="h-4 w-4"
                style={{ color: theme.text.secondary }}
              />
            ) : (
              <Copy
                className="h-4 w-4"
                style={{ color: theme.text.secondary }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
