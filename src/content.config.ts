import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from "astro/zod";
import { CATEGORY_KEYS } from "./lib/categories";

const posts = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
    schema: ({image}) =>
        z.object({
            title: z.string(),
            description: z.string().max(200).optional(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            status: z.enum(['draft', 'published']).default('published'),
            categories: z.array(z.enum(CATEGORY_KEYS)).min(1, 'Everypost needs atleast 1 category'),
            tags: z.array(z.string()).min(1, 'Every post needs atleast 1 tag'),
            cover: image().optional(),
        }),
});

export const collections = { posts };