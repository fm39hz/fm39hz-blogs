/** Next item after `current`, wrapping around — for toggles over a fixed tuple. */
export function cycle<T>(items: readonly T[], current: T): T {
	const index = items.indexOf(current);
	return items[(index + 1) % items.length] ?? current;
}
