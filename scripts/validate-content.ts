import { readdir, readFile } from 'node:fs/promises';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { toPostMeta } from '../src/lib/content/frontmatter';
import { assertEquivalentHeadings, contentLocale, contentSlug } from '../src/lib/content/policy';
import { remarkHeadingSlugs } from '../src/lib/markdown/headingSlug';

export async function validateContent() {
	const directory = new URL('../src/content/articles/', import.meta.url);
	const files = (await readdir(directory)).filter((name) => name.endsWith('.md')).sort();
	const entries = await Promise.all(
		files.map(async (name) => {
			const source = await readFile(new URL(name, directory), 'utf8');
			const result = await mdsvex({
				extensions: ['.md'],
				highlight: false,
				remarkPlugins: [remarkGfm, remarkMath, remarkHeadingSlugs],
			}).markup({ content: source, filename: name });
			const metadata = toPostMeta(result?.data?.fm, name);
			return {
				name,
				slug: contentSlug(name),
				lang: contentLocale(name, metadata.lang),
				metadata,
			};
		}),
	);
	const groups = new Map<string, typeof entries>();
	for (const entry of entries) {
		const group = groups.get(entry.slug) ?? [];
		if (group.some((other) => other.lang === entry.lang)) {
			throw new Error(`${entry.slug}: duplicate ${entry.lang} translation (${entry.name})`);
		}
		group.push(entry);
		groups.set(entry.slug, group);
	}
	for (const [slug, group] of groups) {
		if (group.length === 2) {
			assertEquivalentHeadings(
				group[0].metadata.headings ?? [],
				group[1].metadata.headings ?? [],
				`${slug} (${group[0].name}, ${group[1].name})`,
			);
		}
	}
	return entries;
}
