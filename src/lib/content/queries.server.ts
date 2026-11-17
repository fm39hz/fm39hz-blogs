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
import { buildSeriesInfo } from './series';
import type { ArticleCard, ArticleSummary, PublicationContext, SeriesInfo } from './types';

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
	return buildSeriesInfo(
		currentSlug,
		seriesMeta,
		selectCatalogArticles(publicArticles(context), locale),
	);
}
