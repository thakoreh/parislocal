import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConvexClientProvider from "@/components/ConvexClientProvider";

export const metadata: Metadata = {
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
      "Connect with verified local businesses in Paris, Ontario.",
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
        <ConvexClientProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
