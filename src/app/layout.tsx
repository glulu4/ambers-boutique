import {config} from "@/config";
import {signOgImageUrl} from "@/lib/og-image";
import {cn} from "@/lib/utils";
import type {Metadata} from "next";
import {Inter, Corinthia, Lora, Inria_Serif, Rethink_Sans} from "next/font/google";
import "./globals.css";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import Providers from "@/components/theme-provider";
import {CartProvider} from "@/context/cartContext";
import TanProviders from "./providers";
import {Toaster} from 'react-hot-toast';

const fontSans = Inter({subsets: ["latin"], variable: "--font-sans"});
const fontHeading = Inria_Serif({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif"
});
const fontSecHeading = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sec-header",
});
const fontBody = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});
const fontAccent = Corinthia({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-accent",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.ambersjewelryboutique.com"
  ),
  title: {
    absolute: "Amber's Jewelry Boutique",
    default: "Amber's Jewelry Boutique - Vintage Jewelry",
    template: "%s | Vintage Jewelry",
  },
  description: "Discover unique and authentic vintage jewelry at Amber's Jewelry Boutique. Shop our collection of timeless pieces crafted from vintage buttons.",
  openGraph: {
    title: "Amber's Boutique - Vintage Jewelry",
    description: "Explore our exclusive collection of vintage jewelry. Each piece is a timeless treasure crafted from authentic buttons.",
    images: [
      signOgImageUrl({
        title: "Amber's Jewelry Boutique - Vintage Jewelry",
      }),
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">


      <body
        className={cn(
          "min-h-screen bg-neutral-50 font-sans antialiased m-auto",
          "w-[95%] sm:w-5/6",
          fontSans.variable,
          fontSecHeading.variable,
          fontHeading.variable,
          fontBody.variable,
          fontAccent.variable
        )}
      >
        <Providers
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <TanProviders>
            <CartProvider>
              <main>
                <Header />
                <Toaster />
                {children}
                <Footer />
              </main>
            </CartProvider>
          </TanProviders>
        </Providers>
      </body>
    </html>
  );
}