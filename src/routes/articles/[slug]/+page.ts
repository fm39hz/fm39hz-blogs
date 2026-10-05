import { error, redirect } from '@sveltejs/kit';
import { selectTranslation } from '$lib/content-language';
import { loadPageEntriesAsync } from '$lib/data/server';
import { extractLocaleFromUrl } from '$lib/paraglide/runtime';
import { getLocalizedPath } from '$lib/utils/localized-url';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, url }) => {
	const { slug } = params;
	const posts = await loadPageEntriesAsync(slug);

	const lang = extractLocaleFromUrl(url) ?? 'en';
	if (posts.length === 0) {
		error(404, 'Article not found');
	}
	if (!posts.some((post) => post.lang === lang)) {
		const fallback = selectTranslation(posts, lang)!;
		redirect(307, getLocalizedPath(url.pathname, fallback.lang));
	}

	return {
		posts,
	};
};
