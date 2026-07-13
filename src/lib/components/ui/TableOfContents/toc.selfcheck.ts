/** bun src/lib/components/ui/TableOfContents/toc.selfcheck.ts */

function assert(c: unknown, m: string): asserts c {
	if (!c) throw new Error(m);
}

/** Pure clamp: ideal mid scroll, legal range [0, max] */
function centerTop(itemMid: number, listH: number, scrollH: number) {
	const ideal = itemMid - listH / 2;
	const max = Math.max(0, scrollH - listH);
	return Math.min(max, Math.max(0, ideal));
}

// middle item — can center
assert(centerTop(200, 200, 500) === 100, 'mid centers');

// first item — can't balance, clamp to 0 (top)
assert(centerTop(10, 200, 500) === 0, 'start clamps top');

// last item — can't balance, clamp to max
assert(centerTop(490, 200, 500) === 300, 'end clamps bottom');

// short list, no overflow — always 0
assert(centerTop(50, 200, 100) === 0, 'short no scroll');

console.log('toc.selfcheck: ok');
