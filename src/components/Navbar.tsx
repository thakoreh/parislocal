"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, MapPin } from "lucide-react";

const navLinks = [
  { href: "/categories", label: "Categories" },
  { href: "/events", label: "Events" },
  { href: "/guides", label: "Guides" },
  { href: "/search", label: "Search", icon: Search },
  { href: "/emergency", label: "Emergency" },
  { href: "/list-your-business", label: "List Your Business", highlight: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav className="glass-nav" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "border-color 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <MapPin size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 800, color: "var(--text)" }}>
            Paris<span style={{ color: "var(--primary)" }}>.</span>Local
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ alignItems: "center", gap: 2 }}>
          {navLinks.map((link) => (
            link.highlight ? (
              <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ fontSize: "0.8rem", padding: "7px 16px", borderRadius: 8 }}>
                  {link.label}
                </button>
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.875rem", fontWeight: 500,
                  color: "var(--text-secondary)", textDecoration: "none",
                  padding: "8px 14px", borderRadius: 8,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--primary)"; e.currentTarget.style.background = "rgba(99, 102, 241, 0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; }}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none", alignItems: "center", justifyContent: "center",
            width: 40, height: 40, borderRadius: 10,
            border: "1px solid var(--border)", background: "var(--bg-white)",
            cursor: "pointer", color: "var(--text)",
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position: "fixed", inset: 0, top: 64, background: "rgba(15, 23, 42, 0.4)", zIndex: 49, backdropFilter: "blur(4px)" }}
          />
          <div style={{
            position: "fixed", top: 64, left: 0, right: 0,
            background: "var(--bg-white)", borderBottom: "1px solid var(--border)",
            zIndex: 50, padding: "12px 20px 20px",
            animation: "fadeIn 0.2s ease",
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "14px 16px", borderRadius: 12,
                  fontSize: "1rem", fontWeight: 500,
                  color: link.highlight ? "var(--primary)" : "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  background: link.highlight ? "rgba(99, 102, 241, 0.06)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}
