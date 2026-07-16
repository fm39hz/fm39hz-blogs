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

$effect(() => {
	const host = root;
	if (!host) {
		items = [];
		return;
	}

	const sync = () => {
		items = queryScraps(host).map((el) => measure(host, el));
	};

	sync();
	const mo = new MutationObserver(() => sync());
	mo.observe(host, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ['class', 'data-source', 'data-kind', 'style'],
	});
	const onScroll = () => sync();
	window.addEventListener('resize', onScroll, { passive: true });
	// article may scroll inside window
	window.addEventListener('scroll', onScroll, { passive: true, capture: true });

	return () => {
		mo.disconnect();
		window.removeEventListener('resize', onScroll);
		window.removeEventListener('scroll', onScroll, true);
	};
});
</script>

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
