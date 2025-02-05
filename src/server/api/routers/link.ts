import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { links } from "@/server/db/schema";
import { randomBytes } from "crypto";

export const linkRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(links).values({
        name: input.name,
        secretKey: randomBytes(32).toString("hex")
      });
    }),
    
    getAvailability: publicProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
        const link = await ctx.db.query.links.findFirst({
          where:(table,{eq}) => eq(table.name, input.name) 
        });
        
        return link === null;
    }),
});
