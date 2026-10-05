import cfg from '$lib/config';
import type { PostMeta } from '$lib/types';
import { isPublished } from './policy';
import type { PublicationContext } from './types';

export function publicationContext(now = Date.now()): PublicationContext {
	return {
		mode: import.meta.env.DEV ? 'preview' : 'public',
		now,
		scheduledMarginMs: cfg.posts.scheduledPostMargin,
	};
}

export function isArticlePublic(metadata: PostMeta, context = publicationContext()): boolean {
	return isPublished(metadata, context);
}
