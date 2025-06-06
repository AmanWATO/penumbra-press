import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeProvider";
import { FormField } from "./FormField";
import { ContactFormData } from "@/app/contact-us/ContactUsPage";

interface ContactFormProps {
  formData: ContactFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ContactForm({
  formData,
  handleChange,
  handleSubmit,
}: ContactFormProps) {
  const theme = useTheme();

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 md:p-8 rounded-lg shadow-lg"
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
        Send a Message
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="name"
            label="Your Name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <FormField
            id="email"
            label="Your Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <FormField
          id="subject"
          label="Subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
        />

        <div>
          <label
            htmlFor="message"
            className="block mb-1 md:mb-2 text-sm font-medium"
            style={{ color: theme.text.primary }}
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 md:px-4 py-2 rounded-md border resize-none text-sm md:text-base"
            style={{
              borderColor: theme.border.medium,
              backgroundColor: theme.background.primary,
              color: theme.text.primary,
            }}
          ></textarea>
        </div>

        <Button
          type="submit"
          className="w-full flex items-center justify-center space-x-1 py-4 md:py-6 cursor-pointer mt-2"
          style={{
            backgroundColor: theme.background.dark,
            color: theme.text.light,
            fontFamily: theme.fonts.button,
          }}
        >
          <Send className="h-4 w-4" />
          <span>Send Message</span>
        </Button>
      </div>
    </form>
  );
}
