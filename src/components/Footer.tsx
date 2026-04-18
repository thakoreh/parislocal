"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Heart } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/search", label: "Search" },
  { href: "/list-your-business", label: "List Your Business" },
];

const serviceAreas = [
  "Paris",
  "Brantford",
  "Cambridge",
  "Burford",
  "St. George",
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Four-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "32px",
          }}
          className="footer-grid"
        >
          {/* Column 1: Branding */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xl font-bold"
              style={{ color: "var(--text)", textDecoration: "none" }}
            >
              <MapPin size={20} style={{ color: "var(--color-accent)" }} />
              <span>
                Paris<span style={{ color: "var(--color-accent)" }}>.</span>Local
              </span>
            </Link>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                lineHeight: "1.6",
                maxWidth: "280px",
              }}
            >
              Connecting Paris, Ontario with trusted local services since 2024.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--text)",
                margin: 0,
                letterSpacing: "0.025em",
                textTransform: "uppercase",
              }}
            >
              Quick Links
            </h3>
            <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.875rem",
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
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--text)",
                margin: 0,
                letterSpacing: "0.025em",
                textTransform: "uppercase",
              }}
            >
              Service Areas
            </h3>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {serviceAreas.map((area) => (
                <li
                  key={area}
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <MapPin size={14} style={{ flexShrink: 0 }} />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--text)",
                margin: 0,
                letterSpacing: "0.025em",
                textTransform: "uppercase",
              }}
            >
              Contact
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href="mailto:hello@parislocal.ca"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "color 0.2s ease",
                }}
              >
                <Mail size={16} style={{ flexShrink: 0 }} />
                hello@parislocal.ca
              </a>
              <a
                href="tel:+15195550100"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "color 0.2s ease",
                }}
              >
                <Phone size={16} style={{ flexShrink: 0 }} />
                (519) 555-0100
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
            margin: "32px 0 24px",
          }}
        />

        {/* Copyright */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            color: "var(--text-muted)",
            fontSize: "0.8125rem",
          }}
        >
          <span>&copy; {new Date().getFullYear()} ParisLocal. Made with</span>
          <Heart size={14} style={{ fill: "var(--color-accent)", color: "var(--color-accent)" }} />
          <span>in Paris, Ontario.</span>
        </div>
      </div>

      {/* Responsive grid via inline style tag for the 4-column layout */}
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
