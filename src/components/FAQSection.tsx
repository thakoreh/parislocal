"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "Is it free to list my business on ParisLocal?",
    answer:
      "Yes! Basic listings are completely free. You can add your business name, contact info, services, and serving areas at no cost. We also offer premium featured listings for businesses that want additional visibility.",
  },
  {
    question: "How are businesses verified?",
    answer:
      "We verify businesses by confirming their business license, insurance, and physical location in or near Paris, Ontario. Verified businesses display a green checkmark badge on their profile. We also monitor reviews and community feedback to maintain trust.",
  },
  {
    question: "What areas does ParisLocal serve?",
    answer:
      "ParisLocal covers Paris, Brantford, Cambridge, Burford, St. George, Scotland, Mt. Pleasant, Glen Morris, Ayr, New Dundee, Puslinch, and North Dumfries. If your business serves any of these areas, you can list it here.",
  },
  {
    question: "How do I leave a review for a business?",
    answer:
      "Simply visit the business profile page and click the 'Write a Review' button. You can rate the business from 1 to 5 stars and share your experience. All reviews are moderated to ensure they are genuine and helpful.",
  },
  {
    question: "Can I request a quote through ParisLocal?",
    answer:
      "ParisLocal connects you directly with local businesses. You can call, email, or visit their website to request a quote. We believe in direct communication between customers and businesses with no middleman.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="section-badge" style={{ marginBottom: 16 }}>
            FAQ
          </span>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginTop: 16,
              color: "var(--text)",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginTop: 12,
              fontSize: "1.05rem",
            }}
          >
            Everything you need to know about ParisLocal.
          </p>
        </div>

        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item${openIndex === index ? " open" : ""}`}
            >
              <button
                onClick={() => toggle(index)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "var(--text)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  gap: 16,
                }}
              >
                <span>{faq.question}</span>
                <ChevronRight
                  className="faq-chevron"
                  size={20}
                  style={{ flexShrink: 0, color: "var(--text-muted)" }}
                />
              </button>
              <div className="faq-answer">
                <p
                  style={{
                    padding: "0 24px 20px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
