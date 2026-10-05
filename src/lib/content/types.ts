import type { Component } from 'svelte';
import type { Language, PostMeta } from '$lib/types';

export interface ArticleSummary {
	slug: string;
	lang: Language;
	metadata: PostMeta & { lang: Language };
}

export interface ArticleTranslation {
	lang: Language;
	metadata: Pick<PostMeta, 'headings'>;
}

export interface ArticleCard {
	slug: string;
	lang: Language;
	metadata: Pick<
		PostMeta,
		'title' | 'description' | 'pubDatetime' | 'modDatetime' | 'featured' | 'tags'
	> & {
		lang: Language;
	};
}

export interface RenderedArticle extends ArticleSummary {
	component: Component;
	raw: string;
}

export interface PublicationContext {
	mode: 'preview' | 'public';
	now: number;
	scheduledMarginMs: number;
}

export interface ArchiveYearGroup<T = ArticleCard> {
	year: string;
	monthGroups: { month: number; posts: T[] }[];
}

export interface ContentHeading {
	id: string;
	text: string;
	depth: number;
}
