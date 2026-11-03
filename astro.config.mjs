// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { unified } from "@astrojs/markdown-remark";
import rehypeExternalLinks from "rehype-external-links";
import expressiveCode from 'astro-expressive-code';
import rehypeLightbox from './src/plugins/rehype-lightbox.ts';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://dw-code-blog.dev',
  integrations: [
    expressiveCode({
      themes: ['github-dark-default'],
      styleOverrides: {
        borderColor: '#363636',
        borderRadius: '6px',
        codeFontFamily: "'B612 Mono', monospace",
        frames: { editorTabBarBackground: '#333', terminalTitlebarBackground: '#333' },
      },
    }),
    react(),
    sitemap(),
    pagefind(),
  ],
  adapter: cloudflare({imageService: 'compile'}),
  image: {
    layout: 'constrained',
    remotePatterns: [{ protocol: 'https', hostname: 'img.dav1s.dev' }],
  },
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
        rehypeLightbox,
      ],
    }),
  },
});