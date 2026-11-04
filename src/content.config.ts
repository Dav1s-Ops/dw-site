import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
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

const work = defineCollection({
    loader: file('src/data/work.yaml'),
    schema: z.object({
        title: z.string(),
        company: z.string(),
        website: z.url().optional(),
        start: z.coerce.date(),
        end: z.coerce.date().optional(), // omit = current
        summary: z.string(),
        stack: z.array(z.string()),
    }),
});

const projects = defineCollection({
  loader: file('src/data/projects.yaml'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      stack: z.string(),
      image: image(),
      order: z.number(),
      links: z.array(z.object({ label: z.string(), href: z.url() })),
    }),
});

export const collections = { posts, projects, work };