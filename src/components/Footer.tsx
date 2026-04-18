"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Heart, Leaf } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Browse Categories" },
  { href: "/events", label: "Local Events" },
  { href: "/guides", label: "Guides" },
  { href: "/search", label: "Search" },
  { href: "/list-your-business", label: "List Your Business" },
];

const serviceAreas = [
  "Paris",
  "Brantford",
  "Cambridge",
  "Burford",
  "St. George",
  "Scotland",
  "Mt. Pleasant",
  "Glen Morris",
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
          }}
          className="footer-grid"
        >
          {/* Column 1: Branding */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link
              href="/"
              style={{ textDecoration: "none" }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Leaf size={22} style={{ color: "#fbbf24" }} />
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#ffffff",
                }}>
                  Paris<span style={{ color: "#fbbf24" }}>.</span>Local
                </span>
              </span>
            </Link>
            <p
              style={{
                color: "rgba(250, 248, 244, 0.7)",
                fontSize: "0.9rem",
                lineHeight: "1.7",
                maxWidth: "300px",
              }}
            >
              Your community directory for Paris, Ontario. Connecting neighbours
              with trusted local businesses since 2024.
            </p>
            <p style={{
              color: "rgba(250, 248, 244, 0.5)",
              fontSize: "0.8rem",
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
            }}>
              &ldquo;The Prettiest Town in Canada&rdquo;
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#fbbf24",
                margin: 0,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Explore
            </h3>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "rgba(250, 248, 244, 0.7)",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Service Areas */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#fbbf24",
                margin: 0,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Service Areas
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  style={{
                    color: "rgba(250, 248, 244, 0.6)",
                    fontSize: "0.8rem",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    border: "1px solid rgba(250, 248, 244, 0.1)",
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#fbbf24",
                margin: 0,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Get in Touch
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href="mailto:hello@parislocal.ca"
                style={{
                  color: "rgba(250, 248, 244, 0.7)",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Mail size={16} style={{ color: "#fbbf24", flexShrink: 0 }} />
                hello@parislocal.ca
              </a>
              <a
                href="/contact"
                style={{
                  color: "rgba(250, 248, 244, 0.7)",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <MapPin size={16} style={{ color: "#fbbf24", flexShrink: 0 }} />
                Paris, Ontario, Canada
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(250, 248, 244, 0.1)",
            margin: "40px 0 24px",
          }}
        />

        {/* Copyright */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            color: "rgba(250, 248, 244, 0.5)",
            fontSize: "0.8rem",
          }}
        >
          <span>&copy; {new Date().getFullYear()} ParisLocal</span>
          <span>·</span>
          <span>Made with</span>
          <Heart size={12} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
          <span>in Paris, Ontario</span>
        </div>
      </div>

      <style>{`
        .footer-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 769px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr 1fr;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </footer>
  );
}
