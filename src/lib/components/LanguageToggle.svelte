<script lang="ts">
import { Lang } from '$lib/constants';
import type { Language } from '$lib/types';
import { useTranslations } from '$lib/i18n';
import { Toggle } from 'melt/builders';

let { onToggle, lang = Lang.EN, locale = 'en', labels = { [Lang.EN]: 'EN', [Lang.VI]: 'VI' } }: {
  onToggle?: (nextLang: Language) => void; lang?: Language; locale?: string; labels?: Partial<Record<Language, string>>;
} = $props();

let i18n = $derived(useTranslations(locale));

function toggleLang() {
  const next = lang === Lang.EN ? Lang.VI : Lang.EN;
  onToggle?.(next);
}

const meltToggle = new Toggle({ value: () => lang === Lang.VI, onValueChange: () => toggleLang() });
</script>

<div class="toggle">
  <span class="label {lang === Lang.EN ? 'active' : ''}">{labels[Lang.EN] ?? 'EN'}</span>
  <button {...meltToggle.trigger} onclick={toggleLang} class="slider {lang === Lang.VI ? 'on' : ''}" aria-label={i18n.a11y.toggleLanguage}>
    <span class="knob {lang === Lang.VI ? 'right' : ''}"></span>
  </button>
  <span class="label {lang === Lang.VI ? 'active' : ''}">{labels[Lang.VI] ?? 'VI'}</span>
</div>

<style>
  .toggle { display: flex; align-items: center; gap: 0.375rem; user-select: none; }
  .label { font-size: 0.75rem; font-weight: 500; color: var(--muted-fg); transition: color 0.2s; }
  .label.active { color: var(--accent); }
  .slider { position: relative; display: inline-flex; height: 1.25rem; width: 2.25rem; align-items: center; border-radius: 9999px; border: 1px solid var(--border); background: var(--muted); transition: background 0.2s; }
  .slider.on { background: color-mix(in srgb, var(--accent) 20%, transparent); }
  .knob { display: inline-block; height: 0.875rem; width: 0.875rem; border-radius: 9999px; background: var(--accent); transition: transform 0.2s; margin-left: 2px; }
  .knob.right { transform: translateX(18px); }
</style>
