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
import type { Heading, Root } from 'mdast';
import mdastToString from 'mdast-util-to-string';
import visit from 'unist-util-visit';
import { contentLocale } from '../content/policy';
import type { ContentHeading } from '../content/types';
import { asciiFold } from '../utils/text';
import { TOC_HEADING } from './toc';

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
	return (tree: Root, file: { filename?: string; data: { fm?: Record<string, unknown> } }) => {
		const slugger = new GithubSlugger();
		const headings: ContentHeading[] = [];
		visit(tree, 'heading', (heading: Heading) => {
			const text = mdastToString(heading);
			if (!text) return;
			const id = asciiSlug(text, slugger);
			const data: { hProperties?: { id?: string } } = (heading.data ??= {});
			data.hProperties ??= {};
			data.hProperties.id = id;
			if (heading.depth >= 2 && !TOC_HEADING.test(text)) {
				headings.push({ id, text, depth: heading.depth });
			}
		});
		if (file.data.fm) {
			const declared = file.data.fm.lang;
			file.data.fm.lang = contentLocale(
				file.filename ?? '',
				typeof declared === 'string' ? declared : undefined,
			);
			file.data.fm.headings = headings;
		}
	};
}
