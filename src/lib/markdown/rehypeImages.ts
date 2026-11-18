/**
 * Prose images become `Components.ArticleImage`, which renders the authored
 * `<img>` plus its copy action. The element stays the same in the DOM (same
 * `src`/`alt`/`title`, same prose styling, same lightbox hit target).
 *
 * Skipped, deliberately:
 *   - images inside `a` — the copy button would nest a control in a link;
 *   - images inside `table` — cells feed the mobile card stack as HTML strings,
 *     which cannot compile Svelte components;
 *   - images with `width`/`height`/`style` — the author set a layout the
 *     wrapper would not reproduce.
 */

import type { Element, Parents, Root } from 'hast';
import { type ArticleImageProps, emitComponent } from '../components/content/contract';
import { isElement, isParent } from './hast';

const SKIP_SUBTREE = new Set(['a', 'table']);
/** Attributes that mean "keep the plain <img>": author-chosen geometry. */
const SIZING = ['width', 'height', 'style'];

function propsOf(image: Element): ArticleImageProps | null {
	const { src, alt, title } = image.properties;
	if (typeof src !== 'string' || !src) return null;
	if (SIZING.some((name) => image.properties[name] !== undefined)) return null;
	return {
		src,
		alt: typeof alt === 'string' ? alt : '',
		...(typeof title === 'string' && title ? { title } : {}),
	};
}

export function rehypeImages() {
	return (tree: Root) => {
		const walk = (parent: Parents) => {
			for (let index = 0; index < parent.children.length; index++) {
				const child = parent.children[index];
				if (!isElement(child)) {
					if (isParent(child)) walk(child);
					continue;
				}
				if (SKIP_SUBTREE.has(child.tagName)) continue;
				if (child.tagName === 'img') {
					const props = propsOf(child);
					if (props) {
						parent.children[index] = {
							type: 'raw',
							value: emitComponent('ArticleImage', props),
						};
					}
					continue;
				}
				walk(child);
			}
		};

		walk(tree);
	};
}
