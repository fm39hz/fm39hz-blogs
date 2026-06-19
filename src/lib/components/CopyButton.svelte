<script lang="ts">
import Icon from '@iconify/svelte';
import { useTranslations } from '$lib/i18n';
import { COPY_FEEDBACK_MS } from '$lib/constants';

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

<button class="copy-code" class:copied onclick={handleCopy} aria-label={i18n.a11y.copyCode} title={i18n.a11y.copyCode}>
  <Icon icon={copied ? 'ph:check' : 'ph:clipboard-text'} />
</button>

<style>
  .copy-code {
    position: absolute; inset-inline-end: 0.75rem; top: -0.75rem; z-index: 1;
    transform: rotate(2deg); width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    background: color-mix(in srgb, var(--bg) 90%, transparent);
    color: var(--fg); border: 1px solid color-mix(in srgb, var(--accent) 60%, transparent);
    border-radius: 0.25rem; padding: 0; font-size: 0.75rem;
    transition: transform 0.2s, border-color 0.2s, background 0.2s;
  }
  .copy-code:hover { transform: rotate(0deg) scale(1.1); border-color: var(--accent); background: color-mix(in srgb, var(--accent) 15%, var(--bg)); }
  .copy-code:active { transform: rotate(0deg) scale(0.95); }
  .copy-code.copied { transform: rotate(0deg) scale(1.15); }
  .copy-code :global(svg) { width: 0.875rem; height: 0.875rem; }
</style>
