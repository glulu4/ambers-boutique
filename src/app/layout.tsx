
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {Inter, Corinthia, Lora, Inria_Serif, Rethink_Sans, } from "next/font/google";
import "./globals.css";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import Providers from "@/components/theme-provider";
import {default as TanProvider} from "./providers";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontHeading = Inria_Serif({
  weight: ["300", "400", "700"],
  style:["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif"
});


const fontSecHeading = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600","700"], // Light weight for body font
  variable: "--font-sec-header",
});

const fontBody = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Light weight for body font
  variable: "--font-body",
});

const fontAccent = Corinthia({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-accent", // Assuming Corinthia is Lora; replace if different
});

export const metadata: Metadata = {
  title: {
    absolute: config.blog.metadata.title.absolute,
    default: config.blog.metadata.title.default,
    template: config.blog.metadata.title.template,
  },
  description: config.blog.metadata.description,
  openGraph: {
    title: config.blog.metadata.title.default,
    description: config.blog.metadata.description,
    images: [
      signOgImageUrl({
        title: config.blog.name,
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
          // "min-h-screen bg-background font-sans antialiased w-5/6 m-auto",
          "min-h-screen bg-background font-sans antialiased m-auto",
          "w-[95%] sm:w-5/6", // Wider width on mobile, default width for larger screens
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
          // enableSystem
          disableTransitionOnChange
        >
          <main>
            <Header />
            <TanProvider>{children}</TanProvider>
            
            <Footer />
            </main>
        </Providers>
      </body>
    </html>
  );
}
