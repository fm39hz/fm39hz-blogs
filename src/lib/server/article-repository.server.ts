import { contentLocale, contentSlug } from '$lib/content/policy';
import { isArticlePublic } from '$lib/content/publication';
import type { ArticleSummary, PublicationContext } from '$lib/content/types';
import type { Language, PostMeta } from '$lib/types';

const metadataModules = import.meta.glob<PostMeta>('/src/content/articles/*.md', {
	eager: true,
	import: 'metadata',
	query: '?metadata',
});

function fileNameOf(path: string): string {
	return path.split('/').pop()!;
}

export function listArticleSummaries(context: PublicationContext): ArticleSummary[] {
	return Object.entries(metadataModules).flatMap(([path, source]) => {
		const lang = contentLocale(fileNameOf(path), source.lang);
		if (!isArticlePublic(source, context)) return [];
		return [{ slug: contentSlug(fileNameOf(path)), lang, metadata: { ...source, lang } }];
	});
}

export function listArticleSlugs(context: PublicationContext): string[] {
	return [...new Set(listArticleSummaries(context).map((article) => article.slug))];
}

export function findArticleTranslations(
	slug: string,
	context: PublicationContext,
	locales?: Language[],
): ArticleSummary[] {
	return listArticleSummaries(context).filter(
		(article) => article.slug === slug && (!locales || locales.includes(article.lang)),
	);
}
