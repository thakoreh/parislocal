"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
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

interface GuideDetailClientProps {
  slug: string;
}

export default function GuideDetailClient(props: GuideDetailClientProps) {
  const { slug } = props;
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

  // Parse and render guide content — supports both markdown and HTML template literal formats
  const renderContent = (content: string) => {
    // Strip leading indentation from template literals (e.g. "    <h2>" → "<h2>")
    const cleaned = content.replace(/^\n/, "").replace(/(\n)[ \t]+</g, "$1<");

    // Detect HTML format: content starts with block-level HTML tag after trimming
    if (/^\s*<(h[1-6]|p|ul|ol|li|blockquote|div)/.test(cleaned)) {
      // Render HTML blocks with proper styling wrapper
      const blockStyle = { fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 8 };
      const h2Style = { fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginTop: 40, marginBottom: 16, lineHeight: 1.3 };
      const h3Style = { fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", marginTop: 28, marginBottom: 12, lineHeight: 1.4 };
      const pStyle = { fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 };
      const liStyle = { fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 8, marginLeft: 20 };

      // Split into blocks: handle each top-level tag
      const blockRegex = /<\/?(h[1-6]|p|ul|ol|li|blockquote|div|strong|em|a|br)(?:\s[^>]*)?>[\s\S]*?(?=<\/?(?:h[1-6]|p|ul|ol|li|blockquote|div|strong|em|a|br)(?:\s[^>]*)?>|$)/g;
      const blocks = cleaned.match(blockRegex) || [cleaned];

      return blocks.map((block: string, i: number) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith("<h2")) {
          const inner = trimmed.replace(/<h2[^>]*>([\s\S]*)<\/h2>/i, "$1").trim();
          return <h2 key={i} style={h2Style}>{inner}</h2>;
        }
        if (trimmed.startsWith("<h3")) {
          const inner = trimmed.replace(/<h3[^>]*>([\s\S]*)<\/h3>/i, "$1").trim();
          return <h3 key={i} style={h3Style}>{inner}</h3>;
        }
        if (trimmed.startsWith("<p")) {
          const inner = trimmed.replace(/<p[^>]*>([\s\S]*)<\/p>/i, "$1").trim();
          return <p key={i} style={pStyle}>{inner}</p>;
        }
        if (trimmed.startsWith("<li")) {
          return <li key={i} style={liStyle} dangerouslySetInnerHTML={{ __html: trimmed.replace(/<\/?li[^>]*>/gi, "") }} />;
        }
        if (trimmed.startsWith("<ul") || trimmed.startsWith("<ol")) {
          return <ul key={i} style={{ ...liStyle, marginLeft: 0 }} dangerouslySetInnerHTML={{ __html: trimmed }} />;
        }
        if (trimmed.startsWith("<blockquote")) {
          const inner = trimmed.replace(/<blockquote[^>]*>([\s\S]*)<\/blockquote>/i, "$1").trim();
          return <blockquote key={i} style={{ borderLeft: "4px solid var(--color-primary)", paddingLeft: 16, margin: "24px 0", color: "var(--text-secondary)", fontStyle: "italic" }} dangerouslySetInnerHTML={{ __html: inner }} />;
        }
        if (/<(strong|b)>/i.test(trimmed)) {
          return <p key={i} style={pStyle} dangerouslySetInnerHTML={{ __html: trimmed }} />;
        }
        // Fallback: render as paragraph
        return <p key={i} style={pStyle}>{trimmed}</p>;
      });
    }

    // Markdown format (legacy)
    return cleaned.split("\n").map((line: string, i: number) => {
      if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginTop: 32, marginBottom: 16 }}>{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", marginTop: 24, marginBottom: 12 }}>{line.slice(4)}</h3>;
      if (line.startsWith("- **")) {
        const match = line.match(/^- \*\*(.+?)\*\*\s*(.*)/);
        if (match) return <li key={i} style={{ marginLeft: 20, marginBottom: 6, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}><strong style={{ color: "var(--text)" }}>{match[1]}</strong>{match[2]}</li>;
      }
      if (line.startsWith("- ")) return <li key={i} style={{ marginLeft: 20, marginBottom: 6, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{line.slice(2)}</li>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={{ fontWeight: 600, color: "var(--text)", marginTop: 16, marginBottom: 8 }}>{line.slice(2, -2)}</p>;
      if (line.trim() === "") return null;
      return <p key={i} style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 8 }}>{line}</p>;
    });
  };

  return (
    <div>
      {/* Hero section with Paris imagery */}
      <div style={{
        position: "relative",
        height: 280,
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%), url('/images/hero-paris-river.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
        padding: "0 24px 40px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", width: "100%" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", marginBottom: 12 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} />
            <Link href="/guides" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>Guides</Link>
            <ChevronRight size={12} />
            <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>{guide.title}</span>
          </nav>
          <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 600, background: "rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(8px)", marginBottom: 12 }}>
            {categoryLabels[guide.category] || guide.category}
          </span>
          <h1 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.1rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, maxWidth: 700 }}>
            {guide.title}
          </h1>
        </div>
      </div>

      <section style={{ padding: "40px 24px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 32 }}>
            {guide.description}
          </p>
          <div className="guide-content">
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
