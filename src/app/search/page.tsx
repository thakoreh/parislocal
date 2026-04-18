"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  MapPin,
  CheckCircle,
  Shield,
  ChevronRight,
  Search,
} from "lucide-react";
import { searchBusinesses } from "@/data/businesses";
import { categories, servingAreas } from "@/data/categories";
import { Business } from "@/types";

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
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialLocation = searchParams.get("location") || "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setCategory(searchParams.get("category") || "");
    setLocation(searchParams.get("location") || "");
  }, [searchParams]);

  const results: Business[] = useMemo(() => {
    return searchBusinesses(query, {
      category: category || undefined,
      location: location || undefined,
    });
  }, [query, category, location]);

  return (
    <div>
      {/* Hero / Search Bar */}
      <section
        className="hero-gradient"
        style={{
          padding: "120px 24px 48px",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Search Local Businesses
          </h1>

          {/* Search Controls */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "stretch",
            }}
          >
            <div
              className="search-container"
              style={{
                flex: "1 1 300px",
                display: "flex",
                alignItems: "center",
                padding: "6px 12px",
                gap: 10,
              }}
            >
              <Search size={20} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="What service are you looking for?"
                className="input-field"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  border: "none",
                  boxShadow: "none",
                  background: "transparent",
                  padding: "10px 0",
                }}
              />
            </div>

            <select
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "auto",
                minWidth: 160,
                background: "var(--bg-card)",
                cursor: "pointer",
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              className="input-field"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: "auto",
                minWidth: 140,
                background: "var(--bg-card)",
                cursor: "pointer",
              }}
            >
              <option value="">All Locations</option>
              {servingAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section style={{ padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Result count */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 28,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              {results.length} {results.length === 1 ? "business" : "businesses"} found
              {query ? ` for "${query}"` : ""}
            </p>
            {(query || category || location) && (
              <button
                className="btn-secondary"
                style={{ fontSize: "0.85rem", padding: "8px 16px" }}
                onClick={() => {
                  setQuery("");
                  setCategory("");
                  setLocation("");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {results.length > 0 ? (
            <div
              data-grid="businesses"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
              }}
            >
              {results.map((business) => (
                <div
                  key={business.id}
                  className="card"
                  style={{
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Card header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 6,
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "var(--text)",
                          }}
                        >
                          {business.name}
                        </h3>
                        {business.verified && (
                          <span className="verified-badge">
                            <Shield size={12} />
                            Verified
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <RatingStars rating={business.rating} />
                        <span
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "var(--text)",
                          }}
                        >
                          {business.rating.toFixed(1)}
                        </span>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          ({business.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "0.8rem",
                      color: "var(--color-primary)",
                      fontWeight: 500,
                      marginBottom: 10,
                    }}
                  >
                    {business.category}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: 14,
                      flex: 1,
                    }}
                  >
                    {business.description}
                  </p>

                  {/* Services tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 14,
                    }}
                  >
                    {business.services.slice(0, 3).map((service) => (
                      <span key={service} className="service-tag">
                        {service}
                      </span>
                    ))}
                    {business.services.length > 3 && (
                      <span
                        className="service-tag"
                        style={{ color: "var(--color-primary)" }}
                      >
                        +{business.services.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: "1px solid var(--border)",
                      paddingTop: 14,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      <MapPin size={14} />
                      {business.city}, {business.province}
                    </div>
                    <Link
                      href={`/businesses/${business.slug}`}
                      className="btn-primary"
                      style={{
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        padding: "8px 18px",
                      }}
                    >
                      View Profile
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="card"
              style={{
                padding: "60px 40px",
                textAlign: "center",
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "var(--accent-glow)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <Search size={32} style={{ color: "var(--color-accent)" }} />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: 10,
                }}
              >
                No businesses found
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                Try adjusting your search terms or filters. You can also browse
                by category or location to find what you need.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  href="/categories"
                  className="btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  Browse Categories
                </Link>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setQuery("");
                    setCategory("");
                    setLocation("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
