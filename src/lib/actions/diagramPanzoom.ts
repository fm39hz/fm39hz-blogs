import Panzoom, { type PanzoomObject } from '@panzoom/panzoom';

const instances = new WeakMap<HTMLElement, PanzoomObject>();
const cleanups = new WeakMap<HTMLElement, () => void>();

/**
 * Pan + wheel zoom around a diagram SVG.
 * CSS transform only — SVG theme / pencil-edge stay intact.
 */
export function attachDiagramPanzoom(svg: SVGElement, scrap: HTMLElement) {
	// already wrapped?
	const prevViewport = svg.closest<HTMLElement>('.diagram-viewport');
	if (prevViewport && instances.has(prevViewport)) return;

	const parent = svg.parentElement;
	if (!parent) return;

	const viewport = document.createElement('div');
	viewport.className = 'diagram-viewport';

	const target = document.createElement('div');
	target.className = 'diagram-panzoom-target';

	parent.insertBefore(viewport, svg);
	target.appendChild(svg);
	viewport.appendChild(target);

	const panzoom = Panzoom(target, {
		maxScale: 4,
		minScale: 0.4,
		contain: 'outside',
		cursor: 'grab',
		step: 0.12,
	});
	instances.set(viewport, panzoom);

	const onWheel = (e: WheelEvent) => {
		e.preventDefault();
		panzoom.zoomWithWheel(e);
	};
	viewport.addEventListener('wheel', onWheel, { passive: false });

	const onDbl = () => {
		panzoom.reset({ animate: true });
	};
	viewport.addEventListener('dblclick', onDbl);

	const onDown = () => {
		viewport.style.cursor = 'grabbing';
	};
	const onUp = () => {
		viewport.style.cursor = 'grab';
	};
	viewport.addEventListener('pointerdown', onDown);
	viewport.addEventListener('pointerup', onUp);
	viewport.addEventListener('pointerleave', onUp);

	cleanups.set(viewport, () => {
		viewport.removeEventListener('wheel', onWheel);
		viewport.removeEventListener('dblclick', onDbl);
		viewport.removeEventListener('pointerdown', onDown);
		viewport.removeEventListener('pointerup', onUp);
		viewport.removeEventListener('pointerleave', onUp);
		try {
			panzoom.destroy();
		} catch {
			/* */
		}
		instances.delete(viewport);
	});

	// silence unused scrap param intent: reserved for future toolbar
	void scrap;
}

export function destroyDiagramPanzoom(root: ParentNode) {
	for (const viewport of root.querySelectorAll<HTMLElement>('.diagram-viewport')) {
		cleanups.get(viewport)?.();
		cleanups.delete(viewport);
	}
}
