// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dw-code-blog.dev',
  integrations: [react(), sitemap()],
  adapter: cloudflare({imageService: 'compile'}),
  image: { layout: 'constrained'},
  vite: {
    plugins: [tailwindcss()]
  },
});