import { Metadata } from "next";
import BusinessProfileClient from "./BusinessProfileClient";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
const BASE_URL = "https://parislocal.ca";

async function getBusiness(slug: string) {
  try {
    const res = await fetch(`${CONVEX_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "businesses:getBySlug", args: { slug } }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const { value } = await res.json();
    return value ?? null;
  } catch {
    return null;
  }
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusiness(slug);

  if (!business) {
    return { title: "Business Not Found — ParisLocal" };
  }

  const title = `${business.name} — ${business.categoryName} in Paris, Ontario | ParisLocal`;
  const description = business.longDescription
    ? business.longDescription.slice(0, 160)
    : `${business.name} — ${business.description}. Verified local ${business.categoryName?.toLowerCase()} in Paris, Ontario.`;
  const url = `${BASE_URL}/businesses/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "en_CA",
      siteName: "ParisLocal",
    },
    alternates: { canonical: url },
  };
}

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params;
  const business = await getBusiness(slug);

  const jsonLd = business
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: business.name,
        description: business.description,
        url: `${BASE_URL}/businesses/${slug}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address || "",
          addressLocality: business.city || "Paris",
          addressRegion: business.province || "ON",
          postalCode: business.postalCode || "",
          addressCountry: "CA",
        },
        ...(business.phone && { telephone: business.phone }),
        ...(business.email && { email: business.email }),
        ...(business.website && { sameAs: [business.website] }),
        ...(business.rating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: business.rating,
            bestRating: 5,
            ...(business.reviewCount && { reviewCount: business.reviewCount }),
          },
        }),
        ...(business.hours && business.hours.length > 0 && {
          openingHoursSpecification: business.hours.map((h: { day: string; open: string; close: string }) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.day,
            opens: h.open,
            closes: h.close,
          })),
        }),
        image: `${BASE_URL}/og-business.png`,
        priceRange: "$$",
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BusinessProfileClient />
    </>
  );
}
