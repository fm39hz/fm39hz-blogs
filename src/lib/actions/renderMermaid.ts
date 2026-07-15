import { browser } from '$app/env';
import { enhanceFigure } from '$lib/actions/figureSurface';

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

export function renderMermaid(container: HTMLElement) {
	const blocks = [...container.querySelectorAll<HTMLPreElement>('pre.mermaid')];
	if (!blocks.length || !browser || !mermaidPromise) return { destroy() {} };

	(async () => {
		const mermaid = await mermaidPromise;
		const t = siteThemeVariables();

		// Capture source before mermaid replaces pre contents
		for (const pre of blocks) {
			if (!pre.dataset.source) pre.dataset.source = pre.textContent ?? '';
		}

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

		try {
			await mermaid.run({ nodes: blocks });
			for (const pre of blocks) {
				pre.classList.add('figure-surface');
				const svg = pre.querySelector('svg');
				if (svg) {
					await enhanceFigure(pre, svg, {
						source: pre.dataset.source,
						panzoom: true,
						pencil: true,
					});
					pre.classList.add('is-ready');
				} else {
					pre.style.opacity = '1';
				}
			}
		} catch (e) {
			console.error('Mermaid render error:', e);
			for (const pre of blocks) pre.style.opacity = '1';
		}
	})();

	return { destroy() {} };
}
