/**
 * Notebook scrap = one visual unit in prose that can be copied.
 *
 * Payloads come from component props (code source, prerendered diagram art),
 * never from reading the rendered DOM.
 */

import type { DiagramArt } from '$lib/components/content/contract';
import { FONT_CSS_API } from '$lib/design-system/tokens/fonts';
import { copyText } from '$lib/utils/clipboard';

export type ScrapKind = 'code' | 'figure';

export type ScrapPayload = {
	/** Canonical text for clipboard / paste into notes */
	text: string;
	/** Optional rich image (diagram/chart), produced on demand */
	image?: () => Promise<Blob>;
};

/** The stylesheet Google returns references one font file; take its URL. */
const FONT_FILE_URL = /url\((https:[^)]+)\)/;
const SVG_NS = 'http://www.w3.org/2000/svg';

function toBase64(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer);
	let binary = '';
	for (let i = 0; i < bytes.length; i += 0x8000) {
		binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
	}
	return btoa(binary);
}

/**
 * An SVG decoded as an image cannot load webfonts, so inline the diagram font
 * as a data URL — subset to just the glyphs used (Google Fonts `text=`).
 * Returns '' when offline; the PNG then falls back to a system font.
 */
async function fontFace({ family, glyphs }: DiagramArt['font']): Promise<string> {
	if (!glyphs) return '';
	try {
		const query = new URLSearchParams({ family, text: glyphs });
		const css = await (await fetch(`${FONT_CSS_API}?${query}`)).text();
		const url = FONT_FILE_URL.exec(css)?.[1];
		if (!url) return '';
		const data = toBase64(await (await fetch(url)).arrayBuffer());
		return `@font-face{font-family:'${family}';src:url(data:font/woff2;base64,${data}) format('woff2');}`;
	} catch {
		return '';
	}
}

/**
 * Rasterize prerendered diagram art to PNG. `scope` is the element whose
 * computed custom properties the SVG paints with (`art.paint`); they are pinned
 * in a wrapper <svg> together with the font, so the image matches the page.
 */
export async function diagramToPng(art: DiagramArt, scope: Element): Promise<Blob> {
	const style = getComputedStyle(scope);
	const pinned = art.paint
		.map((name) => [name, style.getPropertyValue(name).trim()] as const)
		.filter(([, value]) => value)
		.map(([name, value]) => `${name}:${value}`)
		.join(';');
	const face = await fontFace(art.font);
	const standalone = `<svg xmlns="${SVG_NS}" width="${art.width}" height="${art.height}"><style>${face}:root{${pinned}}</style>${art.svg}</svg>`;

	const scale = Math.max(2, globalThis.devicePixelRatio || 1);
	const url = URL.createObjectURL(
		new Blob([standalone], { type: 'image/svg+xml;charset=utf-8' }),
	);
	try {
		const img = new Image();
		img.src = url;
		await img.decode();
		const canvas = new OffscreenCanvas(art.width * scale, art.height * scale);
		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('no 2d');
		ctx.fillStyle = style.getPropertyValue('--diagram-surface').trim();
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		return await canvas.convertToBlob({ type: 'image/png' });
	} finally {
		URL.revokeObjectURL(url);
	}
}

/** Write a scrap to the clipboard: PNG + text when an image exists, else text. */
export async function copyScrap(payload: ScrapPayload): Promise<boolean> {
	if (payload.image) {
		try {
			// Pass the pending Blob so the clipboard write stays inside the user gesture (Safari).
			const parts: Record<string, Blob | Promise<Blob>> = { 'image/png': payload.image() };
			if (payload.text)
				parts['text/plain'] = new Blob([payload.text], { type: 'text/plain' });
			await navigator.clipboard.write([new ClipboardItem(parts)]);
			return true;
		} catch {
			// fall through to text
		}
	}
	return payload.text ? copyText(payload.text) : false;
}
