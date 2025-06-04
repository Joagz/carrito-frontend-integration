import { defineCollection, z } from "astro:content";

const products = defineCollection({
    schema: z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        stock: z.number(),
        description: z.string(),
        image: z.string()
    })
});

export const collections = { products };
