/**
 * Dependency-free text helpers shared by build plugins and client code
 * (search ships to the browser, so this must not pull in mdast tooling).
 */

/** Fold Vietnamese/Unicode text to bare ASCII: strip diacritics, đ→d. */
export function asciiFold(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'D');
}
