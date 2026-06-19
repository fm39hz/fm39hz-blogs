<script lang="ts">
import { Lang } from '$lib/constants';
import type { Language } from '$lib/types';
import { useTranslations } from '$lib/i18n';
import { Toggle } from 'melt/builders';

let {
	onToggle,
	lang = Lang.EN,
	locale = 'en',
	labels = { [Lang.EN]: 'EN', [Lang.VI]: 'VI' },
}: {
	onToggle?: (nextLang: Language) => void;
	lang?: Language;
	locale?: string;
	labels?: Partial<Record<Language, string>>;
} = $props();
let i18n = $derived(useTranslations(locale));

function toggleLang() {
	const nextLang = lang === Lang.EN ? Lang.VI : Lang.EN;
	onToggle?.(nextLang);
}

const toggle = new Toggle({
	value: () => lang === Lang.VI,
	onValueChange: () => toggleLang(),
});
</script>

<div class="flex items-center gap-1.5 select-none">
	<span class="text-xs font-medium {lang === Lang.EN ? 'text-accent' : 'text-muted-foreground'} transition-colors">{labels[Lang.EN] ?? 'EN'}</span>
	<button
		{...toggle.trigger}
		onclick={toggleLang}
		class="relative inline-flex h-5 w-9 items-center rounded-full border border-border transition-colors {lang === Lang.VI ? 'bg-accent/20' : 'bg-muted'}"
		aria-label={i18n.a11y.toggleLanguage}
	>
		<span
			class="inline-block h-3.5 w-3.5 rounded-full bg-accent transition-all duration-200 {lang === Lang.VI ? 'translate-x-[18px]' : 'translate-x-[2px]'}"
		></span>
	</button>
	<span class="text-xs font-medium {lang === Lang.VI ? 'text-accent' : 'text-muted-foreground'} transition-colors">{labels[Lang.VI] ?? 'VI'}</span>
</div>
