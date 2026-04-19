"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import {
  Wrench, Zap, TreePine, Thermometer, Hammer, Sparkles,
  Home as HomeIcon, Paintbrush, Snowflake, Car, Truck, Trees,
  ArrowRight, Search, ChevronRight,
  Coffee, UtensilsCrossed, Scissors, Dumbbell, Scale, Building2, Smile, Heart, PawPrint,
} from "lucide-react";
import type { ConvexCategory } from "@/types/convex";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>> = {
  Wrench, Zap, TreePine, Thermometer, Hammer, Sparkles,
  Home: HomeIcon, Paintbrush, Snowflake, Car, Truck, Trees,
  UtensilsCrossed, Coffee, Scissors, Dumbbell, Scale, Building2, Smile, Heart, PawPrint,
};

export default function CategoriesPage() {
  const categories = useQuery(api.categories.list) as ConvexCategory[] | undefined;

  return (
    <div>
      <section className="hero-gradient" style={{ padding: "120px 24px 60px", position: "relative" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <span className="section-badge" style={{ marginBottom: 24, background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
            <Search size={14} />
            Browse Services
          </span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginTop: 16, marginBottom: 16 }}>
            All Service Categories
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            Browse all local services available in Paris, Ontario and surrounding areas
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {!categories ? (
            <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Loading categories...</div>
          ) : (
            <div style={{ display: "grid", gap: 20 }} data-grid="categories">
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <Link key={category.slug} href={`/categories/${category.slug}`} style={{ textDecoration: "none" }}>
                    <div className="card category-card" style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 10, background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {IconComponent && <IconComponent size={24} color="#ffffff" />}
                        </div>
                      </div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{category.name}</h3>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, marginBottom: 14 }}>{category.description}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-primary)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                          View all <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <div className="section-divider" />

      <section style={{ padding: "60px 24px" }}>
        <div className="card" style={{ maxWidth: 700, margin: "0 auto", padding: "48px 40px", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
            We&apos;re always adding new categories and businesses. Reach out to us and we&apos;ll help you find the right service provider.
          </p>
          <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
            Contact Us <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
