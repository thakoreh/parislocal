"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, MapPin, Sun, Moon } from "lucide-react";

const navLinks = [
  { href: "/categories", label: "Categories" },
  { href: "/events", label: "Events" },
  { href: "/guides", label: "Guides" },
  { href: "/search", label: "Search", icon: Search },
  { href: "/emergency", label: "Emergency" },
  { href: "/list-your-business", label: "List Your Business" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xl font-bold"
            style={{ color: "var(--text)" }}
          >
            <MapPin size={20} style={{ color: "var(--color-accent)" }} />
            <span>
              Paris<span style={{ color: "var(--color-accent)" }}>.</span>Local
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-primary)";
                  e.currentTarget.style.background = "var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.icon && <link.icon size={16} />}
                {link.label}
              </Link>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors ml-1"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
                e.currentTarget.style.background = "var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.background = "transparent";
              }}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="mobile-hamburger items-center gap-2" style={{ display: "none" }}>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-lg"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-lg"
              style={{ color: "var(--text)" }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="animate-fade-in"
          style={{
            background: "var(--bg-card)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.icon && <link.icon size={16} />}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
