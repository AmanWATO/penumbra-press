import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Mail } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

export function Footer() {
  const theme = useTheme();

  return (
    <footer 
      className="py-8 border-t mt-auto"
      style={{ 
        backgroundColor: theme.background.primary,
        borderColor: theme.border.light,
        fontFamily: theme.fonts.body 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image 
                src="/penumbra_press_without_text.png" 
                alt="Penumbra Press" 
                width={32} 
                height={32} 
              />
              <span 
                className="text-lg font-semibold"
                style={{ 
                  fontFamily: theme.fonts.heading,
                  color: theme.text.primary
                }}
              >
                Penumbra Press
              </span>
            </Link>
            <p 
              className="text-sm"
              style={{ color: theme.text.secondary }}
            >
              Where words dwell between light and shadow — a haven for poetry, storytelling, and literary reflections.
            </p>
          </div>
          <div>
            <h3 
              className="font-semibold mb-4"
              style={{ color: theme.text.primary }}
            >
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link 
                href="/books" 
                className="hover:underline"
                style={{ color: theme.text.secondary }}
              >
                Books
              </Link>
              <Link 
                href="/instagram" 
                className="hover:underline"
                style={{ color: theme.text.secondary }}
              >
                Instagram
              </Link>
              <Link 
                href="/about" 
                className="hover:underline"
                style={{ color: theme.text.secondary }}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="hover:underline"
                style={{ color: theme.text.secondary }}
              >
                Contact
              </Link>
            </nav>
          </div>
          <div>
            <h3 
              className="font-semibold mb-4"
              style={{ color: theme.text.primary }}
            >
              Connect
            </h3>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
                style={{ color: theme.text.primary }}
              >
                <Link href="https://instagram.com/your-handle" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
                style={{ color: theme.text.primary }}
              >
                <Link href="mailto:your-email@example.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div 
          className="mt-8 pt-6 border-t text-center text-sm"
          style={{ 
            borderColor: theme.border.light,
            color: theme.text.secondary
          }}
        >
          <p>&copy; {new Date().getFullYear()} Penumbra Press. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}