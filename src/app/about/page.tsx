import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Store,
  Megaphone,
  Heart,
  Users,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "About Us - ParisLocal",
  description:
    "Learn about ParisLocal — a local business directory built for Paris, Ontario by the people who live here.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero-gradient" style={{ padding: "120px 24px 60px", position: "relative" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <span className="section-badge">About Us</span>
          <h1 style={{ marginTop: 16, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.2 }}>
            Built for Paris, by Paris
          </h1>
          <p
            style={{
              maxWidth: "640px",
              margin: "16px auto 0",
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
            }}
          >
            A local business directory created by the people who live and work here.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Our Story */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
            Our Story
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}>
            ParisLocal was created to solve a simple problem &mdash; finding
            trusted local services in small-town Ontario shouldn&rsquo;t
            require scrolling through Toronto-based directories or relying on
            Facebook posts from 2019.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Mission Cards */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.75rem", marginBottom: "0.5rem" }}>
            Who We Serve
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
              marginBottom: "2.5rem",
            }}
          >
            ParisLocal exists for three groups of people.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* For Residents */}
            <div className="card" style={{ padding: "2rem" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius)",
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Search size={24} style={{ color: "var(--primary)" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                For Residents
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}>
                Easy search and verified reviews make it simple to find the
                right local service without the guesswork.
              </p>
            </div>

            {/* For Businesses */}
            <div className="card" style={{ padding: "2rem" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius)",
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Store size={24} style={{ color: "var(--primary)" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                For Businesses
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}>
                Free listings and direct leads help local businesses reach the
                people who are actually looking for their services.
              </p>
            </div>

            {/* For the Community */}
            <div className="card" style={{ padding: "2rem" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius)",
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Heart size={24} style={{ color: "var(--primary)" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                For the Community
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}>
                Keeping money local and supporting neighbors strengthens the
                entire town &mdash; and that benefits everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Team / Values */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
            }}
          >
            <Users size={24} style={{ color: "var(--primary)" }} />
          </div>
          <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
            Our Values
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}>
            Founded in 2024 by local residents who believe small towns deserve
            better tools. We value transparency, community trust, and keeping
            things simple. Every feature we build starts with the question:
            does this help someone in Paris, Ontario?
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* CTA */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            className="card"
            style={{
              padding: "2.5rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                Ready to find local services?
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Search our directory of trusted Paris businesses.
              </p>
              <Link href="/categories" className="btn-primary" style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Browse Categories <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                Are you a business?
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Get your business listed for free and connect with local customers.
              </p>
              <Link href="/list-your-business" className="btn-secondary" style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                List Your Business <Megaphone size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
