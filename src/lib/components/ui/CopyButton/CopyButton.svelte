<script lang="ts">
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { copyScrap, type ScrapKind, type ScrapPayload } from '$lib/scrap/model';
import { flashCopySuccess } from '$lib/utils/clipboard';
import styles from './CopyButton.module.scss';

/** Pure presentational button for one scrap. Parent places it. */
let { payload, kind }: { payload: ScrapPayload; kind: ScrapKind } = $props();

let i18n = $derived(useTranslations(locale.value));
let copied = $state(false);
let label = $derived(kind === 'figure' ? i18n.a11y.copyFigure : i18n.a11y.copyCode);

async function handleCopy() {
	const ok = await copyScrap(payload);
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
  <Icon icon={copied ? 'ph:check' : 'ph:paperclip'} class={styles.icon} />
</button>
