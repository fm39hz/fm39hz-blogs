import { listArticleSlugs } from '$lib/data/server';

export const entries = () => listArticleSlugs().map((slug) => ({ slug }));

export const prerender = true;
