import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Categories of services
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    icon: v.string(),
    order: v.number(),
    featured: v.optional(v.boolean()),
  }).index("by_slug", ["slug"]),

  // Real Paris Ontario businesses
  businesses: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    longDescription: v.optional(v.string()),
    categorySlug: v.string(),
    categoryName: v.string(),
    services: v.array(v.string()),
    phone: v.string(),
    email: v.optional(v.string()),
    website: v.optional(v.string()),
    address: v.string(),
    city: v.string(),            // always "Paris"
    province: v.string(),        // always "ON"
    postalCode: v.optional(v.string()),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    verified: v.boolean(),
    featured: v.boolean(),
    emergency247: v.optional(v.boolean()),
    hours: v.optional(v.array(v.object({
      day: v.string(),
      open: v.string(),
      close: v.string(),
    }))),
    tags: v.array(v.string()),
    imageUrl: v.optional(v.string()),
    source: v.string(),           // where we verified this info
    lastVerified: v.string(),     // ISO date
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categorySlug"])
    .index("by_featured", ["featured"]),

  // Quick quote requests
  quotes: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    service: v.string(),
    description: v.string(),
    categorySlug: v.string(),
    preferredContact: v.string(),  // "phone", "email", "text"
    status: v.string(),            // "new", "sent", "completed"
    submittedAt: v.number(),
  }).index("by_status", ["status"]),

  // Local events
  events: defineTable({
    title: v.string(),
    slug: v.optional(v.string()),
    description: v.string(),
    date: v.string(),
    endDate: v.optional(v.string()),
    time: v.optional(v.string()),
    location: v.string(),
    address: v.optional(v.string()),
    category: v.string(),          // "festival", "market", "community", "sports"
    imageUrl: v.optional(v.string()),
    website: v.optional(v.string()),
    featured: v.boolean(),
    source: v.string(),
  }).index("by_date", ["date"]),

  // Curated local guides
  guides: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),           // markdown
    category: v.string(),          // "new-resident", "seasonal", "trail", "dining"
    imageUrl: v.optional(v.string()),
    published: v.boolean(),
    order: v.number(),
  }).index("by_slug", ["slug"]),

  // Contact form submissions
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
    submittedAt: v.number(),
  }),
});
