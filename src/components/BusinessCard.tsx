"use client";

import Link from "next/link";
import { MapPin, Phone, Star, Shield, Award, ArrowRight } from "lucide-react";
import type { ConvexBusiness } from "@/types/convex";

interface BusinessCardProps {
  business: Pick<
    ConvexBusiness,
    | "_id"
    | "name"
    | "slug"
    | "categoryName"
    | "categorySlug"
    | "rating"
    | "reviewCount"
    | "address"
    | "city"
    | "phone"
    | "verified"
    | "featured"
    | "description"
  >;
  /** Grid variant adds hover lift + accent top-border via .category-card */
  variant?: "default" | "grid";
}

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < full ? "star-filled" : "star-empty"}
          fill={i < full ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export default function BusinessCard({
  business,
  variant = "default",
}: BusinessCardProps) {
  const cardClass = variant === "grid" ? "card category-card" : "card";

  return (
    <Link
      href={`/businesses/${business.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <article
        className={cardClass}
        style={{
          padding: "var(--space-6)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--space-3)",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Category badge */}
            <span
              className="section-badge"
              style={{ marginBottom: "var(--space-2)", fontSize: "0.7rem" }}
            >
              {business.categoryName}
            </span>

            {/* Name */}
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text)",
                lineHeight: 1.3,
                marginTop: "var(--space-1)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {business.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        {business.description && (
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              lineHeight: 1.5,
              flex: 1,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {business.description}
          </p>
        )}

        {/* Rating + badges row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-2)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            {business.rating ? (
              <>
                <RatingStars rating={business.rating} />
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  {business.rating.toFixed(1)}
                </span>
                {business.reviewCount ? (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    ({business.reviewCount})
                  </span>
                ) : null}
              </>
            ) : null}
          </div>

          <div style={{ display: "flex", gap: "var(--space-1)", flexWrap: "wrap" }}>
            {business.verified && (
              <span className="verified-badge">
                <Shield size={10} />
                Verified
              </span>
            )}
            {business.featured && (
              <span className="featured-badge">
                <Award size={10} />
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Location */}
        {(business.address || business.city) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: "0.78rem",
              color: "var(--text-muted)",
            }}
          >
            <MapPin size={12} />
            <span>
              {business.address && `${business.address}, `}
              {business.city}
            </span>
          </div>
        )}

        {/* CTA row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "auto",
            paddingTop: "var(--space-2)",
          }}
        >
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--primary)",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            View profile <ArrowRight size={12} />
          </span>
        </div>
      </article>
    </Link>
  );
}
