import type { PostMeta } from '$lib/types';

export const entries = () => {
	const modules = import.meta.glob<{ metadata: PostMeta }>('/src/content/posts/*.md', {
		eager: true,
	});
	const slugs = new Set<string>();
	for (const path of Object.keys(modules)) {
		const file = path.split('/').pop()!;
		const slug = file.replace(/\.(en|vi)\.md$/, '').replace(/\.md$/, '');
		slugs.add(slug);
	}
	return Array.from(slugs).map((slug) => ({ slug }));
};

export const prerender = true;
