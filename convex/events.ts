import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUpcoming = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const all = await ctx.db
      .query("events")
      .withIndex("by_date")
      .order("asc")
      .collect();
    const now = new Date().toISOString().split("T")[0];
    return all
      .filter((e) => e.date >= now)
      .slice(0, args.limit ?? 20);
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});
