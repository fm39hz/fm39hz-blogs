<script lang="ts">
import Icon from '@iconify/svelte';
import { useTranslations } from '$lib/i18n';
import { copyScrap, scrapKind } from '$lib/scrap/model';
import { flashCopySuccess } from '$lib/utils/clipboard';
import styles from './CopyButton.module.scss';

/** Pure presentational button for one scrap. Parent places it. */
let { target, locale = 'en' }: { target: HTMLElement; locale?: string } = $props();

let i18n = $derived(useTranslations(locale));
let copied = $state(false);
let kind = $derived(scrapKind(target));
let label = $derived(kind === 'figure' ? i18n.a11y.copyFigure : i18n.a11y.copyCode);

async function handleCopy() {
	const ok = await copyScrap(target);
	if (!ok) return;
	flashCopySuccess({
		toast: i18n.post.copied,
		setCopied: (v) => {
			copied = v;
		},
	});
}
</script>

<button
  type="button"
  class={`${styles.btn} ${copied ? styles.copied : ''}`}
  onclick={handleCopy}
  aria-label={label}
  title={label}
>
  <Icon icon={copied ? 'ph:check' : 'ph:paperclip'} />
</button>
