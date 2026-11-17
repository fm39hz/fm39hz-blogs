import type { Language, PostMeta } from '$lib/types';
import type { SeriesInfo, SeriesPart } from './types';

export interface SeriesValidationEntry {
	name: string;
	slug: string;
	lang: Language;
	metadata: PostMeta;
}

export function validateSeriesEntries(entries: readonly SeriesValidationEntry[]): void {
	const translations = new Map<string, SeriesValidationEntry[]>();
	for (const entry of entries) {
		const group = translations.get(entry.slug) ?? [];
		group.push(entry);
		translations.set(entry.slug, group);
	}

	for (const [slug, group] of translations) {
		const memberships = group.map((entry) => entry.metadata.series);
		const hasSeries = memberships.some((series) => series !== undefined);
		if (!hasSeries || memberships.every((series) => series === undefined)) continue;

		if (memberships.some((series) => series === undefined)) {
			throw new Error(`${slug}: translations must declare the same series membership`);
		}

		const first = memberships[0]!;
		if (
			memberships.some(
				(series) =>
					series!.id !== first.id ||
					series!.order !== first.order ||
					series!.title !== first.title,
			)
		) {
			throw new Error(`${slug}: translations must declare the same series metadata`);
		}
	}

	const seriesByLocale = new Map<string, SeriesValidationEntry[]>();
	for (const entry of entries) {
		const series = entry.metadata.series;
		if (!series) continue;
		const key = `${series.id}\0${entry.lang}`;
		const group = seriesByLocale.get(key) ?? [];
		group.push(entry);
		seriesByLocale.set(key, group);
	}

	for (const group of seriesByLocale.values()) {
		const first = group[0].metadata.series!;
		const orders = new Map<number, SeriesValidationEntry>();
		for (const entry of group) {
			const series = entry.metadata.series!;
			const duplicate = orders.get(series.order);
			if (duplicate) {
				throw new Error(
					`${first.id}: duplicate order ${series.order} in ${entry.lang} (${duplicate.name}, ${entry.name})`,
				);
			}
			orders.set(series.order, entry);
			if (series.title !== first.title) {
				throw new Error(
					`${first.id}: inconsistent series title in ${entry.lang} (${entry.name})`,
				);
			}
		}
	}
}

export function buildSeriesInfo(
	currentSlug: string,
	seriesMeta: NonNullable<PostMeta['series']>,
	articles: readonly {
		slug: string;
		lang: Language;
		metadata: PostMeta;
	}[],
): SeriesInfo {
	const matches: SeriesPart[] = articles
		.flatMap((article) => {
			const series = article.metadata.series;
			if (!series || series.id !== seriesMeta.id) return [];
			return [
				{
					slug: article.slug,
					title: article.metadata.title,
					order: series.order,
					lang: article.lang,
					isCurrent: article.slug === currentSlug,
				},
			];
		})
		.sort((a, b) => a.order - b.order);

	const currentIndex = matches.findIndex((part) => part.isCurrent);
	return {
		id: seriesMeta.id,
		title: seriesMeta.title,
		currentOrder: seriesMeta.order,
		totalParts: matches.length,
		parts: matches,
		prev: currentIndex > 0 ? matches[currentIndex - 1] : undefined,
		next:
			currentIndex >= 0 && currentIndex < matches.length - 1
				? matches[currentIndex + 1]
				: undefined,
	};
}
