import { getArchiveArticles } from '$lib/content/queries.server';
import { extractLocaleFromUrl } from '$lib/paraglide/runtime';
import type { Language } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => ({
	years: getArchiveArticles((extractLocaleFromUrl(url) === 'vi' ? 'vi' : 'en') as Language),
});
