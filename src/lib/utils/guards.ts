/** Narrow `value` to a member of a fixed tuple (`THEMES`, `CHECK_STATES`, …). */
export function isOneOf<T>(values: readonly T[], value: unknown): value is T {
	return values.some((item) => item === value);
}
