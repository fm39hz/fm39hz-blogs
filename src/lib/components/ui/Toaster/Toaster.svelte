<script lang="ts">
import Icon from '@iconify/svelte';
import { browser } from '$app/env';
import { globalToaster } from '$lib/state/toast.svelte';
import styles from './Toaster.module.scss';
</script>

{#if browser}
  <div {...globalToaster.root} class={styles.root}>
    {#each globalToaster.toasts as toast (toast.id)}
      <div {...toast.content} class={styles.toast}>
        <div class={styles.iconContainer}>
          <Icon icon="ph:check-circle-bold" />
        </div>
        <div class={styles.message}>
          <span {...toast.title}>{toast.data}</span>
        </div>
        <button {...toast.close} class={styles.closeBtn} aria-label="Close notification">
          <Icon icon="ph:x-bold" />
        </button>
      </div>
    {/each}
  </div>
{/if}
