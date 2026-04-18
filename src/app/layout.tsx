import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ParisLocal — Find Trusted Local Services in Paris, Ontario",
  description:
    "Connect with verified local businesses in Paris, Brantford, Cambridge, and Brant County. Plumbers, electricians, landscapers, and more. Trusted reviews, instant contact.",
  keywords: [
    "Paris Ontario",
    "local services",
    "Brant County",
    "plumber Paris ON",
    "electrician Paris ON",
    "landscaping Brantford",
    "contractor Cambridge",
    "snow removal Paris",
  ],
  openGraph: {
    title: "ParisLocal — Find Trusted Local Services in Paris, Ontario",
    description:
      "Connect with verified local businesses in Paris, Brantford, Cambridge, and Brant County.",
    type: "website",
    locale: "en_CA",
    url: "https://parislocal.ca",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
