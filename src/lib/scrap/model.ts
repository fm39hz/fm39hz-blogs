/**
 * Notebook scrap = one visual unit in prose that can be copied.
 *
 * Payloads come from component props (code source, prerendered SVG markup),
 * never from reading the rendered DOM.
 */

import { copyText } from '$lib/utils/clipboard';

export type ScrapKind = 'code' | 'figure';

export type ScrapPayload = {
	/** Canonical text for clipboard / paste into notes */
	text: string;
	/** Optional rich image (diagram/chart), produced on demand */
	image?: () => Promise<Blob>;
};

/** Same stylesheet host the site loads its webfonts from (`+layout.svelte`). */
const FONT_CSS_ENDPOINT = 'https://fonts.googleapis.com/css2';

/** Glyphs painted by the SVG's text nodes (entities decoded loosely; extras are harmless). */
function glyphs(svg: string): string {
	const text = [...svg.matchAll(/>([^<]+)</g)]
		.map((m) => m[1])
		.join('')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, '&');
	return [...new Set(text.replace(/\s/g, ''))].join('');
}

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
async function fontFace(fontStack: string, chars: string): Promise<string> {
	const family = fontStack
		.split(',')[0]
		?.trim()
		.replace(/^['"]|['"]$/g, '');
	if (!family || !chars) return '';
	try {
		const query = `family=${encodeURIComponent(family)}&text=${encodeURIComponent(chars)}`;
		const css = await (await fetch(`${FONT_CSS_ENDPOINT}?${query}`)).text();
		const url = /url\((https:[^)]+)\)/.exec(css)?.[1];
		if (!url) return '';
		const data = toBase64(await (await fetch(url)).arrayBuffer());
		return `@font-face{font-family:'${family}';src:url(data:font/woff2;base64,${data}) format('woff2');}`;
	} catch {
		return '';
	}
}

/**
 * Rasterize prerendered SVG markup to PNG. `scope` is the element whose
 * computed custom properties the SVG paints with (theme tokens, renderer
 * aliases); they are pinned into a standalone <style> along with the font.
 */
export async function svgToPng(svg: string, scope: Element): Promise<Blob> {
	const style = getComputedStyle(scope);
	const vars = [...new Set([...svg.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]))]
		.map((name) => [name, style.getPropertyValue(name).trim()])
		.filter(([, value]) => value)
		.map(([name, value]) => `${name}:${value}`)
		.join(';');
	const face = await fontFace(style.getPropertyValue('--diagram-font'), glyphs(svg));
	const standalone = svg.replace(
		/<svg\b[^>]*>/,
		(open) => `${open}<style>${face}:root{${vars}}</style>`,
	);

	const width = Number(/\bwidth="([\d.]+)"/.exec(svg)?.[1]) || 800;
	const height = Number(/\bheight="([\d.]+)"/.exec(svg)?.[1]) || 600;
	const scale = Math.max(2, globalThis.devicePixelRatio || 1);

	const url = URL.createObjectURL(
		new Blob([standalone], { type: 'image/svg+xml;charset=utf-8' }),
	);
	try {
		const img = new Image();
		img.src = url;
		await img.decode();
		const canvas = new OffscreenCanvas(width * scale, height * scale);
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
