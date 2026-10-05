declare module 'mdast-util-heading-range' {
	import type { Heading, Root, RootContent } from 'mdast';
	export default function headingRange(
		tree: Root,
		heading: string,
		callback: (start: Heading, nodes: RootContent[], end?: Heading) => RootContent[],
	): void;
}

declare module 'mdast-util-to-string' {
	import type { Node } from 'unist';
	export default function mdastToString(node: Node): string;
}

// Mdsvex plugin types are incompatible with the installed unified/plugin versions.
declare module 'mdsvex' {
	interface MdsvexOptions {
		remarkPlugins?: unknown[];
		rehypePlugins?: unknown[];
		extensions?: string[];
		highlight?:
			| false
			| {
					highlighter: (code: string, lang?: string | null) => Promise<string>;
			  };
	}
	export function mdsvex(options?: MdsvexOptions): {
		markup(input: {
			content: string;
			filename?: string;
		}): Promise<{ code: string; data?: Record<string, unknown>; map?: string } | undefined>;
	};
}
