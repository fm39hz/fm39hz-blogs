import type { Component } from 'svelte';
import type { PostMeta } from '$lib/types';
import { contentLocale, contentSlug } from './policy';
import type { ArticleSummary, RenderedArticle } from './types';

const pageModules = import.meta.glob<{ default: Component; metadata: PostMeta }>(
	'/src/content/articles/*.md',
);

const rawModules = import.meta.glob<string>('/src/content/articles/*.md', {
	query: '?raw',
	import: 'default',
});

function fileNameOf(path: string): string {
	return path.split('/').pop()!;
}

/** Load rendered bodies only for the translations already selected by the route. */
export function loadArticleRenderings(articles: ArticleSummary[]): Promise<RenderedArticle[]> {
	const wanted = new Map(articles.map((article) => [`${article.slug}:${article.lang}`, article]));
	const matches = Object.entries(pageModules).filter(([path]) => {
		const name = fileNameOf(path);
		return wanted.has(`${contentSlug(name)}:${contentLocale(name)}`);
	});
	return Promise.all(
		matches.map(async ([path, importFn]) => {
			const fileName = fileNameOf(path);
			const article = wanted.get(`${contentSlug(fileName)}:${contentLocale(fileName)}`)!;
			const [module, raw] = await Promise.all([
				importFn(),
				rawModules[path]?.() ?? Promise.resolve(''),
			]);
			return {
				...article,
				component: module.default,
				raw: typeof raw === 'string' ? raw : '',
			};
		}),
	);
}
