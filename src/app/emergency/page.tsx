"use client";

import { useQuery } from "convex/react";

export const metadata = {
  title: "Emergency Services in Paris, Ontario — ParisLocal",
  description: "Find emergency plumbers, electricians, and urgent services in Paris, Ontario. 24/7 emergency contacts.",
  openGraph: {
    title: "Emergency Services — ParisLocal",
    description: "24/7 emergency local services in Paris, Ontario.",
    images: ["/og-image.svg"],
  },
};
import { api } from "../../../convex/_generated/api";
import {
  Phone, MapPin, Clock, AlertTriangle, Shield, Heart,
} from "lucide-react";

const emergencyContacts = [
  {
    name: "Emergency Services",
    phone: "911",
    description: "Police, Fire, Ambulance",
    icon: AlertTriangle,
    color: "#dc2626",
    bg: "#fef2f2",
  },
  {
    name: "Paris Police (OPP)",
    phone: "(519) 442-2241",
    description: "Ontario Provincial Police — Paris Detachment",
    icon: Shield,
    color: "#1e40af",
    bg: "#dbeafe",
  },
  {
    name: "Brant County Health Unit",
    phone: "(519) 753-4937",
    description: "Public health information and services",
    icon: Heart,
    color: "#065f46",
    bg: "#d1fae5",
  },
];

const urgentCare = [
  { name: "Paris Medical Clinic", phone: "(519) 442-2444", address: "67 Willow St, Paris", hours: "Mon-Fri 9am-5pm" },
  { name: "Brantford General Hospital", phone: "(519) 756-6210", address: "200 Terrace Hill St, Brantford", hours: "24/7 Emergency" },
  { name: "St. Joseph's Healthcare (Hamilton)", phone: "(905) 522-1155", address: "50 Charlton Ave E, Hamilton", hours: "24/7 Emergency" },
];

const utilityNumbers = [
  { name: "Hydro One (Power Outage)", phone: "1-800-434-1235", hours: "24/7" },
  { name: "Union Gas / Enbridge", phone: "1-877-362-7603", hours: "24/7 Emergency" },
  { name: "County of Brant (Municipal)", phone: "(519) 442-6324", hours: "Mon-Fri 8:30am-4:30pm" },
  { name: "Paris Water & Sewer", phone: "(519) 442-6324", hours: "Mon-Fri 8:30am-4:30pm" },
  { name: "Bell Canada (Telephone)", phone: "1-866-301-1942", hours: "24/7" },
];

export default function EmergencyPage() {
  return (
    <div>
      <section className="hero-gradient" style={{ padding: "120px 24px 56px", position: "relative" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <span className="section-badge" style={{ background: "rgba(239, 68, 68, 0.2)", color: "#fca5a5", marginBottom: 20 }}>
            <Phone size={14} />
            Emergency &amp; Important Numbers
          </span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginTop: 16, marginBottom: 16 }}>
            Emergency Contacts
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            Quick access to emergency services, hospitals, utilities, and important Paris area contacts.
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Critical Emergency */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 48 }}>
            {emergencyContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.name}
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card"
                    style={{
                      padding: 28,
                      textAlign: "center",
                      border: `2px solid ${contact.color}20`,
                      background: contact.bg,
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: `${contact.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                      }}
                    >
                      <Icon size={28} style={{ color: contact.color }} />
                    </div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                      {contact.name}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: 12 }}>
                      {contact.description}
                    </p>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: contact.color,
                        letterSpacing: 0.5,
                      }}
                    >
                      {contact.phone}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Urgent Care */}
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>
            Medical &amp; Urgent Care
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
            {urgentCare.map((place) => (
              <div key={place.name} className="card" style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{place.name}</h3>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <MapPin size={12} />{place.address}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <Clock size={12} />{place.hours}
                    </span>
                  </div>
                </div>
                <a href={`tel:${place.phone.replace(/[^0-9+]/g, "")}`} className="btn-primary" style={{ textDecoration: "none", fontSize: "0.85rem", padding: "8px 20px" }}>
                  <Phone size={14} />{place.phone}
                </a>
              </div>
            ))}
          </div>

          {/* Utilities */}
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>
            Utility &amp; Municipal Services
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {utilityNumbers.map((util) => (
              <div key={util.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "var(--bg-card)", borderRadius: 10, border: "1px solid var(--border)" }}>
                <div>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>{util.name}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginLeft: 12 }}>{util.hours}</span>
                </div>
                <a href={`tel:${util.phone.replace(/[^0-9+]/g, "")}`} style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}>
                  {util.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
