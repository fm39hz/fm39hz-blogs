<script lang="ts">
import { Toggle } from 'melt/builders';

let {
	onToggle,
	lang = 'en',
	labels = { en: 'EN', vi: 'VI' },
}: {
	onToggle?: (lang: string) => void;
	lang?: string;
	labels?: Record<string, string>;
} = $props();

function handle() {
	const next = lang === 'en' ? 'vi' : 'en';
	onToggle?.(next);
}

const toggle = new Toggle({
	value: () => lang === 'vi',
	onValueChange: () => handle(),
});
</script>

<div class="flex items-center gap-1.5 select-none">
	<span class="text-xs font-medium {lang === 'en' ? 'text-accent' : 'text-muted-foreground'} transition-colors">{labels.en ?? 'EN'}</span>
	<button
		{...toggle.trigger}
		onclick={handle}
		class="relative inline-flex h-5 w-9 items-center rounded-full border border-border transition-colors {lang === 'vi' ? 'bg-accent/20' : 'bg-muted'}"
		aria-label="Switch language"
	>
		<span
			class="inline-block h-3.5 w-3.5 rounded-full bg-accent transition-all duration-200 {lang === 'vi' ? 'translate-x-[18px]' : 'translate-x-[2px]'}"
		></span>
	</button>
	<span class="text-xs font-medium {lang === 'vi' ? 'text-accent' : 'text-muted-foreground'} transition-colors">{labels.vi ?? 'VI'}</span>
</div>
