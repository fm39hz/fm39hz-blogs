import { getTopicTags } from '$lib/content/queries.server';
import { localeFromUrl } from '$lib/utils/localized-url';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => ({
	tags: getTopicTags(localeFromUrl(url)),
});
