import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// A post is either `src/content/posts/my-post.md`
// or a folder `src/content/posts/my-post/index.md` with its images next to it.
const stripIndex = ({ entry }: { entry: string }) =>
  entry.replace(/\/index\.mdx?$/, '').replace(/\.mdx?$/, '');

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts', generateId: stripIndex }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

// Plain pages written in Markdown: About me, Cool stuff.
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages', generateId: stripIndex }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, pages };
