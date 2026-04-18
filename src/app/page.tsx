"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Wrench,
  Zap,
  TreePine,
  Thermometer,
  Hammer,
  Sparkles,
  Home as HomeIcon,
  Paintbrush,
  Snowflake,
  Car,
  Truck,
  Trees,
  ArrowRight,
  MapPin,
  Star,
  Phone,
  Shield,
  Search,
  Users,
  CheckCircle,
  Coffee,
  UtensilsCrossed,
  Scissors,
  Dumbbell,
  Scale,
  Building2,
  Smile,
  Heart,
  PawPrint,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
import FAQSection from "@/components/FAQSection";
import type { ConvexBusiness, ConvexCategory } from "@/types/convex";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>> = {
  Wrench,
  Zap,
  TreePine,
  Thermometer,
  Hammer,
  Sparkles,
  Home: HomeIcon,
  Paintbrush,
  Snowflake,
  Car,
  Truck,
  Trees,
  UtensilsCrossed,
  Coffee,
  Scissors,
  Dumbbell,
  Scale,
  Building2,
  Smile,
  Heart,
  PawPrint,
};

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < fullStars ? "star-filled" : "star-empty"}
          fill={i < fullStars ? "currentColor" : "none"}
        />
      ))}
      <span
        style={{
          marginLeft: 6,
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "var(--text)",
        }}
      >
        {rating.toFixed(1)}
      </span>
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
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            width: "100%",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            className="section-badge"
            style={{
              marginBottom: 24,
              background: "rgba(245, 158, 11, 0.15)",
              color: "#fbbf24",
            }}
          >
            <MapPin size={14} />
            Serving Paris, Ontario &amp; Brant County
          </span>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
              marginTop: 24,
              marginBottom: 20,
            }}
          >
            Find Trusted Local Services You Can Count On
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.7,
              maxWidth: 620,
              margin: "0 auto 40px",
            }}
          >
            Connect with verified plumbers, electricians, landscapers, restaurants, and more
            in Paris, Brantford, Cambridge, and surrounding areas.
          </p>

          {/* Search Bar */}
          <div
            className="search-container"
            style={{
              display: "flex",
              alignItems: "center",
              maxWidth: 600,
              margin: "0 auto 16px",
              padding: 6,
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingLeft: 12,
              }}
            >
              <Search size={20} style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="What service do you need?"
                className="input-field"
                style={{
                  border: "none",
                  boxShadow: "none",
                  background: "transparent",
                  padding: "10px 0",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push(`/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`);
                  }
                }}
              />
            </div>
            <select
              className="input-field"
              style={{
                width: "auto",
                border: "none",
                boxShadow: "none",
                background: "transparent",
                padding: "10px 12px",
                borderLeft: "1px solid var(--border)",
                borderRadius: 0,
                cursor: "pointer",
                minWidth: 130,
              }}
              defaultValue=""
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            >
              <option value="" disabled>
                Location
              </option>
              <option value="Paris">Paris</option>
              <option value="Brantford">Brantford</option>
              <option value="Cambridge">Cambridge</option>
              <option value="Burford">Burford</option>
              <option value="St. George">St. George</option>
            </select>
            <button
              className="btn-primary"
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                router.push(`/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`);
              }}
            >
              Search
            </button>
          </div>

          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: 48,
            }}
          >
            Popular: Plumbing, Landscaping, Snow Removal, Electrical
          </p>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              { number: `${totalBusinesses}+`, label: "Local Businesses" },
              { number: "5,000+", label: "Happy Customers" },
              { number: "12", label: "Service Areas" },
              { number: "4.7", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  className="stat-number"
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 800,
                    lineHeight: 1.2,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR CATEGORIES ===== */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-badge">Categories</span>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                marginTop: 16,
                color: "var(--text)",
              }}
            >
              Browse by Service Category
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginTop: 12,
                maxWidth: 500,
                margin: "12px auto 0",
              }}
            >
              Find the right professional for any job around your home or
              business.
            </p>
          </div>

          {!categories ? (
            <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
              Loading categories...
            </div>
          ) : (
            <div
              data-grid="categories"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 20,
              }}
            >
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="card category-card"
                      style={{
                        padding: 24,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 10,
                          background:
                            "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 16,
                        }}
                      >
                        {IconComponent && (
                          <IconComponent size={24} color="#ffffff" />
                        )}
                      </div>
                      <h3
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "var(--text)",
                          marginBottom: 8,
                        }}
                      >
                        {category.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.6,
                          flex: 1,
                          marginBottom: 12,
                        }}
                      >
                        {category.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                            fontWeight: 500,
                          }}
                        >
                          Browse listings
                        </span>
                        <ArrowRight
                          size={16}
                          style={{ color: "var(--color-primary)" }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-badge">How It Works</span>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                marginTop: 16,
                color: "var(--text)",
              }}
            >
              Three Simple Steps
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
            }}
          >
            {[
              {
                icon: Search,
                title: "Search or Browse",
                description:
                  "Find the service you need by category or keyword",
                step: "1",
              },
              {
                icon: Users,
                title: "Compare & Read Reviews",
                description:
                  "Check ratings, reviews, and verified credentials",
                step: "2",
              },
              {
                icon: Phone,
                title: "Connect Directly",
                description:
                  "Call, email, or message businesses directly",
                step: "3",
              },
            ].map((item) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  style={{ textAlign: "center", padding: "0 16px" }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <StepIcon size={32} color="#ffffff" />
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-accent)",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Step {item.step}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: 8,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== FEATURED BUSINESSES ===== */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-badge">Featured</span>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                marginTop: 16,
                color: "var(--text)",
              }}
            >
              Top-Rated Local Businesses
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginTop: 12,
                maxWidth: 500,
                margin: "12px auto 0",
              }}
            >
              Hand-picked businesses trusted by your neighbours.
            </p>
          </div>

          {!featuredBusinesses ? (
            <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
              Loading featured businesses...
            </div>
          ) : (
            <div
              data-grid="businesses"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {featuredBusinesses.map((business) => (
                <div key={business._id} className="card" style={{ padding: 24 }}>
                  {/* Badges */}
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    {business.verified && (
                      <span className="verified-badge">
                        <CheckCircle size={12} />
                        Verified
                      </span>
                    )}
                    {business.featured && (
                      <span className="featured-badge">
                        <Star size={12} />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Name & Category */}
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: 4,
                    }}
                  >
                    {business.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-primary)",
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    {business.categoryName}
                  </p>

                  {/* Rating */}
                  {business.rating && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 12,
                      }}
                    >
                      <RatingStars rating={business.rating} />
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {business.reviewCount ? `(${business.reviewCount} reviews)` : ""}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: 16,
                    }}
                  >
                    {business.description}
                  </p>

                  {/* Service Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 20,
                    }}
                  >
                    {business.services.slice(0, 3).map((service) => (
                      <span key={service} className="service-tag">
                        {service}
                      </span>
                    ))}
                    {business.services.length > 3 && (
                      <span className="service-tag">
                        +{business.services.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/businesses/${business.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      className="btn-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      View Profile
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== WHY PARISLOCAL ===== */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-badge">About</span>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                marginTop: 16,
                color: "var(--text)",
              }}
            >
              Why ParisLocal?
            </h2>
          </div>

          <div
            data-grid="features"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {[
              {
                icon: Shield,
                title: "Local & Verified",
                description:
                  "Every business on ParisLocal is verified for licenses, insurance, and local presence. We only list businesses that serve the Paris, Ontario community so you can hire with confidence.",
              },
              {
                icon: Phone,
                title: "No Middleman",
                description:
                  "Connect directly with business owners. No hidden fees, no commission, no call centres. You call, email, or message them directly to get quotes and book services on your terms.",
              },
              {
                icon: CheckCircle,
                title: "Community First",
                description:
                  "Built by locals, for locals. ParisLocal is designed to support the small businesses that make our community special. Real reviews from real neighbours help you find the right fit.",
              },
            ].map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="card"
                  style={{ padding: 32, textAlign: "center" }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <FeatureIcon size={28} color="#ffffff" />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: 12,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== BUSINESS CTA ===== */}
      <section style={{ padding: "80px 24px" }}>
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "60px 40px",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            Are You a Local Business?
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 500,
              margin: "0 auto 32px",
            }}
          >
            Get found by thousands of residents looking for your services. List
            your business for free.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Link href="/list-your-business" style={{ textDecoration: "none" }}>
              <button className="btn-primary">
                List Your Business Free
                <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/about" style={{ textDecoration: "none" }}>
              <button className="btn-secondary">Learn More</button>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== FAQ ===== */}
      <FAQSection />
    </div>
  );
}
