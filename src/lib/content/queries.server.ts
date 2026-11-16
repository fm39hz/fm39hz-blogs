import {
	groupArticlesByYearAndMonth,
	selectCatalogArticles,
	selectHomepageArticles,
	sortArticles,
} from '$lib/content/policy';
import { publicationContext } from '$lib/content/publication';
import {
	findArticleTranslations,
	listArticleSummaries,
} from '$lib/server/article-repository.server';
import { getUniqueTags, slugifyAll } from '$lib/tags';
import type { Language, SeriesMeta } from '$lib/types';
import type {
	ArticleCard,
	ArticleSummary,
	PublicationContext,
	SeriesInfo,
	SeriesPart,
} from './types';

function publicArticles(context = publicationContext()) {
	return listArticleSummaries(context);
}

function card(article: ArticleSummary): ArticleCard {
	const { title, description, pubDatetime, modDatetime, featured, tags } = article.metadata;
	return {
		slug: article.slug,
		lang: article.lang,
		metadata: {
			title,
			description,
			pubDatetime,
			modDatetime,
			featured,
			tags,
			lang: article.lang,
		},
	};
}

export function getHomepageArticles(locale: Language, context?: PublicationContext) {
	return sortArticles(selectHomepageArticles(publicArticles(context), locale)).map(card);
}

export function getCatalogArticles(locale: Language, context?: PublicationContext) {
	return sortArticles(selectCatalogArticles(publicArticles(context), locale)).map(card);
}

export function getAllPublicArticles(context?: PublicationContext) {
	return sortArticles(publicArticles(context)).map(card);
}

export function getArticleTranslations(slug: string, context?: PublicationContext) {
	return findArticleTranslations(slug, context ?? publicationContext());
}

export function getArchiveArticles(locale: Language, context?: PublicationContext) {
	return groupArticlesByYearAndMonth(getCatalogArticles(locale, context));
}

export function getTopicTags(locale: Language, context?: PublicationContext) {
	return getUniqueTags(getCatalogArticles(locale, context));
}

export function getArticlesForTopic(tag: string, locale: Language, context?: PublicationContext) {
	return getCatalogArticles(locale, context).filter((article) =>
		slugifyAll(article.metadata.tags).includes(tag),
	);
}

export function getArticleSeries(
	currentSlug: string,
	seriesMeta: SeriesMeta,
	locale: Language,
	context?: PublicationContext,
): SeriesInfo {
	const articles = selectCatalogArticles(publicArticles(context), locale);
	const matches: SeriesPart[] = articles
		.filter((article) => article.metadata.series?.id === seriesMeta.id)
		.map((article) => ({
			slug: article.slug,
			title: article.metadata.title,
			order: article.metadata.series!.order,
			lang: article.lang,
			isCurrent: article.slug === currentSlug,
		}))
		.sort((a, b) => a.order - b.order);

	const currentIndex = matches.findIndex((p) => p.isCurrent);
	const prev = currentIndex > 0 ? matches[currentIndex - 1] : undefined;
	const next =
		currentIndex >= 0 && currentIndex < matches.length - 1
			? matches[currentIndex + 1]
			: undefined;

	return {
		id: seriesMeta.id,
		title: seriesMeta.title,
		currentOrder: seriesMeta.order,
		totalParts: matches.length,
		parts: matches,
		prev,
		next,
	};
}
