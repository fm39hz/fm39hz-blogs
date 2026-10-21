<script lang="ts">
import { browser } from '$app/env';
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { globalToaster } from '$lib/state/toast.svelte';
import styles from './Toaster.module.scss';

let t = $derived(useTranslations(locale.value));
</script>

{#if browser}
  <div {...globalToaster.root} class={styles.root}>
    {#each globalToaster.toasts as toast (toast.id)}
      <div {...toast.content} class={styles.toast}>
        <div class={styles.iconContainer}>
          <Icon icon="ph:check-circle-bold" class={styles.statusIcon} />
        </div>
        <div class={styles.message}>
          <span {...toast.title}>{toast.data}</span>
        </div>
        <button {...toast.close} class={styles.closeBtn} aria-label={t.a11y.closeNotification}>
          <Icon icon="ph:x-bold" class={styles.closeIcon} />
        </button>
      </div>
    {/each}
  </div>
{/if}
