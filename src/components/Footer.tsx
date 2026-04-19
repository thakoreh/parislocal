"use client";

import Link from "next/link";
import { MapPin, Mail, Heart } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/events", label: "Events" },
  { href: "/guides", label: "Guides" },
  { href: "/search", label: "Search" },
  { href: "/emergency", label: "Emergency" },
  { href: "/list-your-business", label: "List Your Business" },
  { href: "/contact", label: "Contact" },
];

const areas = ["Paris, Ontario"];

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 32px" }}>
        {/* Top grid */}
        <div className="footer-grid" style={{ display: "grid", gap: 40, gridTemplateColumns: "1fr" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--primary), var(--primary-light))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>
                Paris<span style={{ color: "#818cf8" }}>.</span>Local
              </span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: 280 }}>
              Your community directory for Paris, Ontario. Connecting neighbours with trusted local businesses.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
              {areas.map((a) => (
                <span key={a} style={{ fontSize: "0.7rem", color: "#64748b", padding: "3px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)" }}>{a}</span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Explore</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              {links.map((l) => (
                <Link key={l.href} href={l.href} style={{ color: "#94a3b8", fontSize: "0.85rem", textDecoration: "none" }}>{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="mailto:hello@parislocal.ca" style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: "0.85rem", textDecoration: "none" }}>
                <Mail size={14} style={{ color: "#64748b" }} /> hello@parislocal.ca
              </a>
              <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: "0.85rem" }}>
                <MapPin size={14} style={{ color: "#64748b" }} /> Paris, Ontario, Canada
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 40, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "#475569", fontSize: "0.8rem" }}>
            &copy; {new Date().getFullYear()} ParisLocal. All rights reserved.
          </span>
          <span style={{ color: "#475569", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 4 }}>
            Made with <Heart size={12} style={{ color: "#818cf8" }} /> in Paris, ON
          </span>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .footer-grid { grid-template-columns: 1.2fr 1fr 0.8fr; }
        }
      `}</style>
    </footer>
  );
}
