import { MD_EXT_REGEX, SLUG_REGEX } from '$lib/constants';
import type { PostMeta } from '$lib/types';

function parseSlug(fileName: string): string {
	return fileName.replace(SLUG_REGEX, '').replace(MD_EXT_REGEX, '');
}

export const entries = () => {
	const modules = import.meta.glob<{ metadata: PostMeta }>('/src/content/logs/*.md', {
		eager: true,
	});
	const slugs = new Set<string>();
	for (const path of Object.keys(modules)) {
		const fileName = path.split('/').pop()!;
		slugs.add(parseSlug(fileName));
	}
	return Array.from(slugs).map((slug) => ({ slug }));
};

export const prerender = true;
