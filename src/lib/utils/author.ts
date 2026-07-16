import cfg from '$lib/config';
import type { PostMeta } from '$lib/types';

export function resolveAuthor(meta: Pick<PostMeta, 'author'> | null | undefined): string {
	return meta?.author || cfg.site.author;
}
