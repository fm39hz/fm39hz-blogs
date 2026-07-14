import type { PostMeta } from '$lib/types';
import { parseSlug } from '$lib/utils/slug';

export const entries = () => {
	const modules = import.meta.glob<PostMeta>('/src/content/articles/*.md', {
		eager: true,
		import: 'metadata',
	});
	const slugs = new Set<string>();
	for (const path of Object.keys(modules)) {
		const fileName = path.split('/').pop()!;
		slugs.add(parseSlug(fileName));
	}
	return Array.from(slugs).map((slug) => ({ slug }));
};

export const prerender = true;
