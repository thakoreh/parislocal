"use client";

import { useState, FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "List My Business",
  "Report a Problem",
  "Partnership",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="hero-gradient">
        <div
          className="container"
          style={{ textAlign: "center", padding: "4rem 1rem" }}
        >
          <h1 style={{ fontSize: "2.5rem", lineHeight: 1.2 }}>Get in Touch</h1>
          <p
            style={{
              maxWidth: "520px",
              margin: "1rem auto 0",
              color: "var(--text-secondary)",
              fontSize: "1.125rem",
            }}
          >
            Have a question, suggestion, or want to list your business? We&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Two-column layout */}
      <section style={{ padding: "4rem 1rem" }}>
        <div
          className="container"
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Left: Contact Form */}
          <div>
            {submitted ? (
              <div
                className="card"
                style={{
                  padding: "2.5rem",
                  textAlign: "center",
                }}
              >
                <CheckCircle
                  size={48}
                  style={{ color: "var(--primary)", margin: "0 auto 1rem" }}
                />
                <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  Message Sent
                </h2>
                <p style={{ color: "var(--text-secondary)" }}>
                  Thank you for reaching out. We&rsquo;ll get back to you as
                  soon as possible.
                </p>
                <button
                  className="btn-secondary"
                  style={{ marginTop: "1.5rem" }}
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Error banner */}
                {error && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1rem",
                      marginBottom: "1.25rem",
                      borderRadius: "0.5rem",
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      color: "#dc2626",
                      fontSize: "0.875rem",
                    }}
                  >
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    {error}
                  </div>
                )}

                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      marginBottom: "0.375rem",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="input-field"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      marginBottom: "0.375rem",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input-field"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    htmlFor="subject"
                    style={{
                      display: "block",
                      marginBottom: "0.375rem",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="input-field"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      marginBottom: "0.375rem",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="input-field"
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ resize: "vertical" }}
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "100%",
                    justifyContent: "center",
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? (
                    <>
                      Sending... <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Info */}
          <div>
            <div className="card" style={{ padding: "2rem" }}>
              <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>
                Contact Information
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <Mail size={20} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.125rem" }}>
                      Email
                    </div>
                    <a
                      href="mailto:hello@parislocal.ca"
                      style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}
                    >
                      hello@parislocal.ca
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <Phone size={20} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.125rem" }}>
                      Phone
                    </div>
                    <a
                      href="tel:+151****0100"
                      style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}
                    >
                      (519) 555-0100
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <MapPin size={20} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.125rem" }}>
                      Location
                    </div>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                      Paris, Ontario, Canada
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", marginTop: "1.5rem", paddingTop: "1.5rem" }}>
                <h3 style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.75rem" }}>
                  Follow Us
                </h3>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <a
                    href="#"
                    aria-label="Facebook"
                    style={{ color: "var(--text-secondary)", display: "inline-flex" }}
                  >
                    <ExternalLink size={18} />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    style={{ color: "var(--text-secondary)", display: "inline-flex" }}
                  >
                    <ExternalLink size={18} />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter / X"
                    style={{ color: "var(--text-secondary)", display: "inline-flex" }}
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
