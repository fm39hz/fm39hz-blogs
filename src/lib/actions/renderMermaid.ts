import { browser } from '$app/env';
import { attachDiagramPanzoom } from '$lib/actions/diagramPanzoom';
import { observePencilEdges } from '$lib/actions/pencilEdge';

const mermaidPromise = browser ? import('mermaid').then((m) => m.default) : null;

export function renderMermaid(container: HTMLElement) {
	const blocks = [...container.querySelectorAll<HTMLPreElement>('pre.mermaid')];
	if (!blocks.length) return { destroy() {} };

	if (browser && mermaidPromise) {
		(async () => {
			const mermaid = await mermaidPromise;
			const s = getComputedStyle(document.documentElement);
			const bg = s.getPropertyValue('--bg').trim();
			const fg = s.getPropertyValue('--fg').trim();
			const accent = s.getPropertyValue('--accent').trim();
			const muted = s.getPropertyValue('--muted').trim();

			mermaid.initialize({
				startOnLoad: false,
				fontFamily: s.getPropertyValue('--font-body').trim() || 'sans-serif',
				theme: 'base',
				look: 'handDrawn',
				flowchart: {
					htmlLabels: false,
				},
				themeVariables: {
					primaryColor: muted || bg,
					primaryBorderColor: accent,
					primaryTextColor: fg,
					lineColor: fg,
					textColor: fg,
					mainBkg: 'transparent',
					actorBkg: muted || bg,
					actorBorder: accent,
					actorTextColor: fg,
					signalColor: fg,
					signalTextColor: fg,
					labelBoxBkgColor: muted || bg,
					labelBoxBorderColor: accent,
					labelTextColor: fg,
					loopBkgColor: muted || bg,
					loopBorderColor: accent,
					noteBkgColor: muted || bg,
					noteBorderColor: accent,
					noteTextColor: fg,
					edgeLabelBackground: bg,
				},
			});

			try {
				await mermaid.run({ nodes: blocks });
				for (const pre of blocks) {
					const svg = pre.querySelector('svg');
					if (svg) {
						svg.classList.add('pencil-edge');
						void attachDiagramPanzoom(svg, pre);
						observePencilEdges(pre);
					}
					pre.style.opacity = '1';
				}
			} catch (e) {
				console.error('Mermaid render error:', e);
				for (const pre of blocks) {
					pre.style.opacity = '1';
				}
			}
		})();
	}

	return {
		destroy() {},
	};
}
