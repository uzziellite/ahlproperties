import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import prefetch from '@astrojs/prefetch';
//import node from '@astrojs/node';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	site:'https://ahlproperties.co.ke',
	integrations:[
		tailwind(),
		svelte(),
		sitemap(),
		prefetch()
	],
	output:"server",
	/*adapter: node({
    mode: 'standalone'
  })*/
  adapter:vercel()
});
