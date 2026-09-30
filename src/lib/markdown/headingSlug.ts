/**
 * Single source of truth for heading anchor slugs.
 *
 * ASCII-fold first (strip Vietnamese diacritics, đ→d), then apply
 * github-slugger for lowercasing, space→dash and collision suffixes.
 * Folding before slugging keeps URLs ASCII-only and shareable instead
 * of leaking raw Unicode fragments like `#tại-sao-lại-là-...`.
 *
 * Used by:
 *   - `remarkHeadingSlugs` (build pipeline) → stamps `hProperties.id`
 *     so both `remark-toc` links and `rehype-slug` anchors agree.
 *   - `buildCopyMarkdown` (clipboard export) → same slugs as the site.
 */

import GithubSlugger from 'github-slugger';
import type { Root } from 'mdast';
import mdastToString from 'mdast-util-to-string';
import visit from 'unist-util-visit';

/** Fold Vietnamese/Unicode text to a bare ASCII slug seed (no dedup). */
export function asciiFold(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'D');
}

/** ASCII-fold then github-slugger. Pass a shared slugger for collision suffixes. */
export function asciiSlug(text: string, slugger: GithubSlugger): string {
	return slugger.slug(asciiFold(text));
}

/**
 * Remark plugin: stamp ASCII-fold ids on every heading.
 *
 * Runs before `remark-toc` so the generated TOC links use these ids,
 * and before mdast→hast so `hProperties.id` carries onto the heading
 * element — `rehype-slug` then leaves the already-set id untouched.
 */
export function remarkHeadingSlugs() {
	return (tree: Root) => {
		const slugger = new GithubSlugger();
		visit(tree, 'heading', (node) => {
			const text = mdastToString(node);
			if (!text) return;
			const id = asciiSlug(text, slugger);
			const data: { hProperties?: { id?: string } } = (node.data ??= {});
			data.hProperties ??= {};
			data.hProperties.id = id;
		});
	};
}
