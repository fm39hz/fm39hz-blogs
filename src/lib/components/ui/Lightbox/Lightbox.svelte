<script lang="ts">
import Icon from '@iconify/svelte';
import type { Action } from 'svelte/action';
import { browser } from '$app/env';
import { lightbox } from '$lib/state/lightbox.svelte';
import styles from './Lightbox.module.scss';

// Svelte 5 use: needs a local reference, not a method chain expression
const overlayAction = lightbox.dialog.refs.attach('overlay') as Action<HTMLElement>;
const contentAction = lightbox.dialog.refs.attach('content') as Action<HTMLElement>;
</script>

{#if browser}
  <div {...lightbox.dialog.overlay} use:overlayAction class={styles.overlay}></div>

  <dialog {...lightbox.dialog.content} use:contentAction class={styles.dialog}>
    <div class={styles.imageContainer}>
      {#if lightbox.src}
        <img src={lightbox.src} alt={lightbox.alt} />
      {/if}
      {#if lightbox.alt}
        <p class={styles.caption}>{lightbox.alt}</p>
      {/if}
    </div>

    <button
      type="button"
      onclick={() => { lightbox.dialog.open = false; }}
      class={styles.closeBtn}
      aria-label="Close image viewer"
    >
      <Icon icon="ph:x-bold" />
    </button>
  </dialog>
{/if}
