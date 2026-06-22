import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Amber's Jewelry Boutique. We'd love to hear from you about our vintage jewelry collection.",
};

export default function ContactLayout({children}: {children: React.ReactNode}) {
  return children;
}
