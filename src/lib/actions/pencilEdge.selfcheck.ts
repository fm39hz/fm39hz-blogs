/** bun src/lib/actions/pencilEdge.selfcheck.ts */

function assert(c: unknown, m: string): asserts c {
	if (!c) throw new Error(m);
}

/** Pure policy: visible → animate; hidden → static */
function policy(isIntersecting: boolean, reduceMotion: boolean): 'animate' | 'static' {
	if (reduceMotion) return 'static';
	return isIntersecting ? 'animate' : 'static';
}

assert(policy(true, false) === 'animate', 'on-screen animates');
assert(policy(false, false) === 'static', 'off-screen static');
assert(policy(true, true) === 'static', 'reduced always static');
assert(policy(false, true) === 'static', 'reduced off-screen static');

console.log('pencilEdge.selfcheck: ok');
