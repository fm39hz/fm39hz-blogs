import type { Language, PostMeta } from '$lib/types';
import type { ArchiveYearGroup, ArticleSummary, ContentHeading, PublicationContext } from './types';

export function contentLocale(
	fileName: string,
	declared?: string,
	fallback: Language = 'en',
): Language {
	const suffix = fileName.match(/\.(en|vi)\.md$/)?.[1];
	if (declared !== undefined && declared !== 'en' && declared !== 'vi') {
		throw new Error(`${fileName}: unsupported content language ${declared}`);
	}
	if (suffix && declared && suffix !== declared) {
		throw new Error(
			`${fileName}: filename language ${suffix} conflicts with lang: ${declared}`,
		);
	}
	return (declared ?? suffix ?? fallback) as Language;
}

export function contentSlug(fileName: string): string {
	return fileName.replace(/\.(en|vi)\.md$/, '').replace(/\.md$/, '');
}

export function isPublished(metadata: PostMeta, context: PublicationContext): boolean {
	if (context.mode === 'preview') return true;
	return (
		!metadata.draft &&
		new Date(metadata.pubDatetime).getTime() - context.scheduledMarginMs < context.now
	);
}

export function selectTranslation<T extends { lang: Language }>(
	entries: T[],
	locale: Language,
): T | undefined {
	return (
		entries.find((entry) => entry.lang === locale) ??
		entries.find((entry) => entry.lang === 'en') ??
		entries[0]
	);
}

export function selectCatalogArticles(
	articles: ArticleSummary[],
	locale: Language,
): ArticleSummary[] {
	const bySlug = new Map<string, ArticleSummary[]>();
	for (const article of articles) {
		const translations = bySlug.get(article.slug) ?? [];
		translations.push(article);
		bySlug.set(article.slug, translations);
	}
	return [...bySlug.values()].flatMap((translations) => {
		const selected = selectTranslation(translations, locale);
		return selected ? [selected] : [];
	});
}

export function selectHomepageArticles<T extends { lang: Language }>(
	articles: T[],
	locale: Language,
): T[] {
	return articles.filter((article) => article.lang === locale);
}

export function assertEquivalentHeadings(
	left: ContentHeading[],
	right: ContentHeading[],
	label: string,
): void {
	const index = Array.from({ length: Math.max(left.length, right.length) }).findIndex(
		(_, i) => left[i]?.depth !== right[i]?.depth,
	);
	if (index >= 0) {
		throw new Error(
			`${label}: bilingual TOC differs at heading ${index + 1} ` +
				`(${left[index] ? `h${left[index].depth}: ${left[index].text}` : 'missing'} / ` +
				`${right[index] ? `h${right[index].depth}: ${right[index].text}` : 'missing'}). ` +
				'Keep corresponding sections in the same order and at the same heading level.',
		);
	}
}

export function translatedFragment(
	fragment: string,
	current: ContentHeading[],
	target: ContentHeading[],
): string {
	let id: string;
	try {
		id = decodeURIComponent(fragment.replace(/^#/, ''));
	} catch {
		return '';
	}
	const index = current.findIndex((heading) => heading.id === id);
	return index >= 0 && target[index] ? `#${target[index].id}` : '';
}

export function sortArticles<T extends { metadata: PostMeta }>(articles: T[]): T[] {
	return [...articles].sort((a, b) => {
		const aDate = a.metadata.modDatetime ?? a.metadata.pubDatetime;
		const bDate = b.metadata.modDatetime ?? b.metadata.pubDatetime;
		return new Date(bDate).getTime() - new Date(aDate).getTime();
	});
}

export function groupArticlesByYearAndMonth<T extends { metadata: PostMeta }>(
	articles: T[],
): ArchiveYearGroup<T>[] {
	const years = new Map<string, Map<number, T[]>>();
	for (const article of articles) {
		const date = new Date(article.metadata.pubDatetime);
		const year = String(date.getFullYear());
		const month = date.getMonth() + 1;
		const months = years.get(year) ?? new Map<number, T[]>();
		const entries = months.get(month) ?? [];
		entries.push(article);
		months.set(month, entries);
		years.set(year, months);
	}
	return [...years.entries()]
		.sort(([left], [right]) => Number(right) - Number(left))
		.map(([year, months]) => ({
			year,
			monthGroups: [...months.entries()]
				.sort(([left], [right]) => right - left)
				.map(([month, posts]) => ({ month, posts })),
		}));
}
