import { readdir, readFile } from 'node:fs/promises';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { assertEquivalentHeadings, contentLocale, contentSlug } from '../src/lib/content-language';
import { remarkHeadingSlugs } from '../src/lib/markdown/headingSlug';
import type { PostMeta } from '../src/lib/types';

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
			const metadata = result?.data?.fm as PostMeta | undefined;
			if (!metadata) throw new Error(`${name}: missing frontmatter`);
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
