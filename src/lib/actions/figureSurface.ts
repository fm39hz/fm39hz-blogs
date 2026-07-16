import { attachDiagramPanzoom, destroyDiagramPanzoom } from '$lib/actions/diagramPanzoom';
import { observePencilEdges } from '$lib/actions/pencilEdge';

/** Shared post-render surface options — same bag for mermaid, vega, img, future. */
export type FigureSurfaceOptions = {
	/** Raw source (mermaid text, vega JSON, image path…) for copy — attribute only, never text node. */
	source?: string;
	/** Middle-drag pan + pinch/shift zoom (default true) */
	panzoom?: boolean;
	/** Pencil-edge filter — meaningful for SVG (default: media is SVG) */
	pencil?: boolean;
	/** Accessible name for the figure (reader modes / AT). */
	label?: string;
};

export type FigureMedia = SVGElement | HTMLImageElement;

const enhanced = new WeakSet<HTMLElement>();

function readBool(el: HTMLElement, key: string, fallback: boolean): boolean {
	const v = el.dataset[key];
	if (v === undefined) return fallback;
	return v === 'true' || v === '';
}

/** Read diagram source from data-source (URI-encoded or plain). Never from text children. */
export function readFigureSource(el: HTMLElement): string {
	const raw = el.getAttribute('data-source') ?? el.dataset.source ?? '';
	if (!raw) return '';
	try {
		// encodeURIComponent output is safe to decode; plain source also ok (decode is no-op-ish for simple text)
		return decodeURIComponent(raw);
	} catch {
		return raw;
	}
}

/**
 * Apply notebook surface UX to a rendered visual.
 * Producer-agnostic: only needs a scrap root + media node.
 * Source stays on data-source only — no text-node dump for reader modes.
 */
export async function enhanceFigure(
	surface: HTMLElement,
	media: FigureMedia,
	opts: FigureSurfaceOptions = {},
) {
	const panzoom = opts.panzoom ?? readBool(surface, 'panzoom', true);
	const isSvg = media instanceof SVGElement;
	const pencil = opts.pencil ?? (isSvg ? readBool(surface, 'pencil', true) : false);

	surface.classList.add('figure-surface');
	if (opts.source != null) {
		// Keep plain (decoded) for copy; attribute, not child text
		surface.dataset.source = opts.source;
	}
	surface.dataset.panzoom = panzoom ? 'true' : 'false';
	surface.dataset.pencil = pencil ? 'true' : 'false';
	surface.style.opacity = '1';

	// Prefer real <figure>; role only when shell is not figure (legacy pre)
	if (surface.tagName !== 'FIGURE') {
		surface.setAttribute('role', 'figure');
	}
	const label = opts.label ?? surface.dataset.label ?? surface.getAttribute('aria-label') ?? '';
	if (label) surface.setAttribute('aria-label', label);

	if (isSvg) {
		media.setAttribute('role', 'img');
		if (label && !media.getAttribute('aria-label')) {
			media.setAttribute('aria-label', label);
		}
	}

	// Drop leftover text / code nodes (readers extract text; SSOT visual = media only).
	for (const child of [...surface.childNodes]) {
		if (child === media || (child instanceof Element && child.contains(media))) continue;
		if (child instanceof HTMLElement && child.classList.contains('vega-host')) continue;
		if (child.nodeType === Node.TEXT_NODE) child.remove();
		else if (
			child instanceof HTMLElement &&
			(child.classList.contains('figure-source') || child.tagName === 'CODE')
		) {
			child.remove();
		}
	}

	if (pencil && isSvg) {
		media.classList.add('pencil-edge');
		observePencilEdges(surface);
	}

	if (panzoom) {
		await attachDiagramPanzoom(media, surface);
	}

	enhanced.add(surface);
}

export function isFigureSurface(el: HTMLElement): boolean {
	return el.classList.contains('figure-surface') || enhanced.has(el);
}

/** Find media inside a surface (svg preferred, then img). */
export function figureMedia(surface: HTMLElement): FigureMedia | null {
	return (
		surface.querySelector<SVGElement>('svg') ??
		surface.querySelector<HTMLImageElement>('img') ??
		null
	);
}

/**
 * Enhance any unenhanced `.figure-surface` under root (manual markup / late DOM).
 */
export async function enhanceFigureSurfaces(root: ParentNode) {
	const nodes = root.querySelectorAll<HTMLElement>('.figure-surface');
	for (const surface of nodes) {
		if (enhanced.has(surface)) continue;
		const media = figureMedia(surface);
		if (!media) continue;
		await enhanceFigure(surface, media, {
			source: readFigureSource(surface) || undefined,
			panzoom: readBool(surface, 'panzoom', true),
			pencil: readBool(surface, 'pencil', media instanceof SVGElement),
		});
	}
}

/** Svelte action: watch article for figure surfaces + destroy panzoom on teardown. */
export function figureSurfaces(container: HTMLElement) {
	let dead = false;
	let mo: MutationObserver | undefined;

	void enhanceFigureSurfaces(container);

	mo = new MutationObserver(() => {
		if (dead) return;
		void enhanceFigureSurfaces(container);
	});
	mo.observe(container, { childList: true, subtree: true });

	return {
		destroy() {
			dead = true;
			mo?.disconnect();
			destroyDiagramPanzoom(container);
		},
	};
}
