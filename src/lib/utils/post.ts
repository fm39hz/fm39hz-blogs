import cfg from '$lib/config';
import type { PostMeta } from '$lib/types';

export function postFilter({ metadata }: { metadata: PostMeta }): boolean {
	if (import.meta.env.DEV) return true;
	const margin = cfg.posts.scheduledPostMargin;
	const isPublished = Date.now() > new Date(metadata.pubDatetime).getTime() - margin;
	return !metadata.draft && isPublished;
}
