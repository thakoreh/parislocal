"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import {
  Wrench,
  Zap,
  TreePine,
  Thermometer,
  Hammer,
  Sparkles,
  Home as HomeIcon,
  Paintbrush,
  Snowflake,
  Car,
  Truck,
  Trees,
  Star,
  MapPin,
  CheckCircle,
  ChevronRight,
  Filter,
  Coffee,
  UtensilsCrossed,
  Scissors,
  Dumbbell,
  Scale,
  Building2,
  Smile,
  Heart,
  PawPrint,
} from "lucide-react";
import { useParams } from "next/navigation";
import type { ConvexBusiness, ConvexCategory } from "@/types/convex";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>> = {
  Wrench, Zap, TreePine, Thermometer, Hammer, Sparkles,
  Home: HomeIcon, Paintbrush, Snowflake, Car, Truck, Trees,
  UtensilsCrossed, Coffee, Scissors, Dumbbell, Scale, Building2, Smile, Heart, PawPrint,
};

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className={i < fullStars ? "star-filled" : "star-empty"} fill={i < fullStars ? "currentColor" : "none"} />
      ))}
      <span style={{ marginLeft: 6, fontSize: "0.85rem", fontWeight: 600, color: "var(--text)" }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function CategoryDetailClient() {
  const params = useParams();
  const slug = params.slug as string;

  const categories = useQuery(api.categories.list) as ConvexCategory[] | undefined;
  const category = categories?.find((c) => c.slug === slug);
  const businesses = useQuery(api.businesses.list, { categorySlug: slug }) as ConvexBusiness[] | undefined;

  if (!categories || !businesses) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "160px 24px 80px", textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "160px 24px 80px", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Category not found</h1>
        <Link href="/categories" className="btn-primary" style={{ textDecoration: "none" }}>Browse All Categories</Link>
      </div>
    );
  }

  const IconComponent = iconMap[category.icon];

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 0" }}>
        <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 8 }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/categories" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Categories</Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--text)", fontWeight: 600 }}>{category.name}</span>
        </nav>
      </div>

      {/* Category Header */}
      <section className="hero-gradient" style={{ padding: "40px 24px 60px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
            <div
              style={{
                width: 64, height: 64, borderRadius: 14,
                background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-light))",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}
            >
              {IconComponent && <IconComponent size={32} color="#1a1a2e" />}
            </div>
            <div>
              <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginBottom: 8 }}>
                {category.name}
              </h1>
              <p style={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6, maxWidth: 600 }}>
                {category.description}
              </p>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <span style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.7)", fontWeight: 500 }}>
              {businesses.length} {businesses.length === 1 ? "business" : "businesses"} listed
            </span>
          </div>
        </div>
      </section>

      {/* Business Listings */}
      <section style={{ padding: "60px 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {businesses.length > 0 ? (
            <div style={{ display: "grid", gap: 24 }} data-responsive="2col">
              {businesses.map((business) => (
                <div key={business._id} className="card" style={{ padding: 24, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>{business.name}</h3>
                        {business.verified && (
                          <span className="verified-badge"><CheckCircle size={12} />Listed</span>
                        )}
                      </div>
                      {business.rating && (
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <RatingStars rating={business.rating} />
                          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                            {business.reviewCount ? `(${business.reviewCount} reviews)` : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 14, flex: 1 }}>
                    {business.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {business.services.slice(0, 4).map((service) => (
                      <span key={service} className="service-tag">{service}</span>
                    ))}
                    {business.services.length > 4 && (
                      <span className="service-tag" style={{ color: "var(--color-primary)" }}>
                        +{business.services.length - 4} more
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      <MapPin size={14} />
                      {business.city}, {business.province}
                    </div>
                    <Link href={`/businesses/${business.slug}`} className="btn-primary" style={{ textDecoration: "none", fontSize: "0.85rem", padding: "8px 18px" }}>
                      View Profile
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: "60px 40px", textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                {IconComponent && <IconComponent size={32} style={{ color: "var(--color-accent)" }} />}
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>
                No businesses listed yet in this category
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
                Be the first! List your business and connect with local customers looking for {category.name.toLowerCase()} services.
              </p>
              <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
                List Your Business <ChevronRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
