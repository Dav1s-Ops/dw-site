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
  // No Astro.session usage; stops the adapter injecting an unconfigured SESSION KV binding
  session: false,
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: { include: ['nanostores', '@nanostores/react'] },
    ssr: { optimizeDeps: { include: ['nanostores', '@nanostores/react'] } },
  },
});