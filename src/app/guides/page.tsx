"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import {
  BookOpen, ChevronRight, ArrowRight, MapPin,
} from "lucide-react";

const categoryMeta: Record<string, { label: string; bg: string; text: string; icon: string; desc: string }> = {
  "new-resident": {
    label: "New Residents",
    bg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    text: "#1e40af",
    icon: "🏠",
    desc: "Everything you need to get settled in Paris",
  },
  seasonal: {
    label: "Seasonal",
    bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    text: "#92400e",
    icon: "🍂",
    desc: "What to do each season in Paris",
  },
  trail: {
    label: "Trails & Outdoors",
    bg: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    text: "#065f46",
    icon: "🥾",
    desc: "Explore the Grand River and beyond",
  },
  dining: {
    label: "Dining",
    bg: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
    text: "#9d174d",
    icon: "🍽️",
    desc: "Local restaurants, cafes, and hidden gems",
  },
  local: {
    label: "Local Life",
    bg: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
    text: "#3730a3",
    icon: "📍",
    desc: "Deep dives into Paris Ontario life",
  },
  events: {
    label: "Events",
    bg: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
    text: "#991b1b",
    icon: "📅",
    desc: "Community events and festivals",
  },
};

const categoryImages: Record<string, string> = {
  "new-resident": "/images/hero-paris-river.jpg",
  seasonal: "/images/paris-sunset.jpg",
  trail: "/images/grand-river.jpg",
  dining: "/images/main-street-paris.jpg",
  local: "/images/cobblestone-streets.jpg",
  events: "/images/paris-town-hall.jpg",
};

const categoryOrder = ["new-resident", "local", "trail", "dining", "seasonal", "events"];

export default function GuidesPage() {
  const guides = useQuery(api.guides.list) as any[] | undefined;

  const grouped = guides?.reduce((acc: Record<string, any[]>, guide: any) => {
    const cat = guide.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(guide);
    return acc;
  }, {} as Record<string, any[]>);

  const featured = guides?.find((g: any) => g.featured) || guides?.[0];
  const nonFeatured = guides?.filter((g: any) => g !== featured);

  return (
    <div>
      {/* Hero */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px 60px",
        background: "#1a3a32",
      }}>
        {/* Paris river background */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/hero-paris-river.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
          zIndex: 1,
        }} />
        {/* Dark overlay for text readability */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(26,58,50,0.85) 0%, rgba(13,40,32,0.9) 100%)",
          zIndex: 2,
        }} />
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(61,124,107,0.12)", pointerEvents: "none", zIndex: 3 }} />
        <div style={{ position: "absolute", bottom: -40, left: "30%", width: 200, height: 200, borderRadius: "50%", background: "rgba(61,124,107,0.08)", pointerEvents: "none", zIndex: 3 }} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", fontSize: "0.8rem", fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>
              <BookOpen size={12} style={{ display: "inline", marginRight: 4 }} />
              Local Knowledge
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.15, marginBottom: 16 }}>
            Paris, Ontario<br />Local Guides
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: 520, marginBottom: 0 }}>
            Everything you need to know about living in and visiting Paris, Ontario — written by locals, updated regularly.
          </p>
        </div>
      </section>

      {/* Featured Guide */}
      {featured && (
        <section style={{ padding: "40px 24px 0" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Featured Guide
            </div>
            <Link href={`/guides/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
                transition: "box-shadow 0.2s ease",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <div style={{
                  backgroundImage: `url('${categoryImages[featured.category] || "/images/hero-paris-river.jpg"}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: 240,
                }} />
                <div style={{ padding: "32px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span style={{
                    display: "inline-block",
                    padding: "3px 12px",
                    borderRadius: 20,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    background: categoryMeta[featured.category]?.bg || "#f3f4f6",
                    color: categoryMeta[featured.category]?.text || "#374151",
                    marginBottom: 14,
                    width: "fit-content",
                  }}>
                    {categoryMeta[featured.category]?.icon} {categoryMeta[featured.category]?.label || featured.category}
                  </span>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text)", lineHeight: 1.25, marginBottom: 12 }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
                    {featured.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-primary)", fontWeight: 600, fontSize: "0.875rem" }}>
                    Read Guide <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Guides by Category */}
      <section style={{ padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>
            All Guides
          </div>

          {!guides ? (
            <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Loading guides...</div>
          ) : guides.length > 0 ? (
            categoryOrder.map((category) => {
              const items = grouped?.[category];
              if (!items || items.length === 0) return null;
              const meta = categoryMeta[category] || {
                label: category,
                bg: "#f3f4f6",
                text: "#374151",
                icon: "📍",
                desc: "",
              };

              return (
                <div key={category} style={{ marginBottom: 48 }}>
                  {/* Category header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: meta.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      flexShrink: 0,
                    }}>
                      {meta.icon}
                    </div>
                    <div>
                      <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{meta.label}</h2>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>{meta.desc}</p>
                    </div>
                    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                  </div>

                  {/* Guide cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                    {items.map((guide: any) => (
                      <Link key={guide._id} href={`/guides/${guide.slug}`} style={{ textDecoration: "none" }}>
                        <div className="card" style={{ padding: 20, height: "100%", display: "flex", flexDirection: "column", transition: "all 0.2s ease" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(61,124,107,0.12)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.35 }}>{guide.title}</h3>
                            <ChevronRight size={16} style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: 2 }} />
                          </div>
                          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, margin: 0 }}>
                            {guide.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="card" style={{ padding: "60px 40px", textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
              <BookOpen size={32} style={{ color: "var(--color-accent)", margin: "0 auto 20px", display: "block" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>Guides coming soon</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                We&apos;re working on local guides for new residents, seasonal activities, trails, and dining. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
