import { browser } from '$app/env';
import { enhanceFigure, readFigureSource } from '$lib/actions/figureSurface';

type EmbedResult = { finalize: () => void };
type EmbedFn = (
	el: HTMLElement,
	spec: unknown,
	opt?: Record<string, unknown>,
) => Promise<EmbedResult>;

const results = new WeakMap<HTMLElement, EmbedResult>();
const done = new WeakSet<HTMLElement>();
const inflight = new WeakSet<HTMLElement>();
let embedPromise: Promise<EmbedFn> | null = null;

function loadEmbed(): Promise<EmbedFn> {
	if (!embedPromise) {
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

/** Shared CSS-var theme → Vega config (same tokens as mermaid themeVariables). */
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
	} catch (err) {
		console.warn('vega finalize:', err);
	}
	results.delete(host);
}

const DIAGRAM_SEL = 'figure.vega-lite, pre.vega-lite';

async function paint(el: HTMLElement, embed: EmbedFn) {
	if (inflight.has(el)) return;
	inflight.add(el);

	try {
		// data-source first; never leave JSON as text nodes for readers
		let src = readFigureSource(el);
		if (!src) src = (el.textContent ?? '').trim();
		if (!src) return;
		el.dataset.source = src;
		el.classList.add('figure-surface');

		let spec: unknown;
		try {
			spec = JSON.parse(src);
		} catch (e) {
			done.add(el);
			el.dataset.error = '1';
			el.replaceChildren(
				document.createTextNode(e instanceof Error ? e.message : 'Invalid chart data'),
			);
			return;
		}

		const old = el.querySelector<HTMLElement>('.vega-host');
		teardown(old);

		const host = document.createElement('div');
		host.className = 'vega-host';
		host.style.width = '100%';
		host.style.minHeight = '240px';
		el.replaceChildren(host);

		const result = await embed(host, spec, {
			mode: 'vega-lite',
			renderer: 'svg',
			actions: false,
			defaultStyle: true,
			tooltip: false,
			config: siteConfig(),
		});
		results.set(host, result);
		done.add(el);

		const svg = host.querySelector('svg');
		const desc =
			(spec && typeof spec === 'object' && 'description' in spec
				? String((spec as { description?: string }).description ?? '')
				: '') ||
			el.getAttribute('aria-label') ||
			'Chart';
		if (svg) {
			svg.style.maxWidth = '100%';
			svg.style.height = 'auto';
			await enhanceFigure(el, svg, {
				source: src,
				panzoom: true,
				pencil: true,
				label: desc,
			});
			el.classList.add('is-ready');
		}

		el.removeAttribute('data-error');
	} catch (e) {
		console.error('Vega-Lite render error:', e);
		done.add(el);
		el.dataset.error = '1';
		el.replaceChildren(document.createTextNode('Chart failed to render.'));
	} finally {
		inflight.delete(el);
	}
}

async function paintMissing(root: HTMLElement, embed: EmbedFn) {
	for (const el of root.querySelectorAll<HTMLElement>(DIAGRAM_SEL)) {
		if (done.has(el) || inflight.has(el)) continue;
		await paint(el, embed);
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

		mo = new MutationObserver(() => {
			if (dead) return;
			void paintMissing(container, embed);
		});
		mo.observe(container, { childList: true, subtree: true });

		themeMo = new MutationObserver(() => {
			if (dead) return;
			for (const el of container.querySelectorAll<HTMLElement>(DIAGRAM_SEL)) {
				done.delete(el);
				void paint(el, embed);
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
			for (const host of container.querySelectorAll<HTMLElement>('.vega-host')) {
				teardown(host);
			}
		},
	};
}
