"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, BookOpen } from "lucide-react";

const categoryColors: Record<string, { bg: string; text: string }> = {
  "new-resident": { bg: "#dbeafe", text: "#1e40af" },
  seasonal: { bg: "#fef3c7", text: "#92400e" },
  trail: { bg: "#d1fae5", text: "#065f46" },
  dining: { bg: "#fce7f3", text: "#9d174d" },
};

const categoryLabels: Record<string, string> = {
  "new-resident": "New Residents",
  seasonal: "Seasonal",
  trail: "Trails & Outdoors",
  dining: "Dining",
};

export default function GuideDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const guide = useQuery(api.guides.getBySlug, { slug }) as any | undefined | null;

  if (guide === undefined) {
    return <div style={{ maxWidth: 600, margin: "0 auto", padding: "160px 24px 80px", textAlign: "center", color: "var(--text-muted)" }}>Loading...</div>;
  }

  if (guide === null) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "160px 24px 80px", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Guide not found</h1>
        <Link href="/guides" className="btn-primary" style={{ textDecoration: "none" }}>Browse All Guides</Link>
      </div>
    );
  }

  const colors = categoryColors[guide.category] || { bg: "#f3f4f6", text: "#374151" };

  // Simple markdown-to-HTML rendering for the guide content
  const renderContent = (md: string) => {
    return md.split("\n").map((line: string, i: number) => {
      if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginTop: 32, marginBottom: 16 }}>{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", marginTop: 24, marginBottom: 12 }}>{line.slice(4)}</h3>;
      if (line.startsWith("- **")) {
        const match = line.match(/^- \*\*(.+?)\*\*\s*(.*)/);
        if (match) return <li key={i} style={{ marginLeft: 20, marginBottom: 6, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}><strong style={{ color: "var(--text)" }}>{match[1]}</strong>{match[2]}</li>;
      }
      if (line.startsWith("- ")) return <li key={i} style={{ marginLeft: 20, marginBottom: 6, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{line.slice(2)}</li>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={{ fontWeight: 600, color: "var(--text)", marginTop: 16, marginBottom: 8 }}>{line.slice(2, -2)}</p>;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 8 }}>{line}</p>;
    });
  };

  return (
    <div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px 0" }}>
        <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 8 }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/guides" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Guides</Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--text)", fontWeight: 600 }}>{guide.title}</span>
        </nav>
      </div>

      <section style={{ padding: "40px 24px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, background: colors.bg, color: colors.text, marginBottom: 16 }}>
            {categoryLabels[guide.category] || guide.category}
          </span>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, color: "var(--text)", lineHeight: 1.2, marginBottom: 16 }}>
            {guide.title}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32 }}>
            {guide.description}
          </p>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32 }}>
            {renderContent(guide.content)}
          </div>
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
            <Link href="/guides" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-primary)", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}>
              <ArrowLeft size={16} />Back to All Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
