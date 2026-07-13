/** Runnable check: bun src/lib/utils/headerChrome.selfcheck.ts */
import { stepHeaderChrome } from './headerChrome';

function assert(cond: unknown, msg: string): asserts cond {
	if (!cond) throw new Error(msg);
}

const base = { hidden: false, elevated: false };

// pin open
{
	const r = stepHeaderChrome(base, { y: 500, lastY: 400, menuOpen: true, focusInside: false });
	assert(r.hidden === false, 'menu open → not hidden');
	assert(r.elevated === true, 'menu open → elevated');
}

// keyboard focus inside pins
{
	const r = stepHeaderChrome(
		{ hidden: true, elevated: true },
		{ y: 200, lastY: 180, menuOpen: false, focusInside: true },
	);
	assert(r.hidden === false, 'focus-visible inside → not hidden');
}

// hide on scroll down past floor
{
	const r = stepHeaderChrome(
		{ hidden: false, elevated: true },
		{ y: 200, lastY: 180, menuOpen: false, focusInside: false },
	);
	assert(r.hidden === true, 'delta>12 & y>80 → hide');
}

// show on scroll up
{
	const r = stepHeaderChrome(
		{ hidden: true, elevated: true },
		{ y: 150, lastY: 160, menuOpen: false, focusInside: false },
	);
	assert(r.hidden === false, 'delta<-6 → show');
}

// micro jitter keeps previous
{
	const r = stepHeaderChrome(
		{ hidden: true, elevated: true },
		{ y: 200, lastY: 198, menuOpen: false, focusInside: false },
	);
	assert(r.hidden === true, 'micro delta keeps hidden');
}

// top always visible
{
	const r = stepHeaderChrome(
		{ hidden: true, elevated: true },
		{ y: 0, lastY: 100, menuOpen: false, focusInside: false },
	);
	assert(r.hidden === false, 'y=0 → show');
}

console.log('headerChrome.selfcheck: ok');
