import { browser } from '$app/env';
import { enhanceFigure, readFigureSource } from '$lib/actions/figureSurface';

const mermaidPromise = browser ? import('mermaid').then((m) => m.default) : null;

function siteThemeVariables() {
	const s = getComputedStyle(document.documentElement);
	const bg = s.getPropertyValue('--bg').trim();
	const fg = s.getPropertyValue('--fg').trim();
	const accent = s.getPropertyValue('--accent').trim();
	const muted = s.getPropertyValue('--muted').trim();
	return {
		fontFamily: s.getPropertyValue('--font-body').trim() || 'sans-serif',
		bg,
		fg,
		accent,
		muted,
	};
}

function svgFromString(svgMarkup: string): SVGSVGElement | null {
	const doc = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml');
	const el = doc.documentElement;
	if (!(el instanceof SVGSVGElement) || el.querySelector('parsererror')) return null;
	return document.importNode(el, true);
}

let mmdSeq = 0;

/**
 * We force flowchart.htmlLabels:false so nodes stay pure SVG (pencil/panzoom).
 * Mermaid then rejects HTML breaks in labels — only real newlines work.
 * Authors still write <br/> (htmlLabels idiom); normalize here, not in MD.
 */
function normalizeMermaidSource(src: string): string {
	return src.replace(/<br\s*\/?>/gi, '\n').replace(/&lt;br\s*\/?&gt;/gi, '\n');
}

/** Client paint: <figure.diagram.mermaid data-source> → SVG only (no DSL text nodes). */
export function renderMermaid(container: HTMLElement) {
	const blocks = [...container.querySelectorAll<HTMLElement>('figure.mermaid, pre.mermaid')];
	if (!blocks.length || !browser || !mermaidPromise) return { destroy() {} };

	(async () => {
		const mermaid = await mermaidPromise;
		const t = siteThemeVariables();

		mermaid.initialize({
			startOnLoad: false,
			fontFamily: t.fontFamily,
			theme: 'base',
			look: 'handDrawn',
			flowchart: { htmlLabels: false },
			themeVariables: {
				primaryColor: t.muted || t.bg,
				primaryBorderColor: t.accent,
				primaryTextColor: t.fg,
				lineColor: t.fg,
				textColor: t.fg,
				mainBkg: 'transparent',
				actorBkg: t.muted || t.bg,
				actorBorder: t.accent,
				actorTextColor: t.fg,
				signalColor: t.fg,
				signalTextColor: t.fg,
				labelBoxBkgColor: t.muted || t.bg,
				labelBoxBorderColor: t.accent,
				labelTextColor: t.fg,
				loopBkgColor: t.muted || t.bg,
				loopBorderColor: t.accent,
				noteBkgColor: t.muted || t.bg,
				noteBorderColor: t.accent,
				noteTextColor: t.fg,
				edgeLabelBackground: t.bg,
			},
		});

		for (const el of blocks) {
			let source = readFigureSource(el);
			if (!source) source = (el.textContent ?? '').trim();
			if (!source) {
				el.style.opacity = '1';
				continue;
			}
			// keep original for copy; render with SVG-safe labels
			el.dataset.source = source;
			const renderSrc = normalizeMermaidSource(source);
			el.replaceChildren();

			try {
				const id = `mmd-${++mmdSeq}`;
				const { svg } = await mermaid.render(id, renderSrc);
				const svgEl = svgFromString(svg);
				if (svgEl) {
					el.replaceChildren(svgEl);
					await enhanceFigure(el, svgEl, {
						source,
						panzoom: true,
						pencil: true,
						label: el.getAttribute('aria-label') || 'Diagram',
					});
					el.classList.add('is-ready');
				} else {
					el.replaceChildren(document.createTextNode('Diagram failed to render.'));
				}
			} catch (e) {
				console.error('Mermaid render error:', e);
				el.replaceChildren(document.createTextNode('Diagram failed to render.'));
			}
		}
	})();

	return { destroy() {} };
}
