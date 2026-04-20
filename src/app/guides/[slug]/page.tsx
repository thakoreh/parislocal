import { Metadata } from "next";
import { api } from "../../../../convex/_generated/api";
import { fetchQuery } from "convex/next";
import GuideDetailClient from "./GuideDetailClient";

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
  return <GuideDetailClient slug={slug} />;
}
