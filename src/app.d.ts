// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { ArticleTranslation } from '$lib/content/types';

declare global {
	// biome-ignore lint/style/noNamespace: required by SvelteKit
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			/** Set by /articles/[slug]; drives heading-aware language switching. */
			translations?: ArticleTranslation[];
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
