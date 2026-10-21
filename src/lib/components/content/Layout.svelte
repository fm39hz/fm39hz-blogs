<script module lang="ts">
/**
 * mdsvex layout for every Markdown file. Named exports are the Svelte
 * components content renders through: mdsvex swaps matching elements for
 * `Components.<name>` (e.g. `blockquote`), and the highlighter / rehype
 * plugins emit the contract components via `emitComponent`. Content stays
 * Svelte-owned — no post-mount DOM enhancement.
 */
import type { Component } from 'svelte';
import TableCardStack from '../ui/TableCardStack/TableCardStack.svelte';
import blockquote from './Blockquote.svelte';
import CellCheck from './CellCheck/CellCheck.svelte';
import CodeBlock from './CodeBlock/CodeBlock.svelte';
import type { ContentComponents } from './contract';
import Figure from './Figure/Figure.svelte';

// Every contract entry must be exported here with matching props.
({ CellCheck, CodeBlock, Figure, TableCardStack }) satisfies {
	[Name in keyof ContentComponents]: Component<ContentComponents[Name]>;
};

export { blockquote, CellCheck, CodeBlock, Figure, TableCardStack };
</script>

<script lang="ts">
import type { Snippet } from 'svelte';

let { children }: { children?: Snippet } = $props();
</script>

{@render children?.()}
