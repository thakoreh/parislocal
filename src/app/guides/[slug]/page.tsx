import { Metadata } from "next";
import { api } from "../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import GuideDetailClient from "./GuideDetailClient";
import { Script } from "next/script";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const guide = await fetchQuery(api.guides.getBySlug, { slug });
    if (!guide) return { title: "Guide Not Found — ParisLocal" };
    return {
      title: `${guide.title} — ParisLocal Local Guides`,
      description: guide.description,
      openGraph: {
        title: `${guide.title} — ParisLocal`,
        description: guide.description,
        images: ["/og-image.svg"],
      },
    };
  } catch {
    return { title: "Guide — ParisLocal" };
  }
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  let guideData: any = null;
  try {
    guideData = await fetchQuery(api.guides.getBySlug, { slug });
  } catch {
    // guide data unavailable at build time
  }

  return (
    <>
      {guideData && (
        <Script
          id="guide-article-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": guideData.title,
              "description": guideData.description,
              "image": "/og-image.svg",
              "author": {
                "@type": "Organization",
                "name": "ParisLocal",
                "url": "https://parislocal.ca"
              },
              "publisher": {
                "@type": "Organization",
                "name": "ParisLocal",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://parislocal.ca/og-image.svg"
                }
              },
              "datePublished": guideData._creationTime
                ? new Date(guideData._creationTime / 1000).toISOString()
                : undefined,
              "dateModified": guideData.lastUpdated ?? undefined,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://parislocal.ca/guides/${slug}`
              }
            })
          }}
        />
      )}
      <GuideDetailClient slug={slug} />
    </>
  );
}
