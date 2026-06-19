import { paraglideVitePlugin } from '@inlang/paraglide-js';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { escapeSvelte, mdsvex } from 'mdsvex';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkCollapse from 'remark-collapse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import { createHighlighter } from 'shiki';
import { defineConfig } from 'vite';

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

export default defineConfig({
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
						highlighter: async (code: string, lang: string) => {
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
								lang,
								themes: { light: 'everforest-light', dark: 'everforest-dark' },
								defaultColor: false,
							});
							return escapeSvelte(html.replace(/\s+tabindex="0"/g, ''));
						},
					},
					remarkPlugins: [
						remarkGfm,
						remarkMath,
						[remarkToc, { tight: true }],
						[remarkCollapse, { test: 'Table of contents' }],
					],
					rehypePlugins: [rehypeKatexSvelte],
				}),
			],
			extensions: ['.svelte', '.svx', '.md'],
			experimental: { remoteFunctions: true, handleRenderingErrors: true },
		}),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' }),
	],
});
