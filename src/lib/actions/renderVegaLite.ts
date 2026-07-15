import { browser } from '$app/env';
import { attachDiagramPanzoom, destroyDiagramPanzoom } from '$lib/actions/diagramPanzoom';
import { observePencilEdges } from '$lib/actions/pencilEdge';

type EmbedResult = { finalize: () => void };
type EmbedFn = (
	el: HTMLElement,
	spec: unknown,
	opt?: Record<string, unknown>,
) => Promise<EmbedResult>;

const results = new WeakMap<HTMLElement, EmbedResult>();
const done = new WeakSet<HTMLPreElement>();
const inflight = new WeakSet<HTMLPreElement>();
let embedPromise: Promise<EmbedFn> | null = null;

function loadEmbed(): Promise<EmbedFn> {
	if (!embedPromise) {
		// https://github.com/vega/vega-embed — default export is embed(el, spec, opt)
		embedPromise = import('vega-embed').then((m) => {
			const mod = m as { default?: EmbedFn };
			return mod.default ?? (m as unknown as EmbedFn);
		});
	}
	return embedPromise;
}

function cssVar(name: string, fallback = '') {
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function siteConfig() {
	const fg = cssVar('--fg', '#d3c6aa');
	const accent = cssVar('--accent', '#a7c080');
	const muted = cssVar('--muted', '#514045');
	const mutedFg = cssVar('--muted-fg', '#9da9a0');
	const font = cssVar('--font-body', 'ui-monospace, monospace');
	const border = cssVar('--border', mutedFg);

	return {
		background: null,
		font,
		axis: {
			domainColor: fg,
			gridColor: border,
			gridOpacity: 0.35,
			labelColor: fg,
			titleColor: fg,
			tickColor: fg,
			labelFont: font,
			titleFont: font,
			labelFontSize: 11,
			titleFontSize: 12,
		},
		legend: {
			labelColor: fg,
			titleColor: fg,
			labelFont: font,
			titleFont: font,
		},
		view: { stroke: null },
		range: { category: [accent, mutedFg, muted, fg] },
		// default mark stroke/fill — rule/axis overlays pick this up
		mark: { color: fg, fill: accent, stroke: fg },
		rule: { color: fg, stroke: fg, strokeWidth: 2 },
		text: { color: fg, font, fontSize: 12 },
		style: {
			'guide-label': { fill: fg, font },
			'guide-title': { fill: fg, font },
		},
	};
}

function teardown(host: HTMLElement | null) {
	if (!host) return;
	const prev = results.get(host);
	if (!prev) return;
	try {
		prev.finalize();
	} catch {
		/* */
	}
	results.delete(host);
}

async function paint(pre: HTMLPreElement, embed: EmbedFn) {
	if (inflight.has(pre)) return;
	inflight.add(pre);

	try {
		const src = (pre.dataset.source ?? pre.textContent ?? '').trim();
		if (!src) return;
		pre.dataset.source = src;

		let spec: unknown;
		try {
			spec = JSON.parse(src);
		} catch (e) {
			done.add(pre);
			pre.dataset.error = '1';
			pre.replaceChildren(
				document.createTextNode(e instanceof Error ? e.message : 'Invalid JSON'),
			);
			pre.style.opacity = '1';
			return;
		}

		const old = pre.querySelector<HTMLElement>('.vega-host');
		teardown(old);

		const host = document.createElement('div');
		host.className = 'vega-host';
		host.style.width = '100%';
		host.style.minHeight = '240px';
		pre.replaceChildren(host);

		// docs: embed(el, spec, opt) → { view, spec, vgSpec, finalize }
		const result = await embed(host, spec, {
			mode: 'vega-lite',
			renderer: 'svg',
			actions: false,
			defaultStyle: true,
			tooltip: false,
			config: siteConfig(),
		});
		results.set(host, result);
		done.add(pre);

		const svg = host.querySelector('svg');
		if (svg) {
			svg.classList.add('pencil-edge');
			svg.style.maxWidth = '100%';
			svg.style.height = 'auto';
			attachDiagramPanzoom(svg, pre);
			observePencilEdges(pre);
		}

		pre.classList.add('is-ready');
		pre.removeAttribute('data-error');
		pre.style.opacity = '1';
	} catch (e) {
		console.error('Vega-Lite render error:', e);
		done.add(pre);
		pre.dataset.error = '1';
		pre.replaceChildren(document.createTextNode(e instanceof Error ? e.message : String(e)));
		pre.style.opacity = '1';
	} finally {
		inflight.delete(pre);
	}
}

async function paintMissing(root: HTMLElement, embed: EmbedFn) {
	for (const pre of root.querySelectorAll<HTMLPreElement>('pre.vega-lite')) {
		if (done.has(pre) || inflight.has(pre)) continue;
		await paint(pre, embed);
	}
}

export function renderVegaLite(container: HTMLElement) {
	if (!browser) return { destroy() {} };

	let dead = false;
	let mo: MutationObserver | undefined;
	let themeMo: MutationObserver | undefined;

	(async () => {
		const embed = await loadEmbed();
		if (dead) return;

		await paintMissing(container, embed);

		// Svelte may mount <entry.component /> after action runs
		mo = new MutationObserver(() => {
			if (dead) return;
			void paintMissing(container, embed);
		});
		mo.observe(container, { childList: true, subtree: true });

		themeMo = new MutationObserver(() => {
			if (dead) return;
			for (const pre of container.querySelectorAll<HTMLPreElement>('pre.vega-lite')) {
				done.delete(pre);
				void paint(pre, embed);
			}
		});
		themeMo.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		});
	})().catch((e) => console.error('vega-embed load failed:', e));

	return {
		destroy() {
			dead = true;
			mo?.disconnect();
			themeMo?.disconnect();
			destroyDiagramPanzoom(container);
			for (const host of container.querySelectorAll<HTMLElement>('.vega-host')) {
				teardown(host);
			}
		},
	};
}
