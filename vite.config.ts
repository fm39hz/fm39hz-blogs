import { paraglideVitePlugin } from '@inlang/paraglide-js';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import headingRange from 'mdast-util-heading-range';
import mdastToString from 'mdast-util-to-string';
// @ts-ignore
import { escapeSvelte, mdsvex } from 'mdsvex';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import { createHighlighter } from 'shiki';
import { defineConfig } from 'vite';

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
							if (lang === 'mermaid') {
								return escapeSvelte(`<pre class="mermaid">${code}</pre>`);
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
								// biome-ignore lint/suspicious/noExplicitAny: mdast types unavailable
								return function (tree: any) {
									headingRange(
										tree,
										'Table of contents',
										// biome-ignore lint/suspicious/noExplicitAny: heading-range types unavailable
										(start: any, nodes: any[], end: any) => [
											start,
											{ type: 'html', value: '<details>' },
											{ type: 'html', value: '<summary>' },
											{ type: 'text', value: mdastToString(start) },
											{ type: 'html', value: '</summary>' },
											...nodes,
											{ type: 'html', value: '</details>' },
											end,
										],
									);
								};
							},
						],
					],
					rehypePlugins: [rehypeSlug, rehypeKatexSvelte],
				}),
			],
			extensions: ['.svelte', '.svx', '.md'],
			experimental: { remoteFunctions: true, handleRenderingErrors: true },
		}),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' }),
	],
});
