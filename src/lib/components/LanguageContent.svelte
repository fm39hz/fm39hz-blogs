<script lang="ts">
import { animate } from 'motion';

let {
	lang = 'en',
	children,
}: {
	lang?: string;
	children?: any;
} = $props();

let ref: HTMLDivElement | undefined = $state();

$effect(() => {
	if (!ref) return;
	const from = `inset(0 ${lang === 'en' ? 100 : 0}% 0 ${lang === 'en' ? 0 : 100}%)`;
	for (const el of ref.children as any) {
		const el2 = el as HTMLElement;
		if (el2.getAttribute('data-lang') === lang) {
			el2.style.removeProperty('display');
			el2.style.clipPath = from;
			requestAnimationFrame(() => {
				animate(el2, { clipPath: 'inset(0)' }, { duration: 0.3, ease: [0.22, 1, 0.36, 1] });
			});
		} else {
			el2.style.display = 'none';
			el2.style.clipPath = '';
		}
	}
});
</script>

<div bind:this={ref}>
	{@render children?.()}
</div>
