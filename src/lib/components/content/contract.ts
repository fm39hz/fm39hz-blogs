/**
 * Build → component contract for Markdown content.
 *
 * The mdsvex highlighter and rehype plugins emit `Components.<Name>` with
 * these props; the components declare `$props()` with the same types. Both
 * sides type-check against this file, so a renamed or missing prop fails the
 * build instead of rendering `undefined`.
 *
 * Imported by vite.config at config load: keep it free of `$lib` imports.
 */

import { isOneOf } from '../../utils/guards';

export type DiagramKind = 'mermaid' | 'vega-lite';

/** Prerendered diagram SVG plus the facts the client needs to export it. */
export interface DiagramArt {
	/** Trusted build output (pele / Vega); rendered with {@html}. */
	svg: string;
	width: number;
	height: number;
	/** Custom properties the SVG paints with — pinned when exported as an image. */
	paint: string[];
	/** Font the labels were measured in, and the glyphs they use (export subset). */
	font: { family: string; glyphs: string };
}

export interface FigureProps {
	kind: DiagramKind;
	/** Authored DSL, copied as text. */
	source: string;
	art: DiagramArt;
	/** Accessible name from the author (Vega `description`); UI default otherwise. */
	label?: string;
}

export interface CodeBlockProps {
	/** Trusted Shiki output. */
	html: string;
	source: string;
}

export type CellStatus = 'active' | 'inactive' | 'neutral';

export type CheckState = 'done' | 'partial' | 'todo';

const CHECK_STATES: readonly CheckState[] = ['done', 'partial', 'todo'];

export function isCheckState(value: unknown): value is CheckState {
	return isOneOf(CHECK_STATES, value);
}

export interface CardCell {
	/** Trusted cell HTML from the Markdown table (empty for a check cell). */
	html: string;
	status: CellStatus;
	/** Set when the cell is a `[x]`/`[/]`/`[ ]` checkbox: render CellCheck, not html. */
	check?: CheckState;
}

export interface TableCardStackProps {
	headers: string[];
	rows: CardCell[][];
	/** Mostly yes/no cells → badge layout instead of a field list. */
	comparison: boolean;
}

export interface CellCheckProps {
	state: CheckState;
}

export interface FootnoteRefProps {
	/** 1-based order of first reference (GFM numbering). */
	number: number;
	/** Footnote identifier: anchors `#fn-<id>` (list item) and `fnref-<id>` (this reference). */
	id: string;
	/** Trusted Chicago citation note HTML, rendered in the popup and footnote list. */
	html: string;
}

export interface ContentComponents {
	Figure: FigureProps;
	CodeBlock: CodeBlockProps;
	TableCardStack: TableCardStackProps;
	CellCheck: CellCheckProps;
	FootnoteRef: FootnoteRefProps;
}

/**
 * Svelte markup for a layout component. Props are JSON literals inside `{}`
 * expressions, so any string content (SVG, HTML, quotes, braces) is safe.
 */
export function emitComponent<Name extends keyof ContentComponents>(
	name: Name,
	props: ContentComponents[Name],
): string {
	const attrs = Object.entries(props)
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
		.join(' ');
	return `<Components.${name} ${attrs} />`;
}
