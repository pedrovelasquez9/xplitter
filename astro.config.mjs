import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://programacion-es.dev/',
  base: "/xplitter",
  integrations: [svelte()]
});
