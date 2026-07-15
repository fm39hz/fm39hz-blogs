/**
 * Diagram pan/zoom via @panzoom/panzoom — only documented APIs.
 *
 * Binding pattern (README "noBind" + "zoomWithWheel"):
 *   Panzoom(elem, { noBind: true })
 *   pointerdown → handleDown (we gate: middle button only)
 *   document pointermove → handleMove
 *   document pointerup → handleUp
 *   parent wheel → zoomWithWheel only when modifier (shift / pinch ctrl)
 *
 * Gesture policy for article reading:
 *   - plain wheel → not handled → page scrolls
 *   - shift+wheel or ctrl/meta+wheel (trackpad pinch) → zoom
 *   - middle-button drag → pan
 *   - double-click → reset
 */

type PanzoomObject = {
	destroy: () => void;
	reset: (opts?: { animate?: boolean }) => void;
	zoomWithWheel: (event: WheelEvent) => void;
	handleDown: (event: PointerEvent) => void;
	handleMove: (event: PointerEvent) => void;
	handleUp: (event: PointerEvent) => void;
};

type PanzoomFn = (
	elem: HTMLElement | SVGElement,
	options?: {
		maxScale?: number;
		minScale?: number;
		contain?: 'inside' | 'outside';
		cursor?: string;
		step?: number;
		noBind?: boolean;
		canvas?: boolean;
		touchAction?: string;
		handleStartEvent?: (event: Event) => void;
	},
) => PanzoomObject;

const instances = new WeakMap<HTMLElement, PanzoomObject>();
const cleanups = new WeakMap<HTMLElement, () => void>();

let panzoomLoader: Promise<PanzoomFn> | null = null;

function loadPanzoom(): Promise<PanzoomFn> {
	if (!panzoomLoader) {
		// Dynamic import: package has no reliable SSR default export under Vite runner
		panzoomLoader = import('@panzoom/panzoom').then((mod) => {
			const fn = (mod as { default?: PanzoomFn }).default;
			if (typeof fn !== 'function') {
				throw new Error('@panzoom/panzoom: default export is not a function');
			}
			return fn;
		});
	}
	return panzoomLoader;
}

/** Docs: shift+wheel for zoom; ctrl/meta = trackpad pinch (browser sets ctrlKey). */
function shouldZoomWithWheel(event: WheelEvent): boolean {
	return event.shiftKey || event.ctrlKey || event.metaKey;
}

export async function attachDiagramPanzoom(svg: SVGElement, _scrap: HTMLElement) {
	if (typeof window === 'undefined') return;

	const existing = svg.closest<HTMLElement>('.diagram-viewport');
	if (existing && instances.has(existing)) return;

	const parent = svg.parentElement;
	if (!parent) return;

	const Panzoom = await loadPanzoom();

	// Re-check after await (another attach may have finished)
	const raced = svg.closest<HTMLElement>('.diagram-viewport');
	if (raced && instances.has(raced)) return;

	const viewport = document.createElement('div');
	viewport.className = 'diagram-viewport';
	viewport.title = 'Middle-drag: pan · Pinch or Shift+scroll: zoom · Double-click: reset';

	const target = document.createElement('div');
	target.className = 'diagram-panzoom-target';

	parent.insertBefore(viewport, svg);
	target.appendChild(svg);
	viewport.appendChild(target);

	// Official: noBind skips default listeners; we bind per README examples.
	const panzoom = Panzoom(target, {
		maxScale: 4,
		minScale: 0.4,
		contain: 'outside',
		cursor: 'default',
		step: 0.12,
		noBind: true,
		// Allow vertical page scroll over the diagram (no forced none)
		touchAction: 'pan-y',
		// Only preventDefault when we actually start a middle-button pan
		handleStartEvent: (event) => {
			event.preventDefault();
		},
	});
	instances.set(viewport, panzoom);

	// --- pan: middle button only (docs noBind + handleDown/Move/Up) ---
	const onPointerDown = (event: PointerEvent) => {
		// 1 = middle; left (0) / right (2) never start pan
		if (event.button !== 1) return;
		// Prevent browser autoscroll affordance on middle-click
		event.preventDefault();
		panzoom.handleDown(event);
	};

	// Docs: "move and up are bound to the document, not the Panzoom element"
	const onPointerMove = panzoom.handleMove;
	const onPointerUp = panzoom.handleUp;

	// --- zoom: official shift+wheel pattern, plus pinch (ctrlKey) ---
	const onWheel = (event: WheelEvent) => {
		if (!shouldZoomWithWheel(event)) return;
		// zoomWithWheel calls preventDefault internally when it runs
		panzoom.zoomWithWheel(event);
	};

	const onDblClick = () => {
		panzoom.reset({ animate: true });
	};

	viewport.addEventListener('pointerdown', onPointerDown);
	document.addEventListener('pointermove', onPointerMove);
	document.addEventListener('pointerup', onPointerUp);
	document.addEventListener('pointercancel', onPointerUp);
	// Parent of panzoom elem = viewport (docs: bind wheel on parent)
	viewport.addEventListener('wheel', onWheel, { passive: false });
	viewport.addEventListener('dblclick', onDblClick);

	cleanups.set(viewport, () => {
		viewport.removeEventListener('pointerdown', onPointerDown);
		document.removeEventListener('pointermove', onPointerMove);
		document.removeEventListener('pointerup', onPointerUp);
		document.removeEventListener('pointercancel', onPointerUp);
		viewport.removeEventListener('wheel', onWheel);
		viewport.removeEventListener('dblclick', onDblClick);
		panzoom.destroy();
		instances.delete(viewport);
	});
}

export function destroyDiagramPanzoom(root: ParentNode) {
	for (const viewport of root.querySelectorAll<HTMLElement>('.diagram-viewport')) {
		const stop = cleanups.get(viewport);
		if (stop) {
			stop();
			cleanups.delete(viewport);
		}
	}
}
