import { Metadata } from "next";
import CategoryDetailClient from "./CategoryDetailClient";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
const BASE_URL = "https://parislocal.ca";

async function getCategory(slug: string) {
  try {
    const res = await fetch(`${CONVEX_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "categories:getBySlug", args: { slug } }),
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
  const category = await getCategory(slug);

  if (!category) {
    return { title: "Category Not Found — ParisLocal" };
  }

  const title = `${category.name} in Paris, Ontario — Local Directory | ParisLocal`;
  const description = category.description
    ? category.description.slice(0, 160)
    : `Find trusted ${category.name.toLowerCase()} in Paris, Ontario. Verified local businesses with contact info, hours, and reviews.`;
  const url = `${BASE_URL}/categories/${slug}`;

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

export default function CategoryPage() {
  return <CategoryDetailClient />;
}
