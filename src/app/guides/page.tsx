"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BookOpen, ChevronRight, ArrowLeft, MapPin, Star,
} from "lucide-react";

const categoryLabels: Record<string, string> = {
  "new-resident": "New Residents",
  seasonal: "Seasonal",
  trail: "Trails & Outdoors",
  dining: "Dining",
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  "new-resident": { bg: "#dbeafe", text: "#1e40af" },
  seasonal: { bg: "#fef3c7", text: "#92400e" },
  trail: { bg: "#d1fae5", text: "#065f46" },
  dining: { bg: "#fce7f3", text: "#9d174d" },
};

export default function GuidesPage() {
  const guides = useQuery(api.guides.list) as any[] | undefined;

  const grouped = guides?.reduce((acc: Record<string, any[]>, guide: any) => {
    const cat = guide.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(guide);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div>
      <section className="hero-gradient" style={{ padding: "120px 24px 56px", position: "relative" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <span className="section-badge" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24", marginBottom: 20 }}>
            <BookOpen size={14} />
            Local Knowledge
          </span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginTop: 16, marginBottom: 16 }}>
            Paris Local Guides
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            Everything you need to know about living in and visiting Paris, Ontario.
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {!guides ? (
            <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Loading guides...</div>
          ) : guides.length > 0 ? (
            Object.entries(grouped || {}).map(([category, items]) => {
              const colors = categoryColors[category] || { bg: "#f3f4f6", text: "#374151" };
              return (
                <div key={category} style={{ marginBottom: 48 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <span style={{ padding: "6px 16px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600, background: colors.bg, color: colors.text }}>
                      {categoryLabels[category] || category}
                    </span>
                    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                  </div>
                  <div style={{ display: "grid", gap: 20 }} data-responsive="2col">
                    {items.map((guide: any) => (
                      <Link key={guide._id} href={`/guides/${guide.slug}`} style={{ textDecoration: "none" }}>
                        <div className="card" style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column" }}>
                          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{guide.title}</h3>
                          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1 }}>{guide.description}</p>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: 12 }}>
                            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-primary)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                              Read Guide <ChevronRight size={14} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="card" style={{ padding: "60px 40px", textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <BookOpen size={32} style={{ color: "var(--color-accent)" }} />
              </div>
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
