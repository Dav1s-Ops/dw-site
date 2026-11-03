import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '@/lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'DW Code Blog',
    description: 'Notes on .NET, React, Rails, DevOps and music.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description,
      categories: [...p.data.categories, ...p.data.tags],
      link: `/blog/${p.id}/`,
    })),
  });
}