import { loadArticleRenderings } from '$lib/content/renderer';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
	const [article] = await loadArticleRenderings([data.article]);
	return { ...data, article };
};
