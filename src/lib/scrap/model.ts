/**
 * Notebook scrap = one visual unit in prose that can be copied.
 * Same essence; source/presentation vary by kind.
 *
 * Contract:
 * - code:   <pre><code>…</code></pre>  — payload text = code text
 * - figure: <figure.diagram data-kind data-source> + media — payload text = data-source;
 *           optional image from rendered SVG/img
 *
 * Source never lives as extractable child text for figures (reader/SEO SSOT).
 */

import { readFigureSource } from '$lib/actions/figureSurface';
import { copyText } from '$lib/utils/clipboard';

export type ScrapKind = 'code' | 'figure';

export type ScrapPayload = {
	kind: ScrapKind;
	/** Canonical text for clipboard / paste into notes */
	text: string;
	/** Optional rich image (diagram/chart) */
	image?: Blob;
};

/** True figure shell (current + legacy pre shells). */
export function isFigureScrap(el: Element): el is HTMLElement {
	if (!(el instanceof HTMLElement)) return false;
	if (el.matches('figure.diagram')) return true;
	if (el.classList.contains('figure-surface') && el.dataset.source != null) return true;
	// legacy pre shells before/during migrate
	if (el.matches('pre.mermaid, pre.vega-lite')) return true;
	return false;
}

export function isCodeScrap(el: Element): el is HTMLPreElement {
	if (!(el instanceof HTMLElement)) return false;
	if (el.tagName !== 'PRE') return false;
	if (isFigureScrap(el)) return false;
	// shiki / mdsvex: usually pre>code; also bare pre with text
	const pre = el as HTMLPreElement;
	if (pre.querySelector('code')) return true;
	const t = (pre.textContent ?? '').trim();
	return t.length > 0;
}

export function scrapKind(el: Element): ScrapKind | null {
	if (isFigureScrap(el)) return 'figure';
	if (isCodeScrap(el)) return 'code';
	return null;
}

/** All scrap roots under container (query once, both kinds). */
export function queryScraps(root: ParentNode): HTMLElement[] {
	const out: HTMLElement[] = [];
	const seen = new Set<Element>();

	for (const el of root.querySelectorAll(
		'figure.diagram, figure.figure-surface, pre.figure-surface, pre.mermaid, pre.vega-lite, .figure-surface[data-source], pre.shiki, pre',
	)) {
		if (seen.has(el)) continue;
		// never treat nested pre inside figure as scrap root
		if (el.parentElement?.closest('figure.diagram, .figure-surface')) {
			if (el.tagName === 'PRE' && !isFigureScrap(el)) continue;
		}
		const kind = scrapKind(el);
		if (!kind) continue;
		seen.add(el);
		out.push(el as HTMLElement);
	}
	return out;
}

/** Canonical text payload for a scrap. */
export function scrapText(el: HTMLElement): string {
	const kind = scrapKind(el);
	if (kind === 'figure') return readFigureSource(el);
	if (kind === 'code') {
		const code = el.querySelector('code');
		return (code?.innerText ?? el.textContent ?? '').trim();
	}
	return '';
}

function svgToPng(svg: SVGSVGElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const clone = svg.cloneNode(true) as SVGSVGElement;
		if (!clone.getAttribute('xmlns')) {
			clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		}

		const s = getComputedStyle(document.documentElement);
		const accentColor = s.getPropertyValue('--accent').trim() || '#6f884c';
		const fgColor = s.getPropertyValue('--fg').trim() || '#2d3129';
		const bgColor = s.getPropertyValue('--bg').trim() || '#fdf6e3';

		let svgString = new XMLSerializer().serializeToString(clone);
		svgString = svgString
			.replace(/var\(--fg\)/g, fgColor)
			.replace(/var\(--accent\)/g, accentColor)
			.replace(/var\(--bg\)/g, bgColor);

		const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
		const url = URL.createObjectURL(svgBlob);
		const img = new Image();
		const rect = svg.getBoundingClientRect();
		const scale = window.devicePixelRatio || 2;
		const width = (rect.width || 800) * scale;
		const height = (rect.height || 600) * scale;

		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(new Error('no 2d'));
				return;
			}
			const style = getComputedStyle(svg.closest('.figure-surface') || svg || document.body);
			ctx.fillStyle = style.backgroundColor || bgColor;
			ctx.fillRect(0, 0, width, height);
			ctx.drawImage(img, 0, 0, width, height);
			canvas.toBlob((blob) => {
				URL.revokeObjectURL(url);
				if (blob) resolve(blob);
				else reject(new Error('toBlob null'));
			}, 'image/png');
		};
		img.onerror = (e) => {
			URL.revokeObjectURL(url);
			reject(e);
		};
		img.src = url;
	});
}

function imgToPng(img: HTMLImageElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas');
		const w = img.naturalWidth || img.width || 800;
		const h = img.naturalHeight || img.height || 600;
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			reject(new Error('no 2d'));
			return;
		}
		ctx.drawImage(img, 0, 0, w, h);
		canvas.toBlob((blob) => {
			if (blob) resolve(blob);
			else reject(new Error('toBlob null'));
		}, 'image/png');
	});
}

/** Build clipboard payload (text always; image when figure has media). */
export async function scrapPayload(el: HTMLElement): Promise<ScrapPayload | null> {
	const kind = scrapKind(el);
	if (!kind) return null;

	if (kind === 'code') {
		const text = scrapText(el);
		return text ? { kind, text } : null;
	}

	const text = scrapText(el);
	const svg = el.querySelector('svg');
	const img = el.querySelector('img');

	if (svg) {
		try {
			const image = await svgToPng(svg);
			return { kind, text, image };
		} catch {
			return text ? { kind, text } : null;
		}
	}
	if (img?.src) {
		try {
			const image = await imgToPng(img);
			return { kind, text: text || img.alt || img.src, image };
		} catch {
			return text || img.src ? { kind, text: text || img.src } : null;
		}
	}
	return text ? { kind, text } : null;
}

/** Write scrap to clipboard (unified). */
export async function copyScrap(el: HTMLElement): Promise<boolean> {
	const payload = await scrapPayload(el);
	if (!payload) return false;

	if (payload.image) {
		try {
			const parts: Record<string, Blob> = { 'image/png': payload.image };
			if (payload.text) {
				parts['text/plain'] = new Blob([payload.text], { type: 'text/plain' });
			}
			await navigator.clipboard.write([new ClipboardItem(parts)]);
			return true;
		} catch {
			// fall through to text
		}
	}
	if (!payload.text) return false;
	return copyText(payload.text);
}
