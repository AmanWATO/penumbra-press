import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  Inter,
  Josefin_Sans,
  Noto_Serif,
  Nunito_Sans,
  Open_Sans,
  Playfair_Display,
  Poppins,
  Quicksand,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ConfigProvider } from "@/context/ConfigProvider";
import { GlobalHeader } from "@/components/global-header";
import { GlobalFooter } from "@/components/global-footer";
import Script from "next/script";

const GTM_ID = "GTM-K6S8HL33";

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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Penumbra Penned",
  description:
    "Where words dwell between light and shadow — a haven for poetry, storytelling, and literary reflections. Explore the interplay of ink and ether.",
  alternates: {
    canonical: "https://penumbrapenned.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="poetry contests, short stories, Indian writers, literary platform, Penumbra Penned, creative writing, online anthology"
        />
        <meta name="author" content="Penumbra Team" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Penumbra Penned - Where Light Meets Word"
        />
        <meta
          property="og:description"
          content="Enter the realm of storytelling and poetic wonder. Discover contests, anthologies, and the art of expression."
        />
        <meta
          property="og:image"
          content="https://penumbrapenned.com/penumbra_penned.png"
        />
        <meta property="og:url" content="https://penumbrapenned.com" />
        <meta property="og:site_name" content="Penumbra Penned" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Penumbra Penned",
            url: "https://penumbrapenned.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://penumbrapenned.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>

        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>

      <body
        className={`${playfair.variable} ${josefinSans.variable} ${openSans?.variable} ${nunitoSans.variable} ${notoSerif?.variable} ${quicksand?.variable} ${spaceGrotesk.variable} ${poppins.variable} ${inter.variable} ${ibmPlexSans.variable} antialiased`}
      >
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />

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
