import { getArchiveArticles } from '$lib/content/queries.server';
import { localeFromUrl } from '$lib/utils/localized-url';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => ({
	years: getArchiveArticles(localeFromUrl(url)),
});
