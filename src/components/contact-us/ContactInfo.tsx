import { useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { ContactMethod } from "./ContactMethod";
import { useConfig } from "@/context/ConfigProvider";

interface CopiedState {
  email: boolean;
  phone: boolean;
}

export function ContactInfo() {
  const theme = useTheme();
  const config = useConfig();

  const [copied, setCopied] = useState<CopiedState>({
    email: false,
    phone: false,
  });

  const copyToClipboard = (text: string, type: keyof CopiedState): void => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [type]: false }));
      }, 2000);
    });
  };

  return (
    <div
      className="rounded-lg p-6 md:p-8 shadow-lg"
      style={{
        backgroundColor: theme.background.secondary,
        borderLeft: `4px solid ${theme.border.dark}`,
      }}
    >
      <h3
        className="text-xl md:text-2xl mb-4 md:mb-6"
        style={{
          fontFamily: theme.fonts.heading,
          color: theme.text.primary,
        }}
      >
        How to Reach Us
      </h3>

      <div className="space-y-4 md:space-y-6">
        <ContactMethod
          icon={
            <Mail
              className="h-4 w-4 md:h-5 md:w-5"
              style={{ color: theme.text.light }}
            />
          }
          title="Email"
          value={config.about_author.email}
          isCopied={copied.email}
          onCopy={() => copyToClipboard(config.about_author.email, "email")}
          className="break-all"
        />

        <ContactMethod
          icon={
            <Phone
              className="h-4 w-4 md:h-5 md:w-5"
              style={{ color: theme.text.light }}
            />
          }
          title="Phone"
          value={config.about_author.phoneNumber}
          isCopied={copied.phone}
          onCopy={() =>
            copyToClipboard(config.about_author.phoneNumber, "phone")
          }
        />

        <div className="flex items-start space-x-3 md:space-x-4">
          <div
            className="p-2 md:p-3 rounded-full"
            style={{ backgroundColor: theme.background.dark }}
          >
            <MessageSquare
              className="h-4 w-4 md:h-5 md:w-5"
              style={{ color: theme.text.light }}
            />
          </div>
          <div>
            <h4
              className="text-base md:text-lg font-medium mb-1"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.text.primary,
              }}
            >
              Office Hours
            </h4>
            <p
              className="text-sm md:text-base"
              style={{ color: theme.text.secondary }}
            >
              Monday - Friday: 9am - 5pm EST
            </p>
            <p
              className="mt-1 text-sm md:text-base"
              style={{ color: theme.text.secondary }}
            >
              Response time: within 48 hours
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-6 md:mt-8 pt-4 md:pt-6 border-t"
        style={{ borderColor: theme.border.light }}
      >
        <p
          className="italic text-sm md:text-base"
          style={{
            fontFamily: theme.fonts.body,
            color: theme.text.secondary,
          }}
        >
          {`Between light and shadow lies connection. Reach out, and
          let's explore the literary penumbra together.`}
        </p>
      </div>
    </div>
  );
}
