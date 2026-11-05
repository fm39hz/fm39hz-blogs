import type { Language } from '$lib/locale';
import { getLocalizedPath } from '$lib/utils/localized-url';
import { type ArticleDiscoveryState, serializeDiscoveryState } from './article-discovery';

/** Build the canonical localized URL for a search query and selected topics. */
export function articleDiscoveryPath(state: ArticleDiscoveryState, locale: Language): string {
	const params = serializeDiscoveryState(state);
	const query = params.toString();
	return getLocalizedPath(`/search${query ? `?${query}` : ''}`, locale);
}
