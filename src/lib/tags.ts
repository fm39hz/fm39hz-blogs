import type { PostMeta } from '$lib/types';
import { slugifyStr } from './utils/slug';

export { slugifyAll, slugifyStr } from './utils/slug';

export function getUniqueTags(posts: { metadata: PostMeta }[]): { tag: string; tagName: string }[] {
	const tags = posts
		.flatMap((post) => post.metadata.tags)
		.map((tag) => ({ tag: slugifyStr(tag), tagName: tag }))
		.filter((value, index, self) => self.findIndex((t) => t.tag === value.tag) === index)
		.sort((a, b) => a.tag.localeCompare(b.tag));
	return tags;
}
