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

/** Strip inline markdown formatting for display text. */
function stripInlineFormatting(text: string): string {
	return text
		.replace(/\*\*(.+?)\*\*/g, '$1')
		.replace(/\*(.+?)\*/g, '$1')
		.replace(/__(.+?)__/g, '$1')
		.replace(/_(.+?)_/g, '$1')
		.replace(/`(.+?)`/g, '$1')
		.replace(/\[(.+?)\]\(.+?\)/g, '$1');
}

/** Generate GitHub-compatible heading slug (matches rehype-slug / github-slugger). */
function headingToSlug(text: string): string {
	const plain = stripInlineFormatting(text);
	return plain
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
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
	},
	raw: string,
): string {
	const body = stripFrontmatter(raw).trim();
	const title = `# ${meta.title}`;

	// Split body at "## Table of contents" into intro and rest
	const tocMarker = '## Table of contents';
	const tocIndex = body.indexOf(tocMarker);

	let intro: string;
	let afterToc: string;

	if (tocIndex >= 0) {
		intro = body.slice(0, tocIndex).trim();
		const nextHeading = body.indexOf('\n## ', tocIndex + tocMarker.length);
		afterToc = nextHeading >= 0 ? body.slice(nextHeading).trim() : '';
	} else {
		intro = body;
		afterToc = '';
	}

	// Extract headings for TOC (h2–h4) from body after TOC placeholder
	const headings: { level: number; text: string; slug: string }[] = [];
	const headingRegex = /^(#{2,4})\s+(.+)$/gm;
	let match: RegExpExecArray | null;
	while ((match = headingRegex.exec(afterToc)) !== null) {
		headings.push({
			level: match[1].length,
			text: stripInlineFormatting(match[2]),
			slug: headingToSlug(match[2]),
		});
	}

	const tocEntries = headings
		.map((h) => `${'  '.repeat(h.level - 2)}- [${h.text}](#${h.slug})`)
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
