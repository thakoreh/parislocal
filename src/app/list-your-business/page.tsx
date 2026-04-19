"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  CheckCircle, Shield, Phone, Star, MapPin,
  ChevronRight, AlertCircle,
} from "lucide-react";

interface FormData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  services: string;
  address: string;
  city: string;
  website: string;
}

const initialFormData: FormData = {
  businessName: "", ownerName: "", email: "", phone: "",
  category: "", description: "", services: "", address: "",
  city: "Paris", website: "",
};

export default function ListYourBusinessPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = useQuery(api.categories.list);
  const createBusiness = useMutation(api.businesses.create);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const cat = categories?.find((c: any) => c.slug === formData.category);
      if (!cat) {
        setError("Please select a valid category.");
        setLoading(false);
        return;
      }

      const slug = formData.businessName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      await createBusiness({
        name: formData.businessName,
        slug,
        description: formData.description,
        categorySlug: formData.category,
        categoryName: cat.name,
        services: formData.services.split(",").map((s) => s.trim()).filter(Boolean),
        phone: formData.phone,
        email: formData.email || undefined,
        website: formData.website || undefined,
        address: formData.address,
        city: formData.city || "Paris",
        province: "ON",
        verified: false,
        featured: false,
        tags: formData.services.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean),
        source: "self-submitted",
      });

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "160px 24px 80px", textAlign: "center" }}>
        <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
          <CheckCircle size={44} color="#ffffff" />
        </div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Thank you!</h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32 }}>
          We&apos;ll review your listing within 24 hours. Once approved, your business will appear in our directory for local customers to find.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>Back to Home</Link>
          <button className="btn-secondary" onClick={() => { setSubmitted(false); setFormData(initialFormData); }}>Add Another Business</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="hero-gradient" style={{ padding: "120px 24px 56px", position: "relative" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <span className="section-badge" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24", marginBottom: 20 }}>Free Listing</span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginTop: 16, marginBottom: 16 }}>
            Get Your Business Found by Local Customers
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            Join local businesses on ParisLocal. Create your free listing and start connecting with customers in Paris, Brantford, Cambridge, and surrounding areas.
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gap: 40, alignItems: "start" }} data-responsive="sidebar">
          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Business Information</h2>
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1.25rem", borderRadius: "0.5rem", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "0.875rem" }}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />{error}
                </div>
              )}
              <div style={{ display: "grid", gap: 16 }} data-responsive="form-2col">
                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="businessName" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Business Name</label>
                  <input type="text" id="businessName" name="businessName" className="input-field" placeholder="e.g. Grand River Plumbing" value={formData.businessName} onChange={handleChange} required disabled={loading} />
                </div>
                <div>
                  <label htmlFor="ownerName" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Owner Name</label>
                  <input type="text" id="ownerName" name="ownerName" className="input-field" placeholder="Your full name" value={formData.ownerName} onChange={handleChange} required disabled={loading} />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Email</label>
                  <input type="email" id="email" name="email" className="input-field" placeholder="you@business.ca" value={formData.email} onChange={handleChange} required disabled={loading} />
                </div>
                <div>
                  <label htmlFor="phone" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Phone</label>
                  <input type="tel" id="phone" name="phone" className="input-field" placeholder="(519) 555-0123" value={formData.phone} onChange={handleChange} required disabled={loading} />
                </div>
                <div>
                  <label htmlFor="category" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Category</label>
                  <select id="category" name="category" className="input-field" value={formData.category} onChange={handleChange} required style={{ cursor: loading ? "not-allowed" : "pointer" }} disabled={loading}>
                    <option value="">Select a category</option>
                    {categories?.map((cat: any) => (<option key={cat.slug} value={cat.slug}>{cat.name}</option>))}
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="description" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Description</label>
                  <textarea id="description" name="description" className="input-field" placeholder="Tell customers about your business..." rows={4} value={formData.description} onChange={handleChange} required style={{ resize: "vertical" }} disabled={loading} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="services" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Services (comma-separated)</label>
                  <input type="text" id="services" name="services" className="input-field" placeholder="e.g. Emergency Repairs, Drain Cleaning, Water Heaters" value={formData.services} onChange={handleChange} required disabled={loading} />
                </div>
                <div>
                  <label htmlFor="address" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Address</label>
                  <input type="text" id="address" name="address" className="input-field" placeholder="123 Main Street" value={formData.address} onChange={handleChange} required disabled={loading} />
                </div>
                <div>
                  <label htmlFor="city" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>City</label>
                  <input type="text" id="city" name="city" className="input-field" placeholder="Paris" value={formData.city} onChange={handleChange} required disabled={loading} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="website" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Website (optional)</label>
                  <input type="url" id="website" name="website" className="input-field" placeholder="https://yourbusiness.ca" value={formData.website} onChange={handleChange} disabled={loading} />
                </div>
              </div>
              <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", marginTop: 24, justifyContent: "center", display: "flex", alignItems: "center", gap: 8, opacity: loading ? 0.7 : 1 }}>
                {loading ? "Submitting..." : "Submit Listing"} {loading && <span className="animate-spin">...</span>}
              </button>
            </form>
          </div>

          {/* Benefits sidebar */}
          <div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>Why list with us?</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: CheckCircle, text: "100% free — no hidden fees or commissions" },
                  { icon: Shield, text: "Verified badge builds trust with customers" },
                  { icon: Phone, text: "Customers contact you directly" },
                  { icon: MapPin, text: "Reach 15,000+ Paris area residents" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Icon size={18} style={{ color: "var(--color-success)", flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
