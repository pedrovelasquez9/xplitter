import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://programacion-es.dev/xplitter/',
  base: "./",
  integrations: [svelte()]
});
