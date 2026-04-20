import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConvexClientProvider from "@/components/ConvexClientProvider";

export const metadata: Metadata = {
  metadataBase: "https://parislocal.ca",
  title: "ParisLocal — Find Trusted Local Services in Paris, Ontario",
  description:
    "Connect with verified local businesses in Paris, Ontario. Plumbers, electricians, landscapers, restaurants, and more. Trusted contact info for Paris and Brant County.",
  keywords: [
    "Paris Ontario",
    "local services",
    "Brant County",
    "plumber Paris ON",
    "electrician Paris ON",
    "landscaping Paris Ontario",
    "restaurants Paris Ontario",
    "snow removal Paris",
  ],
  openGraph: {
    title: "ParisLocal — Find Trusted Local Services in Paris, Ontario",
    description:
      "Connect with verified local businesses in Paris, Ontario. Plumbers, electricians, landscapers, restaurants, and more.",
    type: "website",
    locale: "en_CA",
    url: "https://parislocal.ca",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ParisLocal — Local Business Directory for Paris, Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ParisLocal — Find Trusted Local Services in Paris, Ontario",
    description: "Connect with verified local businesses in Paris, Ontario.",
    images: ["/og-image.svg"],
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
        <ConvexClientProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
