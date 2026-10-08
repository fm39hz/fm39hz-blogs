<script lang="ts">
import CopyButton from '$lib/components/ui/CopyButton/CopyButton.svelte';
import { queryScraps } from '$lib/scrap/model';

/**
 * Declarative scrap copy chrome.
 * - List: {#each} over scrap roots under prose (Svelte owns buttons).
 * - Placement: absolute overlay positioned over each scrap (no mount, no wrap, no reparent of mdsvex nodes).
 */
let { root }: { root: HTMLElement | null } = $props();

type ScrapChrome = { el: HTMLElement; top: number; right: number };

let items = $state<ScrapChrome[]>([]);

function measure(host: HTMLElement, el: HTMLElement): ScrapChrome {
	const hr = host.getBoundingClientRect();
	const er = el.getBoundingClientRect();
	return {
		el,
		top: er.top - hr.top + host.scrollTop + 4,
		right: hr.right - er.right + 4,
	};
}

function sync() {
	const host = root;
	items = host ? queryScraps(host).map((el) => measure(host, el)) : [];
}

$effect(() => {
	const host = root;
	if (!host) {
		items = [];
		return;
	}

	sync();
	const mo = new MutationObserver(sync);
	mo.observe(host, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ['class', 'data-source', 'data-kind', 'style'],
	});

	return () => mo.disconnect();
});
</script>

<svelte:window onscroll={sync} onresize={sync} />

<div class="scrap-copies" aria-hidden="false">
  {#each items as item (item.el)}
    <div class="scrap-pin" style:top="{item.top}px" style:right="{item.right}px">
      <CopyButton target={item.el} />
    </div>
  {/each}
</div>

<style>
  .scrap-copies {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 5;
  }
  .scrap-pin {
    position: absolute;
    pointer-events: auto;
  }
</style>
