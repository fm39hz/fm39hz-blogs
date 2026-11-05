import { redirect } from '@sveltejs/kit';
import { getLocalizedPath, localeFromUrl } from '$lib/utils/localized-url';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	redirect(308, getLocalizedPath('/search', localeFromUrl(url)));
};
