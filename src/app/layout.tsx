
// import { config } from "@/config";
// import { signOgImageUrl } from "@/lib/og-image";
// import { cn } from "@/lib/utils";
// import type { Metadata } from "next";
// import {Inter, Corinthia, Lora, Inria_Serif, Rethink_Sans, } from "next/font/google";
// import "./globals.css";
// import {Header} from "@/components/Header";
// import {Footer} from "@/components/Footer";
// import Providers from "@/components/theme-provider";
// import { CartProvider } from "@/context/cartContext";
// import TanProviders from "./providers";

// import {Toaster} from 'react-hot-toast';


// const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

// const fontHeading = Inria_Serif({
//   weight: ["300", "400", "700"],
//   style:["normal", "italic"],
//   subsets: ["latin"],
//   variable: "--font-serif"
// });


// const fontSecHeading = Lora({
//   subsets: ["latin"],
//   weight: ["400", "500", "600","700"], // Light weight for body font
//   variable: "--font-sec-header",
// });

// const fontBody = Rethink_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"], // Light weight for body font
//   variable: "--font-body",
// });

// const fontAccent = Corinthia({
//   subsets: ["latin"],
//   weight: ["400", "700"],
//   variable: "--font-accent", // Assuming Corinthia is Lora; replace if different
// });

// export const metadata: Metadata = {
//   title: {
//     absolute: "Vintage Jewelry - Amber's Jewelry Boutique",
//     default: "Amber's Jewelry Boutique - Vintage Jewelry",
//     template: "%s | Vintage  Jewelry",
//   },
//   description: "Discover unique and authentic vintage jewelry at Amber's Jewelry Boutique. Shop our collection of timeless pieces crafted from vintage buttons.",
//   openGraph: {
//     title: "Amber's Boutique - Vintage Jewelry",
//     description: "Explore our exclusive collection of vintage jewelry. Each piece is a timeless treasure crafted from authentic buttons.", images: [
//       signOgImageUrl({
//         title: "Amber's Jewelry Boutique - Vintage Jewelry",

//       }),
//     ]
//   }
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   const mode = process.env.MODE;
//   console.log("Mode: ", mode);
  
//   return (
//     <html lang="en">
//       <body
//         className={cn(
//           // "min-h-screen bg-background font-sans antialiased w-5/6 m-auto",
//           "min-h-screen bg-neutral-50 font-sans antialiased m-auto",
//           "w-[95%] sm:w-5/6", // Wider width on mobile, default width for larger screens
//           fontSans.variable,
//           fontSecHeading.variable,
//           fontHeading.variable,
//           fontBody.variable,
//           fontAccent.variable
//         )}
//       >
//         <Providers
//           attribute="class"
//           defaultTheme="light"
//           // enableSystem
//           disableTransitionOnChange
//         >

//           {/* Query Client Provider */}
//           <TanProviders>
//             {/* Cart State Management */}
//             <CartProvider>
//               <main>
//                 <Header />
//                 <Toaster/>
//                 {children}
//                 <Footer />
//               </main>
//             </CartProvider>
//           </TanProviders>

//         </Providers>
//       </body>
//     </html>
//   );
// }


import {config} from "@/config";
import {signOgImageUrl} from "@/lib/og-image";
import {cn} from "@/lib/utils";
import type {Metadata} from "next";
import Script from "next/script";
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
  title: {
    absolute: "Vintage Jewelry - Amber's Jewelry Boutique",
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
  const mode = process.env.MODE;
  console.log("Mode: ", mode);

  return (
    <html lang="en">
      <head>
        <Script
          id="schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["OnlineStore", "JewelryStore"],
              "name": "Amber's Jewelry Boutique",
              "url": "https://www.ambersjewelryboutique.com",
              "description": "Specializing in artisanal repurposed vintage jewelry crafted from sustainable materials and designer vintage elements. Each piece is uniquely transformed into contemporary wearable art.",
              "brand": {
                "@type": "Brand",
                "name": "Amber's Jewelry Boutique",
                "slogan": "Transforming vintage treasures into modern masterpieces"
              },
              "keywords": [
                "repurposed jewelry",
                "vintage jewelry",
                "recycled jewelry",
                "upcycled jewelry",
                "sustainable jewelry",
                "vintage button jewelry",
                "eco-friendly jewelry",
                "handmade jewelry",
                "artisan jewelry",
                "designer button jewelry"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Repurposed Vintage Jewelry Collection",
                "itemListElement": [
                  {
                    "@type": "OfferCatalog",
                    "name": "Vintage Button Jewelry",
                    "description": "Elegant jewelry pieces crafted from authentic vintage designer buttons"
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "Upcycled Vintage Pieces",
                    "description": "Contemporary jewelry designs created from carefully sourced vintage materials"
                  }
                ]
              },
              "specialty": [
                "Repurposed vintage jewelry",
                "Sustainable jewelry design",
                "Vintage button transformation",
                "Custom jewelry pieces"
              ],
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.ambersjewelryboutique.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "areaServed": {
                "@type": "Country",
                "name": "United States"
              },
              "priceRange": "$$",
              "paymentAccepted": [
                "Credit Card",
                "PayPal"
              ],
              "openingHours": "Mo-Su",
              "sameAs": [
                "https://www.instagram.com/ambersjewelry.boutique/",
              ]
            })
          }}
        />
      </head>
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