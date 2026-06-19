<script lang="ts">
import { Toggle } from 'melt/builders';
import { Lang } from '$lib/constants';
import { useTranslations } from '$lib/i18n';
import type { Language } from '$lib/types';
import styles from './LanguageToggle.module.scss';

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
	const next = lang === Lang.EN ? Lang.VI : Lang.EN;
	onToggle?.(next);
}

const meltToggle = new Toggle({ value: () => lang === Lang.VI, onValueChange: () => toggleLang() });
</script>

<div class={styles.toggle}>
  <span class={`${styles.label} ${lang === Lang.EN ? styles.active : ''}`}>{labels[Lang.EN] ?? 'EN'}</span>
  <button {...meltToggle.trigger} onclick={toggleLang} class={`${styles.slider} ${lang === Lang.VI ? styles.sliderOn : ''}`} aria-label={i18n.a11y.toggleLanguage}>
    <span class={`${styles.knob} ${lang === Lang.VI ? styles.knobRight : ''}`}></span>
  </button>
  <span class={`${styles.label} ${lang === Lang.VI ? styles.active : ''}`}>{labels[Lang.VI] ?? 'VI'}</span>
</div>
