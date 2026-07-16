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

/** Site-relative or bare path → absolute URL for OG/canonical. */
export function absoluteUrl(siteUrl: string, pathOrUrl: string): string {
	if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
	const base = siteUrl.replace(/\/$/, '');
	const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
	return `${base}${path}`;
}
