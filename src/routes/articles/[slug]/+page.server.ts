import { error, redirect } from '@sveltejs/kit';
import { selectTranslation } from '$lib/content/policy';
import { publicationContext } from '$lib/content/publication';
import { getArticleTranslations } from '$lib/content/queries.server';
import { extractLocaleFromUrl } from '$lib/paraglide/runtime';
import { listArticleSlugs } from '$lib/server/article-repository.server';
import type { Language } from '$lib/types';
import { getLocalizedPath } from '$lib/utils/localized-url';
import type { PageServerLoad } from './$types';

export const entries = () => listArticleSlugs(publicationContext()).map((slug) => ({ slug }));

export const prerender = true;

export const load: PageServerLoad = ({ params, url }) => {
	const context = publicationContext();
	const translations = getArticleTranslations(params.slug, context);
	if (translations.length === 0) error(404, 'Article not found');

	const locale = (extractLocaleFromUrl(url) === 'vi' ? 'vi' : 'en') as Language;
	const article = translations.find((translation) => translation.lang === locale);
	if (!article) {
		const fallback = selectTranslation(translations, locale)!;
		redirect(307, getLocalizedPath(url.pathname, fallback.lang));
	}
	return { article, translations };
};
