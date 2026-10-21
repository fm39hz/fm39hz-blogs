import { fileURLToPath } from 'node:url';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import type { Heading, Root, RootContent } from 'mdast';
import headingRange from 'mdast-util-heading-range';
import mdastToString from 'mdast-util-to-string';
// @ts-ignore
import { mdsvex } from 'mdsvex';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import { createHighlighter } from 'shiki';
import { defineConfig } from 'vite';
import { validateContent } from './scripts/validate-content';
import { isPublished } from './src/lib/content/policy';
import { SCHEDULED_POST_MARGIN_MS } from './src/lib/data/publication';
import { remarkHeadingSlugs } from './src/lib/markdown/headingSlug';
import { renderMermaidSvg } from './src/lib/markdown/mermaid';
import { rehypeResponsiveTables } from './src/lib/markdown/rehypeResponsiveTables';
import { rehypeTableCellCheckboxes } from './src/lib/markdown/rehypeTableCellCheckboxes';
import { rehypeTableLabels } from './src/lib/markdown/rehypeTableLabels';
import { renderVegaLiteSvg } from './src/lib/markdown/vega';

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

const tocOptions: Parameters<typeof remarkToc>[0] = {
	tight: true,
	heading: '(table of contents|mục lục)',
};

export default defineConfig(async () => {
	const content = await validateContent();
	const publication = {
		mode: 'public' as const,
		now: Date.now(),
		scheduledMarginMs: SCHEDULED_POST_MARGIN_MS,
	};
	const articlePaths = content
		.filter(({ metadata }) => isPublished(metadata, publication))
		.flatMap(({ slug }) => [`/articles/${slug}`, `/vi/articles/${slug}`] as `/${string}`[]);
	return {
		build: { chunkSizeWarningLimit: 1500 },
		plugins: [
			sveltekit({
				prerender: {
					entries: [
						'*',
						'/vi',
						'/vi/articles',
						'/vi/topics',
						'/vi/archives',
						'/vi/author',
						'/vi/search',
						...articlePaths,
					],
				},
				compilerOptions: {
					// .md stays legacy: mdsvex wraps content in `<Layout {...$$props}>`.
					runes: ({ filename }) =>
						filename.split(/[/\\]/).includes('node_modules')
							? undefined
							: !filename.endsWith('.md'),
					experimental: { async: true },
					warningFilter: (warning) =>
						!['script_context_deprecated'].includes(warning.code),
				},
				adapter: adapter(),
				preprocess: [
					mdsvex({
						extensions: ['.svx', '.md'],
						layout: fileURLToPath(
							new URL('./src/lib/components/content/Layout.svelte', import.meta.url),
						),
						highlight: {
							// Fences render through layout components (Components.*), never raw
							// HTML the client has to enhance. Props are JSON string literals.
							highlighter: async (code: string, lang: string | null | undefined) => {
								if (lang === 'mermaid') {
									return `<Components.Figure kind="mermaid" source={${JSON.stringify(code)}} svg={${JSON.stringify(renderMermaidSvg(code))}} />`;
								}
								if (
									lang === 'vega-lite' ||
									lang === 'vegalite' ||
									lang === 'vega'
								) {
									const { svg, label } = await renderVegaLiteSvg(code);
									return `<Components.Figure kind="vega-lite" label={${JSON.stringify(label)}} source={${JSON.stringify(code)}} svg={${JSON.stringify(svg)}} />`;
								}
								if (!highlighterPromise) {
									highlighterPromise = createHighlighter({
										themes: ['everforest-light', 'everforest-dark'],
										langs: [
											'javascript',
											'typescript',
											'python',
											'css',
											'html',
											'bash',
											'json',
											'markdown',
											'svelte',
											'rust',
											'go',
											'yaml',
											'diff',
											'csharp',
										],
									});
								}
								const highlighter = await highlighterPromise;
								const html = highlighter
									.codeToHtml(code, {
										lang: lang ?? '',
										themes: {
											light: 'everforest-light',
											dark: 'everforest-dark',
										},
										defaultColor: false,
									})
									.replace(/\s+tabindex="0"/g, '');
								return `<Components.CodeBlock source={${JSON.stringify(code)}} html={${JSON.stringify(html)}} />`;
							},
						},
						remarkPlugins: [
							remarkGfm,
							remarkMath,
							remarkHeadingSlugs,
							[remarkToc, tocOptions],
							[
								function () {
									// heading-range: start=TOC heading, nodes=list, end=next same-rank heading.
									// Must re-emit end or that h2 is deleted from the tree.
									// summary may only hold phrasing — put heading *text*, not the h2 node
									// (block h2 inside summary breaks HTML and swallows following content).
									return function (
										tree: Root,
										file: { data: { fm?: { lang?: string } } },
									) {
										headingRange(
											tree,
											'table of contents|mục lục',
											(
												start: Heading,
												nodes: RootContent[],
												end?: Heading,
											) => {
												const label =
													file.data.fm?.lang === 'vi'
														? 'Mục lục'
														: mdastToString(start);
												const out: RootContent[] = [
													{
														type: 'html',
														value: `<details class="prose-toc"><summary>${label}</summary>`,
													},
													...nodes,
													{ type: 'html', value: '</details>' },
												];
												if (end) out.push(end);
												return out;
											},
										);
									};
								},
							],
						],
						rehypePlugins: [
							rehypeSlug,
							rehypeKatexSvelte,
							rehypeTableLabels,
							rehypeTableCellCheckboxes,
							rehypeResponsiveTables,
						],
					}),
				],
				extensions: ['.svelte', '.svx', '.md'],
				experimental: { remoteFunctions: true, handleRenderingErrors: true },
			}),
			paraglideVitePlugin({
				project: './project.inlang',
				outdir: './src/lib/paraglide',
				strategy: ['url', 'baseLocale'],
			}),
		],
	};
});
