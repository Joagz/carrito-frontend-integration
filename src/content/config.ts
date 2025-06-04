import { defineCollection, z } from "astro:content";

const products = defineCollection({
    schema: z.object({
        name: z.string(),
        price: z.number(),
        id: z.number(),
        quantity: z.number()
    })
});

export const collections = { products };