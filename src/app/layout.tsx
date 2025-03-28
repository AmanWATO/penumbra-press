import type { Metadata } from "next";
import { Playfair_Display, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ConfigProvider } from "@/context/ConfigProvider";
import { GlobalHeader } from "@/components/global-header";
import { GlobalFooter } from "@/components/global-footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Penumbra Press",
  description:
    "Where words dwell between light and shadow — a haven for poetry, storytelling, and literary reflections. Explore the interplay of ink and ether.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${spaceGrotesk.variable} ${poppins.variable} antialiased`}
      >
        <ThemeProvider>
          <ConfigProvider>
            <GlobalHeader />
            {children}
            <GlobalFooter />
          </ConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}