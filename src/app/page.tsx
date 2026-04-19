"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Wrench, Zap, TreePine, Thermometer, Hammer, Sparkles,
  Home as HomeIcon, Paintbrush, Snowflake, Car, Truck, Trees,
  ArrowRight, MapPin, Star, Phone, Shield, Search,
  Users, CheckCircle, Coffee, UtensilsCrossed, Scissors,
  Dumbbell, Scale, Building2, Smile, Heart, PawPrint,
} from "lucide-react";
import { useRouter } from "next/navigation";
import FAQSection from "@/components/FAQSection";
import type { ConvexBusiness, ConvexCategory } from "@/types/convex";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>> = {
  Wrench, Zap, TreePine, Thermometer, Hammer, Sparkles,
  Home: HomeIcon, Paintbrush, Snowflake, Car, Truck, Trees,
  UtensilsCrossed, Coffee, Scissors, Dumbbell, Scale, Building2, Smile, Heart, PawPrint,
};

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className={i < fullStars ? "star-filled" : "star-empty"} fill={i < fullStars ? "currentColor" : "none"} />
      ))}
      <span style={{ marginLeft: 6, fontSize: "0.85rem", fontWeight: 600, color: "var(--text)" }}>{rating.toFixed(1)}</span>
    </div>
  );
}

export default function Home() {
  const categories = useQuery(api.categories.list) as ConvexCategory[] | undefined;
  const featuredBusinesses = useQuery(api.businesses.getFeatured, {}) as ConvexBusiness[] | undefined;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const router = useRouter();

  const allBusinesses = useQuery(api.businesses.list, {}) as ConvexBusiness[] | undefined;
  const totalBusinesses = allBusinesses?.length ?? 200;

  return (
    <div>
      {/* ===== HERO ===== */}
      <section
        className="hero-gradient"
        style={{
          padding: "140px 24px 100px",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Decorative glow */}
        <div style={{
          position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 3 }}>
          <span className="section-badge" style={{
            background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc",
            border: "1px solid rgba(99, 102, 241, 0.2)",
          }}>
            <MapPin size={14} />
            Paris, Ontario &amp; Brant County
          </span>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            marginTop: 20,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}>
            Find Trusted Local Services
            <br />
            <span style={{ background: "linear-gradient(135deg, #818cf8, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              In Your Neighbourhood
            </span>
          </h1>

          <p style={{
            fontSize: "1.05rem",
            color: "rgba(255, 255, 255, 0.65)",
            lineHeight: 1.7,
            maxWidth: 540,
            margin: "0 auto 36px",
          }}>
            Plumbers, electricians, restaurants, and 50+ more services — all verified, all local.
          </p>

          {/* Search Bar */}
          <div className="search-container" style={{
            display: "flex", alignItems: "center", gap: 4, padding: 6,
            background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, paddingLeft: 14 }}>
              <Search size={18} style={{ color: "rgba(255,255,255,0.4)" }} />
              <input
                type="text"
                placeholder="What service do you need?"
                className="input-field"
                style={{
                  border: "none", boxShadow: "none", background: "transparent",
                  padding: "10px 0", color: "#fff",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") router.push(`/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`);
                }}
              />
            </div>
            <select
              className="input-field"
              style={{
                width: "auto", border: "none", boxShadow: "none",
                background: "transparent", padding: "10px 12px",
                borderLeft: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 0, cursor: "pointer", minWidth: 110,
                color: "rgba(255,255,255,0.6)", fontSize: "0.875rem",
              }}
              defaultValue=""
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            >
              <option value="" disabled>Location</option>
              <option value="Paris">Paris</option>
              <option value="Brantford">Brantford</option>
              <option value="Cambridge">Cambridge</option>
              <option value="Burford">Burford</option>
              <option value="St. George">St. George</option>
            </select>
            <button className="btn-primary" style={{ borderRadius: 8 }} onClick={() => router.push(`/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`)}>
              Search
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginTop: 48 }}>
            {[
              { number: `${totalBusinesses}+`, label: "Businesses" },
              { number: "20", label: "Service Categories" },
              { number: "12", label: "Service Areas" },
              { number: "100%", label: "Free to Use" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div className="stat-number" style={{ fontSize: "1.5rem", fontWeight: 800 }}>{stat.number}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)" }}>
              Browse by Category
            </h2>
            <p style={{ color: "var(--text-muted)", marginTop: 8, fontSize: "0.95rem" }}>
              Find the right professional for any job
            </p>
          </div>

          {!categories ? (
            <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Loading...</div>
          ) : (
            <div data-grid="categories" style={{ display: "grid", gap: 16 }}>
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <Link key={category.slug} href={`/categories/${category.slug}`} style={{ textDecoration: "none" }}>
                    <div className="card category-card" style={{ padding: "20px 20px 20px 20px", height: "100%" }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: 14,
                      }}>
                        {IconComponent && <IconComponent size={22} color="#fff" />}
                      </div>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{category.name}</h3>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 14, flex: 1 }}>{category.description}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--primary)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                          Browse <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ padding: "48px 24px 72px", background: "var(--bg-white)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)", textAlign: "center", marginBottom: 40 }}>
            How It Works
          </h2>
          <div data-grid="features" style={{ display: "grid", gap: 24 }}>
            {[
              { icon: Search, title: "Search", desc: "Find the service you need by category or keyword" },
              { icon: Users, title: "Compare", desc: "Check services, hours, and verified contact info" },
              { icon: Phone, title: "Connect", desc: "Call or message businesses directly" },
            ].map((item, i) => {
              const StepIcon = item.icon;
              return (
                <div key={item.title} className="card" style={{ padding: 28, textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, var(--primary), var(--primary-light))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <StepIcon size={26} color="#fff" />
                  </div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--primary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Step {i + 1}
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED BUSINESSES ===== */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)" }}>
              Featured Businesses
            </h2>
            <p style={{ color: "var(--text-muted)", marginTop: 8, fontSize: "0.95rem" }}>
              Trusted by your neighbours
            </p>
          </div>

          {!featuredBusinesses ? (
            <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Loading...</div>
          ) : (
            <div data-grid="businesses" style={{ display: "grid", gap: 20 }}>
              {featuredBusinesses.map((business) => (
                <div key={business._id} className="card" style={{ padding: 24 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                    {business.verified && <span className="verified-badge"><CheckCircle size={12} />Verified</span>}
                    {business.featured && <span className="featured-badge"><Star size={12} />Featured</span>}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{business.name}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600, marginBottom: 12 }}>{business.categoryName}</p>
                  {business.rating && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <RatingStars rating={business.rating} />
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{business.reviewCount ? `(${business.reviewCount})` : ""}</span>
                    </div>
                  )}
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>{business.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                    {business.services.slice(0, 3).map((service) => (
                      <span key={service} className="service-tag">{service}</span>
                    ))}
                    {business.services.length > 3 && <span className="service-tag">+{business.services.length - 3}</span>}
                  </div>
                  <Link href={`/businesses/${business.slug}`} style={{ textDecoration: "none" }}>
                    <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                      View Profile <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== WHY PARISLOCAL ===== */}
      <section style={{ padding: "48px 24px 72px", background: "var(--bg-white)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)", textAlign: "center", marginBottom: 40 }}>
            Why ParisLocal?
          </h2>
          <div data-grid="features" style={{ display: "grid", gap: 20 }}>
            {[
              { icon: Shield, title: "Verified", desc: "Every business is checked for licenses, insurance, and local presence." },
              { icon: Phone, title: "No Middleman", desc: "Connect directly with business owners. No fees, no commissions." },
              { icon: CheckCircle, title: "Community First", desc: "Built by locals, for locals. Supporting local businesses since day one." },
            ].map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={feature.title} className="card" style={{ padding: 28, textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, var(--primary), var(--primary-light))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <FeatureIcon size={24} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{feature.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: "72px 24px" }}>
        <div className="card" style={{ maxWidth: 640, margin: "0 auto", padding: "48px 32px", textAlign: "center", background: "linear-gradient(135deg, var(--hero-from), var(--hero-via))", border: "none" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
            Own a Local Business?
          </h2>
          <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 28px" }}>
            List your business for free and get found by thousands of local customers.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="/list-your-business" style={{ textDecoration: "none" }}>
              <button className="btn-primary">List Your Business <ArrowRight size={16} /></button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQSection />
    </div>
  );
}
