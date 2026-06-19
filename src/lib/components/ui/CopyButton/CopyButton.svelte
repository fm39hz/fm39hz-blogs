<script lang="ts">
import Icon from '@iconify/svelte';
import { COPY_FEEDBACK_MS } from '$lib/constants';
import { useTranslations } from '$lib/i18n';
import styles from './CopyButton.module.scss';

let { target: codeBlock, locale = 'en' }: { target: HTMLPreElement; locale?: string } = $props();
let i18n = $derived(useTranslations(locale));
let copied = $state(false);

async function handleCopy() {
	const code = codeBlock.querySelector('code');
	if (!code) return;
	await navigator.clipboard.writeText(code.innerText);
	copied = true;
	setTimeout(() => (copied = false), COPY_FEEDBACK_MS);
}
</script>

<button class={`${styles.btn} ${copied ? styles.copied : ''}`} onclick={handleCopy} aria-label={i18n.a11y.copyCode} title={i18n.a11y.copyCode}>
  <Icon icon={copied ? 'ph:check' : 'ph:clipboard-text'} />
</button>
