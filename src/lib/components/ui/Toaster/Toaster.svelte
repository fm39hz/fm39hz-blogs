<script lang="ts">
import { browser } from '$app/env';
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { globalToaster } from '$lib/state/toast.svelte';
import styles from './Toaster.module.scss';
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
        <button {...toast.close} class={styles.closeBtn} aria-label="Close notification">
          <Icon icon="ph:x-bold" class={styles.closeIcon} />
        </button>
      </div>
    {/each}
  </div>
{/if}
