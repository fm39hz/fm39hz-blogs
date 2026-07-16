import { paraglideVitePlugin } from '@inlang/paraglide-js';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import headingRange from 'mdast-util-heading-range';
// @ts-ignore
import { escapeSvelte, mdsvex } from 'mdsvex';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import { createHighlighter } from 'shiki';
import { defineConfig } from 'vite';
import { rehypeTableLabels } from './src/lib/markdown/rehypeTableLabels';

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

const tocOptions: Parameters<typeof remarkToc>[0] = { tight: true };

export default defineConfig({
	build: { chunkSizeWarningLimit: 1500 },
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				experimental: { async: true },
				warningFilter: (warning) => !['script_context_deprecated'].includes(warning.code),
			},
			adapter: adapter(),
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					highlight: {
						highlighter: async (code: string, lang: string | null | undefined) => {
							// Client-rendered media: source only on data-source (URI-encoded).
							// Empty <figure> — no DSL/JSON text nodes for reader modes. Paint SVG in browser.
							if (lang === 'mermaid') {
								const enc = encodeURIComponent(code);
								return `{@html \`<figure class="diagram mermaid" data-kind="mermaid" data-source="${enc}" aria-label="Diagram"></figure>\`}`;
							}
							if (lang === 'vega-lite' || lang === 'vegalite' || lang === 'vega') {
								const enc = encodeURIComponent(code);
								return `{@html \`<figure class="diagram vega-lite" data-kind="vega-lite" data-source="${enc}" aria-label="Chart"></figure>\`}`;
							}
							if (!highlighter) {
								highlighter = await createHighlighter({
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
							const html = highlighter.codeToHtml(code, {
								lang: lang ?? '',
								themes: { light: 'everforest-light', dark: 'everforest-dark' },
								defaultColor: false,
							});
							return escapeSvelte(html.replace(/\s+tabindex="0"/g, ''));
						},
					},
					remarkPlugins: [
						remarkGfm,
						remarkMath,
						[remarkToc, tocOptions],
						[
							function () {
								// Wrap in-page TOC as <nav> — no closed <details>, no duplicate title.
								// Reader modes (Brave/Zen) + SEO get a real heading + list.
								// biome-ignore lint/suspicious/noExplicitAny: mdast types unavailable
								return function (tree: any) {
									headingRange(
										tree,
										'Table of contents',
										// biome-ignore lint/suspicious/noExplicitAny: heading-range types unavailable
										(start: any, nodes: any[], end: any) => [
											{
												type: 'html',
												value: '<nav class="prose-toc" aria-label="Table of contents">',
											},
											start,
											...nodes,
											{ type: 'html', value: '</nav>' },
											end,
										],
									);
								};
							},
						],
					],
					rehypePlugins: [rehypeSlug, rehypeKatexSvelte, rehypeTableLabels],
				}),
			],
			extensions: ['.svelte', '.svx', '.md'],
			experimental: { remoteFunctions: true, handleRenderingErrors: true },
		}),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'globalVariable', 'baseLocale'],
		}),
	],
});
