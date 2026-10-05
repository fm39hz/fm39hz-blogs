import type { ContentHeading } from '$lib/content/types';

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

/** Format ISO date string as dd/mm/yyyy. */
function formatDate(iso: string): string {
	const d = new Date(iso);
	const day = String(d.getDate()).padStart(2, '0');
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const year = d.getFullYear();
	return `${day}/${month}/${year}`;
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
export function buildCopyMarkdown(
	meta: {
		title: string;
		description?: string;
		author?: string;
		pubDatetime: string;
		tags?: string[];
		sourceUrl?: string;
		lang: 'en' | 'vi';
		headings: ContentHeading[];
	},
	raw: string,
): string {
	const body = stripFrontmatter(raw).trim();
	const title = `# ${meta.title}`;

	// The AST provides headings and anchors; raw Markdown is only split around its TOC placeholder.
	const tocMatch = /^##\s+(Table of contents|Mục lục)\s*$/m.exec(body);
	const tocMarker = meta.lang === 'vi' ? '## Mục lục' : '## Table of contents';
	const tocIndex = tocMatch?.index ?? -1;
	const tocEnd = tocMatch ? tocMatch.index + tocMatch[0].length : -1;

	let intro: string;
	let afterToc: string;

	if (tocIndex >= 0) {
		intro = body.slice(0, tocIndex).trim();
		const nextHeading = body.indexOf('\n## ', tocEnd);
		afterToc = nextHeading >= 0 ? body.slice(nextHeading).trim() : '';
	} else {
		intro = body;
		afterToc = '';
	}

	const tocEntries = meta.headings
		.filter(({ depth }) => depth >= 2 && depth <= 4)
		.map(({ depth, text, id }) => `${'  '.repeat(depth - 2)}- [${text}](#${id})`)
		.join('\n');

	// Author signature
	const author = meta.author ?? 'FM39hz';
	const dateStr = formatDate(meta.pubDatetime);
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
	if (meta.sourceUrl) {
		parts.push(`Source: <${meta.sourceUrl}>`);
	}

	return parts.join('\n\n') + '\n';
}
