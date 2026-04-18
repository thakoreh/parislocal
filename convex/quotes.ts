import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    service: v.string(),
    description: v.string(),
    categorySlug: v.string(),
    preferredContact: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("quotes", {
      ...args,
      status: "new",
      submittedAt: Date.now(),
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("quotes").order("desc").collect();
  },
});
