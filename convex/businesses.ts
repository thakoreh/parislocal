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

    return results;
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
    return await q.take(args.limit ?? 6);
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
