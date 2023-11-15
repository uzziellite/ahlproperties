import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
//import sitemap from '@astrojs/sitemap';
//import prefetch from '@astrojs/prefetch';
//import node from '@astrojs/node';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	site:'https://www.ahlproperties.co.ke',
	integrations:[
		tailwind(),
		svelte(),/*
		sitemap({
			customPages:[
				'https://www.ahlproperties.co.ke/',
				'https://www.ahlproperties.co.ke/about',
				'https://www.ahlproperties.co.ke/properties',
				'https://www.ahlproperties.co.ke/blog',
				'https://www.ahlproperties.co.ke/videos',
				'https://www.ahlproperties.co.ke/gallery',
				'https://www.ahlproperties.co.ke/contact',
				'https://www.ahlproperties.co.ke/help',
				'https://www.ahlproperties.co.ke/reviews'
			]
		}),*/
		//prefetch()
	],
	output:"server",
	/*adapter: node({
    mode: 'standalone'
  })*/
  adapter:vercel()
});
