"use client";

import { useState, FormEvent } from "react";

export const metadata = {
  title: "Contact ParisLocal",
  description: "Get in touch with ParisLocal. Questions about listing your business, corrections, or general inquiries about Paris, Ontario.",
  openGraph: {
    title: "Contact — ParisLocal",
    description: "Get in touch with ParisLocal.",
    images: ["/og-image.svg"],
  },
};
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  ExternalLink, Loader2, AlertCircle,
} from "lucide-react";

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "List My Business",
  "Report a Problem",
  "Partnership",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitContact = useMutation(api.contacts.submit);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || undefined,
        message: formData.message,
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main>
      <section className="hero-gradient" style={{ paddingTop: "120px" }}>
        <div className="container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <h1 style={{ fontSize: "2.5rem", lineHeight: 1.2, fontWeight: 800, color: "#ffffff" }}>Get in Touch</h1>
          <p style={{ maxWidth: "520px", margin: "1rem auto 0", color: "rgba(255,255,255,0.8)", fontSize: "1.125rem" }}>
            Have a question, suggestion, or want to list your business? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <section style={{ padding: "4rem 1rem" }}>
        <div className="container" style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
          <div>
            {submitted ? (
              <div className="card" style={{ padding: "2.5rem", textAlign: "center" }}>
                <CheckCircle size={48} style={{ color: "var(--primary)", margin: "0 auto 1rem" }} />
                <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Message Sent</h2>
                <p style={{ color: "var(--text-secondary)" }}>Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
                <button className="btn-secondary" style={{ marginTop: "1.5rem" }} onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1.25rem", borderRadius: "0.5rem", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "0.875rem" }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />{error}
                  </div>
                )}
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your name", required: true },
                  { id: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
                ].map((field) => (
                  <div key={field.id} style={{ marginBottom: "1.25rem" }}>
                    <label htmlFor={field.id} style={{ display: "block", marginBottom: "0.375rem", fontSize: "0.875rem", fontWeight: 500 }}>{field.label}</label>
                    <input id={field.id} name={field.id} type={field.type} required className="input-field" placeholder={field.placeholder} value={(formData as any)[field.id]} onChange={handleChange} />
                  </div>
                ))}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label htmlFor="subject" style={{ display: "block", marginBottom: "0.375rem", fontSize: "0.875rem", fontWeight: 500 }}>Subject</label>
                  <select id="subject" name="subject" required className="input-field" value={formData.subject} onChange={handleChange}>
                    <option value="" disabled>Select a subject</option>
                    {SUBJECT_OPTIONS.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="message" style={{ display: "block", marginBottom: "0.375rem", fontSize: "0.875rem", fontWeight: 500 }}>Message</label>
                  <textarea id="message" name="message" required rows={5} className="input-field" placeholder="How can we help?" value={formData.message} onChange={handleChange} style={{ resize: "vertical" }} />
                </div>
                <button type="submit" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", width: "100%", justifyContent: "center" }}>
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>

          <div>
            <div className="card" style={{ padding: "2rem" }}>
              <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Contact Information</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <Mail size={20} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.125rem" }}>Email</div>
                    <a href="mailto:hello@parislocal.ca" style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>hello@parislocal.ca</a>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <MapPin size={20} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.125rem" }}>Location</div>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Paris, Ontario, Canada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
