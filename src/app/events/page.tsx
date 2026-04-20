"use client";

import { useQuery } from "convex/react";

export const metadata = {
  title: "Local Events in Paris, Ontario — ParisLocal",
  description: "Find upcoming events and community activities in Paris, Ontario and Brant County.",
  openGraph: {
    title: "Local Events — ParisLocal",
    description: "Find upcoming events in Paris, Ontario.",
    images: ["/og-image.svg"],
  },
};
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import {
  Calendar, MapPin, Clock, ExternalLink, ChevronRight,
} from "lucide-react";

const categoryColors: Record<string, { bg: string; text: string }> = {
  festival: { bg: "#fef3c7", text: "#92400e" },
  market: { bg: "#d1fae5", text: "#065f46" },
  community: { bg: "#dbeafe", text: "#1e40af" },
  sports: { bg: "#fce7f3", text: "#9d174d" },
};

const categoryLabels: Record<string, string> = {
  festival: "Festival",
  market: "Market",
  community: "Community",
  sports: "Sports",
};

export default function EventsPage() {
  const events = useQuery(api.events.getUpcoming, {}) as any[] | undefined;
  const featured = useQuery(api.events.getFeatured, {}) as any[] | undefined;

  return (
    <div>
      <section className="hero-gradient" style={{ padding: "120px 24px 56px", position: "relative" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <span className="section-badge" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24", marginBottom: 20 }}>
            <Calendar size={14} />
            What's Happening
          </span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginTop: 16, marginBottom: 16 }}>
            Local Events &amp; Activities
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            Discover upcoming events, festivals, markets, and community gatherings in Paris, Ontario.
          </p>
        </div>
      </section>

      {/* Featured Events */}
      {featured && featured.length > 0 && (
        <section style={{ padding: "48px 24px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Featured Events</h2>
            <div style={{ display: "grid", gap: 24 }} data-responsive="2col">
              {featured.map((event: any) => {
                const colors = categoryColors[event.category] || categoryColors.community;
                return (
                  <div key={event._id} className="card" style={{ padding: 0, overflow: "hidden" }}>
                    <div style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))", padding: "24px 28px" }}>
                      <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, background: colors.bg, color: colors.text, marginBottom: 12 }}>
                        {categoryLabels[event.category] || event.category}
                      </span>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>{event.title}</h3>
                      <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.6 }}>{event.description}</p>
                    </div>
                    <div style={{ padding: "20px 28px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                          <Calendar size={16} style={{ color: "var(--color-primary)" }} />
                          {new Date(event.date).toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                          {event.time && ` at ${event.time}`}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                          <MapPin size={16} style={{ color: "var(--color-primary)" }} />
                          {event.location}
                        </div>
                      </div>
                      {event.website && (
                        <a href={event.website} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, fontSize: "0.85rem", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}>
                          More Info <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section style={{ padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>All Upcoming Events</h2>
          {!events ? (
            <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Loading events...</div>
          ) : events.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {events.map((event: any) => {
                const colors = categoryColors[event.category] || categoryColors.community;
                const d = new Date(event.date);
                return (
                  <div key={event._id} className="card" style={{ padding: 24, display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 72, textAlign: "center", padding: "12px 8px", borderRadius: 12, background: "var(--accent-glow)", flexShrink: 0 }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: 1 }}>
                        {d.toLocaleDateString("en-CA", { month: "short" })}
                      </div>
                      <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text)", lineHeight: 1.2 }}>
                        {d.getDate()}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>{event.title}</h3>
                        <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: "0.7rem", fontWeight: 600, background: colors.bg, color: colors.text }}>
                          {categoryLabels[event.category] || event.category}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 10 }}>{event.description}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: "0.8rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Clock size={14} />{event.time || "TBD"}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <MapPin size={14} />{event.location}
                        </span>
                        {event.website && (
                          <a href={event.website} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-primary)", textDecoration: "none" }}>
                            <ExternalLink size={14} />Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card" style={{ padding: "60px 40px", textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Calendar size={32} style={{ color: "var(--color-accent)" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>No upcoming events</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Check back soon for new events in Paris, Ontario. Have an event to share?
              </p>
              <Link href="/contact" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", marginTop: 20 }}>
                Submit an Event <ChevronRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
