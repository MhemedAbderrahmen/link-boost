import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { links } from "@/server/db/schema";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";

export const linkRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(links).values({
        name: input.name,
        secretKey: randomBytes(32).toString("hex")
      });
    }),
    
    getAvailability: publicProcedure.input(z.object({ name: z.string().min(1) })).query(async ({ ctx, input }) => {
        const link = await ctx.db.query.links.findFirst({
          where(fields) {
            return eq(fields.name, input.name);
          },
        });
        
        console.log("🚀 ~ getAvailability:publicProcedure.input ~ link:", link)
        
        return link === null;
    }),
});
