"use client";

import {
  Phone, MapPin, Clock, AlertTriangle, Shield, Heart,
  Zap, Wind, Droplets, Bell,
} from "lucide-react";

const emergencyContacts = [
  {
    name: "Emergency — All Services",
    phone: "911",
    description: "Police, Fire, Ambulance — for life-threatening emergencies only",
    icon: AlertTriangle,
    color: "#dc2626",
    bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
    iconBg: "#fef2f2",
  },
  {
    name: "Paris OPP Detachment",
    phone: "(519) 442-2241",
    description: "Ontario Provincial Police — non-emergency line for Paris and Brant County",
    icon: Shield,
    color: "#1e40af",
    bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    iconBg: "#eff6ff",
  },
  {
    name: "Brant County Health Unit",
    phone: "(519) 753-4937",
    description: "Public health services, immunizations, and health information",
    icon: Heart,
    color: "#065f46",
    bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
    iconBg: "#ecfdf5",
  },
];

const urgentCare = [
  {
    name: "Paris Medical Clinic",
    phone: "(519) 442-2444",
    address: "67 Willow St, Paris, ON",
    hours: "Mon–Fri 9am–5pm",
    note: "Walk-in available during hours",
    emergency: false,
  },
  {
    name: "Brantford General Hospital",
    phone: "(519) 756-6210",
    address: "200 Terrace Hill St, Brantford, ON",
    hours: "24/7 Emergency Department",
    note: "Nearest hospital — 15 km from Paris",
    emergency: true,
  },
  {
    name: "St. Joseph's Healthcare (Hamilton)",
    phone: "(905) 522-1155",
    address: "50 Charlton Ave E, Hamilton, ON",
    hours: "24/7 Emergency",
    note: "Regional trauma centre — 45 km from Paris",
    emergency: true,
  },
];

const utilities = [
  { name: "Hydro One — Power Outages", phone: "1-800-434-1235", icon: Zap, color: "#ca8a04" },
  { name: "Enbridge Gas — Gas Leaks / Emergencies", phone: "1-800-794-4784", icon: Wind, color: "#ea580c" },
  { name: "County of Brant — Municipal", phone: "(519) 442-6324", icon: Building, color: "#1d4ed8" },
  { name: "Paris Water & Sewer Emergency", phone: "(519) 442-6324", icon: Droplets, color: "#0284c7" },
  { name: "Bell Canada — Service Outages", phone: "1-866-301-1942", icon: Bell, color: "#7c3aed" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Building(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 20} height={props.size ?? 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>
    </svg>
  );
}

export default function EmergencyPage() {
  return (
    <div>
      {/* Cobblestone Hero */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px 60px",
        background: "#1c2820",
      }}>
        {/* Cobblestone texture overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='%231c2820'/%3E%3Cellipse cx='15' cy='15' rx='13' ry='10' fill='%232a3d2e' opacity='0.6'/%3E%3Cellipse cx='45' cy='15' rx='13' ry='10' fill='%232a3d2e' opacity='0.6'/%3E%3Cellipse cx='0' cy='37' rx='13' ry='10' fill='%232a3d2e' opacity='0.6'/%3E%3Cellipse cx='30' cy='37' rx='13' ry='10' fill='%232a3d2e' opacity='0.6'/%3E%3Cellipse cx='60' cy='37' rx='13' ry='10' fill='%232a3d2e' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          opacity: 0.4,
          zIndex: 1,
        }} />

        {/* Teal glow accent */}
        <div style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(61,124,107,0.2)",
          pointerEvents: "none",
          zIndex: 1,
        }} />

        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{
              background: "rgba(220,38,38,0.2)",
              color: "#fca5a5",
              fontSize: "0.8rem",
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 20,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}>
              <AlertTriangle size={12} />
              Emergency Contacts
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            marginBottom: 16,
            letterSpacing: "-0.01em",
          }}>
            Paris, Ontario<br />
            <span style={{ color: "#8ec5a8" }}>Emergency Guide</span>
          </h1>
          <p style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
            maxWidth: 520,
          }}>
            Critical phone numbers for police, fire, medical emergencies, hospitals, and utility services in Paris and Brant County.
          </p>
        </div>
      </section>

      {/* 911 Banner */}
      <div style={{
        background: "linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)",
        padding: "14px 24px",
        textAlign: "center",
      }}>
        <a
          href="tel:911"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            color: "#fff",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: "1.2rem",
            letterSpacing: "0.05em",
          }}
        >
          <Phone size={20} />
          Call 911 for Police, Fire, or Ambulance
          <Phone size={20} />
        </a>
      </div>

      <section style={{ padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Primary Emergency Contacts */}
          <div style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 20,
          }}>
            Primary Emergency Contacts
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginBottom: 48,
          }}>
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
                      padding: "24px 20px",
                      textAlign: "center",
                      background: "var(--card-bg)",
                      border: `1.5px solid ${contact.color}30`,
                      borderRadius: 16,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${contact.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: contact.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 14px",
                      border: `2px solid ${contact.color}25`,
                    }}>
                      <Icon size={26} style={{ color: contact.color }} />
                    </div>
                    <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text)", marginBottom: 6, lineHeight: 1.3 }}>
                      {contact.name}
                    </h3>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 14, lineHeight: 1.5 }}>
                      {contact.description}
                    </p>
                    <div style={{
                      fontSize: "1.35rem",
                      fontWeight: 800,
                      color: contact.color,
                      letterSpacing: "0.02em",
                      background: `${contact.color}12`,
                      borderRadius: 10,
                      padding: "8px 14px",
                    }}>
                      {contact.phone}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Hospitals & Urgent Care */}
          <div style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 20,
          }}>
            Hospitals &amp; Urgent Care
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
            {urgentCare.map((place) => (
              <div
                key={place.name}
                className="card"
                style={{
                  padding: "18px 20px",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 12,
                  alignItems: "center",
                  border: place.emergency ? "1.5px solid rgba(220,38,38,0.2)" : "1px solid var(--border)",
                  borderRadius: 14,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)" }}>
                      {place.name}
                    </h3>
                    {place.emergency && (
                      <span style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: "#dc2626",
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        borderRadius: 4,
                        padding: "2px 6px",
                      }}>
                        24/7 ER
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <MapPin size={11} />{place.address}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <Clock size={11} />{place.hours}
                    </span>
                  </div>
                  {place.note && (
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4, fontStyle: "italic" }}>
                      {place.note}
                    </p>
                  )}
                </div>
                <a
                  href={`tel:${place.phone.replace(/[^0-9+]/g, "")}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "9px 16px",
                    borderRadius: 10,
                    background: "var(--primary)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={13} />
                  {place.phone}
                </a>
              </div>
            ))}
          </div>

          {/* Utilities */}
          <div style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 20,
          }}>
            Utility &amp; Municipal Services
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {utilities.map((util) => {
              const Icon = util.icon;
              return (
                <a
                  key={util.name}
                  href={`tel:${util.phone.replace(/[^0-9+]/g, "")}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      background: "var(--card-bg)",
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      transition: "all 0.15s ease",
                      gap: 12,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${util.color}50`;
                      (e.currentTarget as HTMLElement).style.background = `${util.color}08`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.background = "var(--card-bg)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: `${util.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <Icon size={16} style={{ color: util.color }} />
                      </div>
                      <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>
                        {util.name}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.88rem", fontWeight: 700, color: util.color, flexShrink: 0 }}>
                      {util.phone}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Poison Control */}
          <div style={{
            marginTop: 32,
            padding: "20px 24px",
            background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
            border: "1px solid #fde68a",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <AlertTriangle size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#92400e", marginBottom: 2 }}>
                Ontario Poison Control Centre
              </div>
              <div style={{ fontSize: "0.8rem", color: "#b45309" }}>
                For poisoning emergencies:{" "}
                <a href="tel:1-800-268-9017" style={{ color: "#92400e", fontWeight: 700 }}>
                  1-800-268-9017
                </a>{" "}
                (24/7, free)
              </div>
            </div>
          </div>

          {/* County Info */}
          <div style={{
            marginTop: 16,
            padding: "16px 20px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
          }}>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: "var(--text)" }}>County of Brant:</strong>{" "}
              <a href="tel:5194426324" style={{ color: "var(--color-primary)", fontWeight: 600 }}>(519) 442-6324</a>{" "}
              · Mon–Fri 8:30am–4:30pm ·{" "}
              <a href="https://www.brant.ca" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>
                brant.ca
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
