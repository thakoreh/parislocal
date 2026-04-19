"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star, Phone, Mail, Globe, MapPin, Clock, Shield, Award,
  ChevronRight, Share2, ExternalLink, CheckCircle,
} from "lucide-react";
import type { ConvexBusiness } from "@/types/convex";

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={18} className={i < fullStars ? "star-filled" : "star-empty"} fill={i < fullStars ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

export default function BusinessProfileClient() {
  const params = useParams();
  const slug = params.slug as string;

  const business = useQuery(api.businesses.getBySlug, { slug }) as ConvexBusiness | undefined | null;
  const relatedBusinesses = useQuery(api.businesses.list, business ? { categorySlug: business.categorySlug } : { categorySlug: "__none__" }) as ConvexBusiness[] | undefined;

  if (business === undefined) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "160px 24px 80px", textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      </div>
    );
  }

  if (business === null) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "160px 24px 80px", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <MapPin size={36} style={{ color: "var(--color-accent)" }} />
        </div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Business not found</h1>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32 }}>
          We could not find the business you are looking for. It may have been removed or the link may be incorrect.
        </p>
        <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>Back to Home</Link>
      </div>
    );
  }

  const filtered = relatedBusinesses?.filter((b) => b._id !== business._id) ?? [];

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 0" }}>
        <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 8 }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={14} />
          <Link href={`/categories/${business.categorySlug}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{business.categoryName}</Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--text)", fontWeight: 600 }}>{business.name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="hero-gradient" style={{ padding: "40px 24px 60px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 16 }}>
            <span className="section-badge" style={{ background: "rgba(255, 255, 255, 0.15)", color: "rgba(255, 255, 255, 0.9)" }}>
              {business.categoryName}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginBottom: 12 }}>
                {business.name}
              </h1>

              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                {business.rating && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <RatingStars rating={business.rating} />
                    <span style={{ fontSize: "1rem", fontWeight: 600, color: "#ffffff" }}>{business.rating.toFixed(1)}</span>
                    <span style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.7)" }}>
                      {business.reviewCount ? `(${business.reviewCount} reviews)` : ""}
                    </span>
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {business.verified && <span className="verified-badge"><Shield size={12} />Verified</span>}
                  {business.featured && <span className="featured-badge"><Award size={12} />Featured</span>}
                </div>
              </div>

              {(business.address || business.city) && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.7)" }}>
                  <MapPin size={16} />
                  {business.address && `${business.address}, `}{business.city}{business.province ? `, ${business.province}` : ""}
                  {business.postalCode ? ` ${business.postalCode}` : ""}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {business.phone ? (
                <a href={`tel:${business.phone.replace(/[^0-9+]/g, "")}`} className="btn-accent" style={{ textDecoration: "none" }}>
                  <Phone size={16} />
                  Call Now
                </a>
              ) : (
                <Link href="/list-your-business" className="btn-accent" style={{ textDecoration: "none" }}>
                  <Mail size={16} />
                  Contact
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section style={{ padding: "48px 24px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: 32, alignItems: "start" }} data-responsive="sidebar">
          {/* Left Column */}
          <div>
            {business.longDescription && (
              <div className="card" style={{ padding: 28, marginBottom: 24 }}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>
                  About {business.name}
                </h2>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.75 }}>{business.longDescription}</p>
              </div>
            )}

            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Services</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
                {business.services.map((service) => (
                  <div key={service} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    <CheckCircle size={16} style={{ color: "var(--color-success)", flexShrink: 0 }} />
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Source verification */}
            <div className="card" style={{ padding: 20, marginBottom: 24, background: "var(--accent-glow)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <Shield size={16} style={{ color: "var(--color-primary)" }} />
                <span>Verified via {business.source} — last checked {business.lastVerified}</span>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="card" style={{ padding: 28, background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))", border: "none" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>Contact this business</h2>
              <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: 20, lineHeight: 1.6 }}>
                Reach out directly to {business.name} for a free quote or to schedule a service.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {business.phone && (
                  <a href={`tel:${business.phone.replace(/[^0-9+]/g, "")}`} className="btn-accent" style={{ textDecoration: "none" }}>
                    <Phone size={16} />{business.phone}
                  </a>
                )}
                {business.email && (
                  <a href={`mailto:${business.email}`} style={{ background: "rgba(255, 255, 255, 0.15)", color: "#ffffff", padding: "10px 24px", borderRadius: 8, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255, 255, 255, 0.25)", textDecoration: "none" }}>
                    <Mail size={16} />Send Email
                  </a>
                )}
                {business.website && (
                  <a href={business.website} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255, 255, 255, 0.15)", color: "#ffffff", padding: "10px 24px", borderRadius: 8, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255, 255, 255, 0.25)", textDecoration: "none" }}>
                    <Globe size={16} />Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            <div className="card" style={{ padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Contact Information</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {business.phone && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <Phone size={18} style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 2 }}>Phone</div>
                      <a href={`tel:${business.phone.replace(/[^0-9+]/g, "")}`} style={{ color: "var(--text)", fontWeight: 500, textDecoration: "none" }}>{business.phone}</a>
                    </div>
                  </div>
                )}
                {business.email && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <Mail size={18} style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 2 }}>Email</div>
                      <a href={`mailto:${business.email}`} style={{ color: "var(--text)", fontWeight: 500, textDecoration: "none", fontSize: "0.9rem", wordBreak: "break-all" }}>{business.email}</a>
                    </div>
                  </div>
                )}
                {business.address && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <MapPin size={18} style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 2 }}>Address</div>
                      <span style={{ color: "var(--text)", fontWeight: 500 }}>{business.address}, {business.city}, {business.province}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hours */}
            {business.hours && business.hours.length > 0 && (
              <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
                  <Clock size={16} style={{ marginRight: 8, verticalAlign: "middle" }} />
                  Business Hours
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {business.hours.map((h) => (
                    <div key={h.day} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                      <span style={{ color: "var(--text)", fontWeight: 500 }}>{h.day}</span>
                      <span style={{ color: "var(--text-secondary)" }}>{h.open}{h.close ? ` – ${h.close}` : ""}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Tags</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {business.tags.map((tag) => (
                  <span key={tag} className="service-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Businesses */}
      {filtered.length > 0 && (
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>
              More {business.categoryName}
            </h2>
            <div style={{ display: "grid", gap: 20 }} data-responsive="3col">
              {filtered.slice(0, 3).map((b) => (
                <Link key={b._id} href={`/businesses/${b.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{b.name}</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{b.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
