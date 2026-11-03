// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { unified } from "@astrojs/markdown-remark";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: 'https://dw-code-blog.dev',
  integrations: [react(), sitemap()],
  adapter: cloudflare({imageService: 'compile'}),
  image: { layout: 'constrained'},
  // No Astro.session usage; stops the adapter injecting an unconfigured SESSION KV binding
  session: false,
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: { include: ['nanostores', '@nanostores/react'] },
    ssr: { optimizeDeps: { include: ['nanostores', '@nanostores/react'] } },
  },
    markdown: {
    processor: unified({
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      ],
    }),
  },
});