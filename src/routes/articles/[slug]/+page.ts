import { error } from '@sveltejs/kit';
import { loadPageEntriesAsync } from '$lib/data/server';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;
	const posts = await loadPageEntriesAsync(slug);

	if (posts.length === 0) {
		error(404, 'Article not found');
	}

	return {
		posts,
	};
};
