<script lang="ts">
import { RadioGroup } from 'melt/builders';

let {
	entries,
	titles = {},
	preferredLang = $bindable('en'),
}: {
	entries: { lang: string }[];
	titles?: Record<string, string>;
	preferredLang?: string;
} = $props();

const group = new RadioGroup({
	value: () => preferredLang,
	onValueChange: (v) => { preferredLang = v; switchLang(v); },
	orientation: 'horizontal',
});

function switchLang(lang: string) {
	document.querySelectorAll('[data-lang]').forEach((el) => {
		const isHidden = el.getAttribute('data-lang') !== lang;
		if (isHidden) el.setAttribute('hidden', '');
		else el.removeAttribute('hidden');
		el.setAttribute('aria-hidden', String(isHidden));
	});
	localStorage.setItem('preferredLang', lang);
}
</script>

<div {...group.root} class="flex items-center gap-2 ms-auto">
	{#each entries as { lang }, i}
		{@const item = group.getItem(lang)}
		{#if i > 0}
			<span class="text-muted-foreground text-xs">|</span>
		{/if}
		<button
			{...item.attrs}
			class="text-xs font-medium px-2 py-0.5 rounded transition-colors hover:text-accent focus-visible:outline-accent {item.checked ? 'text-accent bg-accent/10' : 'text-muted-foreground'}"
		>
			{lang.toUpperCase()}
		</button>
	{/each}
</div>
