import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/ThemeProvider";

export function NewsletterSection() {
  const theme = useTheme();

  return (
    <section 
      className="py-16"
      style={{ 
        backgroundColor: theme.background.dark,
        color: theme.text.light,
        fontFamily: theme.fonts.body
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: theme.fonts.heading }}
        >
          Join the Literary Journey
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Subscribe to receive updates on new releases, literary events, and exclusive content.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 items-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="px-4 py-2 rounded-md flex-grow"
            style={{ 
              backgroundColor: theme.background.primary,
              color: theme.text.primary
            }}
            required
          />
          <Button 
            type="submit"
            className="cursor-pointer"
            style={{ 
              backgroundColor: theme.background.secondary,
              color: theme.text.primary,
              fontFamily: theme.fonts.body 
            }}
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
