import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    categorySlug: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q;
    if (args.categorySlug) {
      q = ctx.db
        .query("businesses")
        .withIndex("by_category", (q) => q.eq("categorySlug", args.categorySlug!));
    } else if (args.featured) {
      q = ctx.db
        .query("businesses")
        .withIndex("by_featured", (q) => q.eq("featured", true));
    } else {
      q = ctx.db.query("businesses");
    }
    let results = await q.collect();

    if (args.search) {
      const term = args.search.toLowerCase();
      results = results.filter(
        (b) =>
          b.name.toLowerCase().includes(term) ||
          b.description.toLowerCase().includes(term) ||
          b.services.some((s) => s.toLowerCase().includes(term)) ||
          b.tags.some((t) => t.toLowerCase().includes(term))
      );
    }

    // Attach upvote counts
    const businessIds = results.map((b) => b._id);
    const upvoteCounts: Record<string, number> = {};
    for (const id of businessIds) {
      const upvotes = await ctx.db
        .query("upvotes")
        .withIndex("by_business", (q) => q.eq("businessId", id))
        .collect();
      upvoteCounts[id] = upvotes.length;
    }

    return results.map((b) => ({ ...b, upvoteCount: upvoteCounts[b._id] ?? 0 }));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("businesses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const q = ctx.db
      .query("businesses")
      .withIndex("by_featured", (q) => q.eq("featured", true));
    const results = await q.take(args.limit ?? 6);
    const upvoteCounts: Record<string, number> = {};
    for (const b of results) {
      const upvotes = await ctx.db
        .query("upvotes")
        .withIndex("by_business", (q) => q.eq("businessId", b._id))
        .collect();
      upvoteCounts[b._id] = upvotes.length;
    }
    return results.map((b) => ({ ...b, upvoteCount: upvoteCounts[b._id] ?? 0 }));
  },
});

export const create = mutation({
  args: {
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
    city: v.string(),
    province: v.string(),
    postalCode: v.optional(v.string()),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    verified: v.boolean(),
    featured: v.boolean(),
    emergency247: v.optional(v.boolean()),
    hours: v.optional(
      v.array(
        v.object({ day: v.string(), open: v.string(), close: v.string() })
      )
    ),
    tags: v.array(v.string()),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("businesses", {
      ...args,
      lastVerified: new Date().toISOString().split("T")[0],
    });
  },
});

// Upvote count for a single business
export const getUpvotes = query({
  args: { businessId: v.id("businesses") },
  handler: async (ctx, args) => {
    const upvotes = await ctx.db
      .query("upvotes")
      .withIndex("by_business", (q) => q.eq("businessId", args.businessId))
      .collect();
    return upvotes.length;
  },
});

// Upvote count for all businesses (batch)
export const getUpvotesBatch = query({
  args: { businessIds: v.array(v.id("businesses")) },
  handler: async (ctx, args) => {
    const result: Record<string, number> = {};
    for (const id of args.businessIds) {
      const upvotes = await ctx.db
        .query("upvotes")
        .withIndex("by_business", (q) => q.eq("businessId", id))
        .collect();
      result[id] = upvotes.length;
    }
    return result;
  },
});

// Toggle upvote (add if not exists, remove if exists)
export const toggleUpvote = mutation({
  args: { businessId: v.id("businesses"), sessionId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("upvotes")
      .withIndex("by_session_business", (q) =>
        q.eq("sessionId", args.sessionId).eq("businessId", args.businessId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { action: "removed" as const };
    } else {
      await ctx.db.insert("upvotes", {
        businessId: args.businessId,
        sessionId: args.sessionId,
        createdAt: Date.now(),
      });
      return { action: "added" as const };
    }
  },
});

// Get which businesses a session has upvoted
export const getMyUpvotes = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const upvotes = await ctx.db
      .query("upvotes")
      .filter((q) => q.eq(q.field("sessionId"), args.sessionId))
      .collect();
    return upvotes.map((u) => u.businessId);
  },
});
