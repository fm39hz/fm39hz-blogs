<script lang="ts">
import { browser } from '$app/env';
import { lightbox } from '$lib/state/lightbox.svelte';
import styles from './Lightbox.module.scss';
</script>

{#if browser}
  <div
    {...lightbox.dialog.overlay}
    {@attach lightbox.dialog.refs.attach('overlay')}
    class={styles.overlay}
  ></div>

  <dialog
    {...lightbox.dialog.content}
    {@attach lightbox.dialog.refs.attach('content')}
    class={styles.dialog}
    data-scroll-lock={lightbox.dialog.open || undefined}
  >
    <div class={styles.imageContainer}>
      {#if lightbox.src}
        <img src={lightbox.src} alt={lightbox.alt} />
      {/if}
      {#if lightbox.alt}
        <p class={styles.caption}>{lightbox.alt}</p>
      {/if}
    </div>
  </dialog>
{/if}
