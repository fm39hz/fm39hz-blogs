import kebabcase from 'lodash.kebabcase';
import slugify from 'slugify';
import type { PostMeta } from '$lib/types';
import { postFilter } from '$lib/utils';

const hasNonLatin = (str: string): boolean => /[^ -~]/.test(str);

export function slugifyStr(str: string): string {
	if (hasNonLatin(str)) return kebabcase(str);
	return slugify(str, { lower: true });
}

export function slugifyAll(arr: string[]): string[] {
	return arr.map((s) => slugifyStr(s));
}

export function getUniqueTags(posts: { metadata: PostMeta }[]): { tag: string; tagName: string }[] {
	const tags = posts
		.filter(postFilter)
		.flatMap((post) => post.metadata.tags)
		.map((tag) => ({ tag: slugifyStr(tag), tagName: tag }))
		.filter((value, index, self) => self.findIndex((t) => t.tag === value.tag) === index)
		.sort((a, b) => a.tag.localeCompare(b.tag));
	return tags;
}
