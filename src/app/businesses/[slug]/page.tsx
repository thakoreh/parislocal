import Link from "next/link";
import {
  Star,
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  Shield,
  Award,
  ChevronRight,
  Share2,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { getBusinessBySlug, businesses } from "@/data/businesses";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className={i < fullStars ? "star-filled" : "star-empty"}
          fill={i < fullStars ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export default function BusinessProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const business = getBusinessBySlug(params.slug);

  if (!business) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "160px 24px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "var(--accent-glow)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <MapPin size={36} style={{ color: "var(--color-accent)" }} />
        </div>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: 12,
          }}
        >
          Business not found
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          We could not find the business you are looking for. It may have been
          removed or the link may be incorrect.
        </p>
        <Link
          href="/"
          className="btn-primary"
          style={{ textDecoration: "none" }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const relatedBusinesses = businesses.filter(
    (b) => b.categorySlug === business.categorySlug && b.id !== business.id
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "100px 24px 0",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            marginBottom: 8,
          }}
        >
          <Link
            href="/"
            style={{
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/categories/${business.categorySlug}`}
            style={{
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            {business.category}
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--text)", fontWeight: 600 }}>
            {business.name}
          </span>
        </nav>
      </div>

      {/* Hero Section */}
      <section
        className="hero-gradient"
        style={{
          padding: "40px 24px 60px",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <span
              className="section-badge"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              {business.category}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.2,
                  marginBottom: 12,
                }}
              >
                {business.name}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <RatingStars rating={business.rating} />
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    {business.rating.toFixed(1)}
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    ({business.reviewCount} reviews)
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {business.verified && (
                    <span className="verified-badge">
                      <Shield size={12} />
                      Verified
                    </span>
                  )}
                  {business.featured && (
                    <span className="featured-badge">
                      <Award size={12} />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 12,
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <MapPin size={16} />
                {business.address}, {business.city}, {business.province}
                {business.postalCode ? ` ${business.postalCode}` : ""}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <a
                href={`tel:${business.phone.replace(/[^0-9+]/g, "")}`}
                className="btn-accent"
                style={{ textDecoration: "none" }}
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section style={{ padding: "48px 24px 60px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* Left Column - Main Content */}
          <div>
            {/* Description */}
            {business.longDescription && (
              <div
                className="card"
                style={{ padding: 28, marginBottom: 24 }}
              >
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: 14,
                  }}
                >
                  About {business.name}
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                  }}
                >
                  {business.longDescription}
                </p>
              </div>
            )}

            {/* Services */}
            <div
              className="card"
              style={{ padding: 28, marginBottom: 24 }}
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: 16,
                }}
              >
                Services
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: 10,
                }}
              >
                {business.services.map((service) => (
                  <div
                    key={service}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <CheckCircle
                      size={16}
                      style={{
                        color: "var(--color-success)",
                        flexShrink: 0,
                      }}
                    />
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Service Areas */}
            {business.servingAreas.length > 0 && (
              <div className="card" style={{ padding: 28, marginBottom: 24 }}>
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: 16,
                  }}
                >
                  Service Areas
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {business.servingAreas.map((area) => (
                    <span key={area} className="service-tag">
                      <MapPin
                        size={12}
                        style={{
                          display: "inline",
                          marginRight: 4,
                          verticalAlign: "middle",
                        }}
                      />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div
              className="card"
              style={{
                padding: 28,
                background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
                border: "none",
              }}
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: 8,
                }}
              >
                Contact this business
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.8)",
                  marginBottom: 20,
                  lineHeight: 1.6,
                }}
              >
                Reach out directly to {business.name} for a free quote or to
                schedule a service.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href={`tel:${business.phone.replace(/[^0-9+]/g, "")}`}
                  className="btn-accent"
                  style={{ textDecoration: "none" }}
                >
                  <Phone size={16} />
                  {business.phone}
                </a>
                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      padding: "10px 24px",
                      borderRadius: 8,
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      textDecoration: "none",
                    }}
                  >
                    <Mail size={16} />
                    Send Email
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* Contact Card */}
            <div className="card" style={{ padding: 24, marginBottom: 24 }}>
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: 16,
                }}
              >
                Contact Information
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <a
                  href={`tel:${business.phone.replace(/[^0-9+]/g, "")}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "var(--accent-glow)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={16} style={{ color: "var(--color-accent)" }} />
                  </div>
                  {business.phone}
                </a>

                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: "var(--accent-glow)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={16} style={{ color: "var(--color-accent)" }} />
                    </div>
                    {business.email}
                  </a>
                )}

                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: "var(--accent-glow)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Globe
                        size={16}
                        style={{ color: "var(--color-accent)" }}
                      />
                    </div>
                    Visit Website
                    <ExternalLink size={12} style={{ marginLeft: 2 }} />
                  </a>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "var(--accent-glow)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin
                      size={16}
                      style={{ color: "var(--color-accent)" }}
                    />
                  </div>
                  {business.address}, {business.city}, {business.province}
                  {business.postalCode ? ` ${business.postalCode}` : ""}
                </div>
              </div>
            </div>

            {/* Hours */}
            {business.hours && business.hours.length > 0 && (
              <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Clock size={18} />
                  Business Hours
                </h3>
                <table
                  style={{
                    width: "100%",
                    fontSize: "0.875rem",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    {business.hours.map((row, i) => (
                      <tr key={i}>
                        <td
                          style={{
                            padding: "6px 0",
                            color: "var(--text)",
                            fontWeight: 500,
                            borderBottom: "1px solid var(--border)",
                            width: "40%",
                          }}
                        >
                          {row.day}
                        </td>
                        <td
                          style={{
                            padding: "6px 0",
                            color: "var(--text-secondary)",
                            borderBottom: "1px solid var(--border)",
                          }}
                        >
                          {row.open}
                          {row.close ? ` - ${row.close}` : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Social Media */}
            {business.socialMedia &&
              (business.socialMedia.facebook ||
                business.socialMedia.instagram ||
                business.socialMedia.google) && (
                <div className="card" style={{ padding: 24 }}>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: 16,
                    }}
                  >
                    Follow Us
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    {business.socialMedia.facebook && (
                      <a
                        href={business.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          background: "var(--bg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {business.socialMedia.instagram && (
                      <a
                        href={business.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          background: "var(--bg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {business.socialMedia.google && (
                      <a
                        href={business.socialMedia.google}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          background: "var(--bg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <Globe size={18} />
                      </a>
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* Related Businesses */}
      {relatedBusinesses.length > 0 && (
        <section
          style={{
            padding: "40px 24px 80px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 32,
              }}
            >
              <div>
                <span className="section-badge">Related</span>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginTop: 12,
                  }}
                >
                  More {business.category} Businesses
                </h2>
              </div>
              <Link
                href={`/categories/${business.categorySlug}`}
                className="btn-secondary"
                style={{ textDecoration: "none" }}
              >
                View All
                <ChevronRight size={16} />
              </Link>
            </div>

            <div
              data-grid="businesses"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {relatedBusinesses.slice(0, 3).map((b) => (
                <Link
                  key={b.id}
                  href={`/businesses/${b.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card"
                    style={{
                      padding: 24,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 10,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "var(--text)",
                        }}
                      >
                        {b.name}
                      </h3>
                      {b.verified && (
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
                        gap: 8,
                        marginBottom: 12,
                      }}
                    >
                      <RatingStars rating={b.rating} />
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        ({b.reviewCount})
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        flex: 1,
                      }}
                    >
                      {b.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        marginTop: 12,
                        borderTop: "1px solid var(--border)",
                        paddingTop: 12,
                      }}
                    >
                      <MapPin size={14} />
                      {b.city}, {b.province}
                    </div>
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
