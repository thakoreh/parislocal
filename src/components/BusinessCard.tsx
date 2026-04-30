"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { MapPin, Phone, Star, Shield, Award, ArrowRight, ThumbsUp } from "lucide-react";
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
    | "upvoteCount"
  >;
  /** Grid variant adds hover lift + accent top-border via .category-card */
  variant?: "default" | "grid";
  /** Whether the current session has upvoted this business */
  hasUpvoted?: boolean;
  /** Called when upvote changes */
  onUpvoteChange?: (businessId: string, newCount: number, hasUpvoted: boolean) => void;
  /** Grid variant adds hover lift + accent top-border via .category-card */
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

function getSessionId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("parislocal_session_id");
  if (!id) {
    id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("parislocal_session_id", id);
  }
  return id;
}

export default function BusinessCard({
  business,
  variant = "default",
  hasUpvoted = false,
  onUpvoteChange,
}: BusinessCardProps) {
  const cardClass = variant === "grid" ? "card category-card" : "card";
  const [upvoted, setUpvoted] = useState(hasUpvoted);
  const [count, setCount] = useState(business.upvoteCount ?? 0);
  const [optimisticLoading, setOptimisticLoading] = useState(false);

  const toggleUpvote = useMutation(api.businesses.toggleUpvote);

  const handleUpvote = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (optimisticLoading) return;

      setOptimisticLoading(true);
      const sessionId = getSessionId();
      const wasUpvoted = upvoted;
      const wasCount = count;

      // Optimistic update
      setUpvoted(!wasUpvoted);
      setCount(wasUpvoted ? wasCount - 1 : wasCount + 1);

      try {
        const result = await toggleUpvote({
          businessId: business._id as Id<"businesses">,
          sessionId,
        });
        // Sync with server result
        setUpvoted(result.action === "added");
        setCount(result.action === "added" ? wasCount + 1 : wasCount - 1);
        onUpvoteChange?.(business._id, result.action === "added" ? wasCount + 1 : wasCount - 1, result.action === "added");
      } catch {
        // Revert on error
        setUpvoted(wasUpvoted);
        setCount(wasCount);
      } finally {
        setOptimisticLoading(false);
      }
    },
    [business._id, count, onUpvoteChange, optimisticLoading, toggleUpvote, upvoted]
  );

  return (
    <div className={cardClass} style={{ padding: "var(--space-6)", height: "100%", display: "flex", flexDirection: "column", gap: "var(--space-3)", position: "relative" }}>
      {/* Upvote button - top right, outside Link */}
      <button
        onClick={handleUpvote}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[36px] min-w-[44px] justify-center"
        style={{
          position: "absolute",
          top: "var(--space-4)",
          right: "var(--space-4)",
          background: upvoted ? "var(--primary)" : "transparent",
          border: `1.5px solid ${upvoted ? "var(--primary)" : "var(--border)"}`,
          color: upvoted ? "white" : "var(--text-muted)",
          zIndex: 2,
        }}
        aria-label={upvoted ? "Remove upvote" : "Upvote this business"}
      >
        <ThumbsUp size={12} />
        <span>{count}</span>
      </button>

      <Link
        href={`/businesses/${business.slug}`}
        style={{ textDecoration: "none", display: "contents" }}
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
          <div style={{ flex: 1, minWidth: 0, paddingRight: "48px" }}>
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
      </Link>
    </div>
  );
}
