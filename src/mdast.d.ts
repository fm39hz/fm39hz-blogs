declare module 'mdast-util-heading-range' {
	import type { Node } from 'unist';
	export default function headingRange(
		tree: Node,
		heading: string,
		callback: (start: Node, nodes: Node[], end: Node) => Node[],
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
	}
}
