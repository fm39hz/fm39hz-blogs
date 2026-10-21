<script lang="ts">
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { copyScrap, type ScrapKind, type ScrapPayload } from '$lib/scrap/model';
import { flashCopySuccess } from '$lib/utils/clipboard';
import styles from './CopyButton.module.scss';

/**
 * Copy button for one scrap. `pinned` = top-right corner of the nearest
 * positioned ancestor (the scrap shell); otherwise the parent places it.
 */
let {
	payload,
	kind,
	pinned = false,
}: { payload: ScrapPayload; kind: ScrapKind; pinned?: boolean } = $props();

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
  class={[styles.btn, pinned && styles.pinned, copied && styles.copied]}
  onclick={handleCopy}
  aria-label={label}
  title={label}
>
  <Icon icon={copied ? 'ph:check' : 'ph:paperclip'} class={styles.icon} />
</button>
