import type { Language } from './types';

export interface ContentHeading {
	id: string;
	text: string;
	depth: number;
}

export function selectTranslation<T extends { lang: string }>(
	entries: T[],
	locale: string,
): T | undefined {
	return (
		entries.find((entry) => entry.lang === locale) ??
		entries.find((entry) => entry.lang === 'en') ??
		entries[0]
	);
}

/** Catalogs show one variant per article; only the homepage excludes fallback articles. */
export function selectLocalizedPosts<T extends { slug: string; lang: string }>(
	posts: T[],
	locale: string,
	strict = false,
): T[] {
	if (strict) return posts.filter((post) => post.lang === locale);
	const groups = new Map<string, T[]>();
	for (const post of posts) {
		const entries = groups.get(post.slug) ?? [];
		entries.push(post);
		groups.set(post.slug, entries);
	}
	return [...groups.values()].map((entries) => selectTranslation(entries, locale)!);
}

/** Filename suffix and frontmatter must agree; legacy unsuffixed files default to EN. */
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

/** Compare all content heading levels, including headings hidden in the sidebar. */
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
