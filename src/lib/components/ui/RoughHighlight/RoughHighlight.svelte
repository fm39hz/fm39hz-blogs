<script lang="ts">
import rough from 'roughjs';
import type { Snippet } from 'svelte';
import { inView } from '$lib/attachments/inView';
import styles from './RoughHighlight.module.scss';

/**
 * Hand-drawn highlighter stroke behind inline content. roughjs only computes
 * path data; the template renders the SVG, CSS draws it in once on screen.
 * `seed` keeps the stroke shape stable per label across renders.
 */
let { children, seed = '' }: { children: Snippet; seed?: string } = $props();

// Package entry = bundled ESM; `roughjs/bin/*` uses extensionless imports Node SSR can't resolve.
const generator = rough.generator();
/** Two passes, like a marker going over the word twice. */
const PASSES = 2;

let width = $state(0);
let height = $state(0);
let shown = $state(false);

function hash(text: string): number {
	let h = 0;
	for (const ch of text) h = (Math.imul(31, h) + (ch.codePointAt(0) ?? 0)) | 0;
	return Math.abs(h) || 1;
}

let strokes = $derived.by(() => {
	if (!width || !height) return [];
	const base = hash(seed);
	return Array.from({ length: PASSES }, (_, pass) =>
		generator.toPaths(
			generator.line(0, height / 2, width, height / 2, {
				strokeWidth: height,
				roughness: 1.5,
				seed: base + pass,
			}),
		),
	).flat();
});
</script>

<span
  class={styles.root}
  bind:clientWidth={width}
  bind:clientHeight={height}
  data-shown={shown || undefined}
  {@attach inView((v) => (shown ||= v), '0px')}
>
  {#if strokes.length}
    <svg class={styles.brush} viewBox="0 0 {width} {height}" aria-hidden="true">
      {#each strokes as { d, strokeWidth }}
        <path {d} stroke-width={strokeWidth} pathLength="1" />
      {/each}
    </svg>
  {/if}
  {@render children()}
</span>
