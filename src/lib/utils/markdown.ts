import cfg from '$lib/config';
import type { ContentHeading } from '$lib/content/types';
import type { Language } from '$lib/locale';
import { TOC_MARKER_LINE, TOC_TITLES } from '$lib/markdown/toc';
import { resolveAuthor } from './author';
import { formatNumericDate } from './date';

export interface CopyMarkdownSeries {
	title: string;
	currentOrder: number;
	totalParts: number;
}

export interface CopyMarkdownLabels {
	series: (title: string, current: number, total: number) => string;
	hostedAt: (url: string) => string;
}

export interface CopyMarkdownMeta {
	title: string;
	description?: string;
	author?: string;
	pubDatetime: string;
	tags?: string[];
	/** Canonical page URL; relative image sources in the body resolve against it. */
	sourceUrl?: string;
	lang: Language;
	headings: ContentHeading[];
	labels: CopyMarkdownLabels;
	series?: CopyMarkdownSeries;
}

/** Drop YAML frontmatter for clipboard/export. Body only. */
export function stripFrontmatter(md: string): string {
	if (!md.startsWith('---')) return md;
	const end = md.indexOf('\n---', 3);
	if (end === -1) return md;
	let body = md.slice(end + 4);
	if (body.startsWith('\r\n')) body = body.slice(2);
	else if (body.startsWith('\n')) body = body.slice(1);
	return body;
}

/**
 * Build a complete, copy-friendly markdown document from metadata + raw body.
 *
 * Output structure:
 *   # Title
 *
 *   > description
 *
 *   {intro paragraphs}
 *
 *   ---
 *
 *   ## Table of contents
 *   - [heading links]
 *
 *   {body}
 *
 *   *Author, date*
 *
 *   ---
 *
 *   #tag1 #tag2
 *
 *   Source: <url>
 */
export function buildCopyMarkdown(meta: CopyMarkdownMeta, raw: string): string {
	const body = copyFootnotes(stripFrontmatter(raw).trim());
	const resolved = meta.sourceUrl ? absoluteImageSources(body, meta.sourceUrl) : body;
	const title = `# ${meta.title}`;

	// The AST provides headings and anchors; raw Markdown is only split around its TOC placeholder.
	const tocMatch = TOC_MARKER_LINE.exec(resolved);
	const tocMarker = `## ${TOC_TITLES[meta.lang]}`;
	const tocIndex = tocMatch?.index ?? -1;
	const tocEnd = tocMatch ? tocMatch.index + tocMatch[0].length : -1;

	let intro: string;
	let afterToc: string;

	if (tocIndex >= 0) {
		intro = resolved.slice(0, tocIndex).trim();
		const nextHeading = resolved.indexOf('\n## ', tocEnd);
		afterToc = nextHeading >= 0 ? resolved.slice(nextHeading).trim() : '';
	} else {
		intro = resolved;
		afterToc = '';
	}

	const tocEntries = meta.headings
		.filter(({ depth }) => depth >= 2 && depth <= 4)
		.map(({ depth, text, id }) => `${'  '.repeat(depth - 2)}- [${text}](#${id})`)
		.join('\n');

	// Author signature
	const author = resolveAuthor(meta);
	const dateStr = formatNumericDate(meta.pubDatetime, cfg.site.timezone);
	const signature = `*${author}, ${dateStr}*`;

	// Tags
	const tags = (meta.tags ?? []).map((t) => `#${t}`).join(' ');

	// Assemble: title → description → intro → --- → TOC → body → signature → --- → tags
	const parts: string[] = [title];
	if (meta.description) parts.push(`> ${meta.description}`);
	if (intro) parts.push(intro);
	if (tocEntries) {
		parts.push('---');
		parts.push(`${tocMarker}\n\n${tocEntries}`);
	}
	if (afterToc) parts.push(afterToc);
	parts.push(signature);
	if (tags) {
		parts.push('---');
		parts.push(tags);
	}

	if (meta.series) {
		parts.push(
			meta.labels.series(meta.series.title, meta.series.currentOrder, meta.series.totalParts),
		);
	}
	if (meta.sourceUrl) {
		parts.push(meta.labels.hostedAt(meta.sourceUrl));
	}
	return parts.join('\n\n') + '\n';
}

/** Inline Markdown image: `![alt](dest "title")`, destination optionally in `<...>`. */
const INLINE_IMAGE =
	/(!\[[^\]\n]*\]\(\s*)(<[^>\n]*>|[^\s)]+)((?:\s+(?:"[^"\n]*"|'[^'\n]*'|\([^)\n]*\)))?\s*\))/g;
/** Raw HTML `<img>`, which mdsvex passes through untouched. */
const HTML_IMAGE = /(<img\b[^>]*?\bsrc\s*=\s*)(["'])([^"'\n]*)\2/gi;
const URL_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

/**
 * Rewrite relative image sources to absolute URLs, the way the page resolves
 * them when rendered: `/x.png` against the site origin, `x.png` or `./x.png`
 * against the page URL. Already-absolute sources (http(s), data:, protocol
 * relative) are embedded links and stay as authored.
 *
 * Fenced blocks and inline code keep their text: a copied code sample is
 * content, not a document structure to rebase.
 */
export function absoluteImageSources(markdown: string, baseUrl: string): string {
	return rewriteOutsideCode(markdown, (chunk) =>
		chunk
			.replace(
				INLINE_IMAGE,
				(_match, lead: string, destination: string, tail: string) =>
					`${lead}${rebaseImage(destination, baseUrl)}${tail}`,
			)
			.replace(
				HTML_IMAGE,
				(_match, lead: string, quote: string, destination: string) =>
					`${lead}${quote}${rebaseImage(destination, baseUrl)}${quote}`,
			),
	);
}

function rebaseImage(destination: string, baseUrl: string): string {
	const wrapped = destination.startsWith('<') && destination.endsWith('>');
	const url = wrapped ? destination.slice(1, -1) : destination;
	if (!url || URL_SCHEME.test(url) || url.startsWith('//') || url.startsWith('#'))
		return destination;
	try {
		const absolute = new URL(url, baseUrl).href;
		return wrapped ? `<${absolute}>` : absolute;
	} catch {
		return destination;
	}
}

/** Apply `rewrite` to prose only: fenced blocks and inline code spans are skipped. */
function rewriteOutsideCode(body: string, rewrite: (chunk: string) => string): string {
	let fence: string | null = null;
	return body
		.split('\n')
		.map((line) => {
			const marker = /^\s{0,3}(`{3,}|~{3,})/.exec(line);
			if (fence) {
				if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length)
					fence = null;
				return line;
			}
			if (marker) {
				fence = marker[1];
				return line;
			}
			return line
				.split(/(`+[^`]*`+)/)
				.map((part, index) => (index % 2 === 1 ? part : rewrite(part)))
				.join('');
		})
		.join('\n');
}

function copyFootnotes(body: string): string {
	const lines = body.split('\n');
	const definitions = new Map<string, { line: number; text: string }>();
	for (const [index, line] of lines.entries()) {
		const definition = /^\[\^([^\]]+)\]:\s*(.*)$/.exec(line);
		if (definition) definitions.set(definition[1], { line: index, text: definition[2] });
	}
	const definitionLines = new Set([...definitions.values()].map(({ line }) => line));
	const content = lines.filter((_, index) => !definitionLines.has(index)).join('\n');
	const order: string[] = [];
	for (const match of content.matchAll(/\[\^([^\]]+)\]/g)) {
		const id = match[1];
		if (definitions.has(id) && !order.includes(id)) order.push(id);
	}
	if (order.length === 0) return body;
	const numberById = new Map(order.map((id, index) => [id, String(index + 1)]));
	const numberedContent = content.replace(/\[\^([^\]]+)\]/g, (marker, id: string) => {
		const number = numberById.get(id);
		return number ? `([^${number}])` : marker;
	});
	const notes = order.map((id, index) => `[^${index + 1}]: ${definitions.get(id)?.text ?? ''}`);
	return `${numberedContent.trim()}\n\n${notes.join('\n')}`;
}
