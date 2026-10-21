<script lang="ts">
import { browser } from '$app/env';
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { lightbox } from '$lib/state/lightbox.svelte';
import styles from './Lightbox.module.scss';

let t = $derived(useTranslations(locale.value));
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

    <button
      type="button"
      onclick={() => { lightbox.dialog.open = false; }}
      class={styles.closeBtn}
      aria-label={t.a11y.closeImage}
    >
      <Icon icon="ph:x-bold" class={styles.closeIcon} />
    </button>
  </dialog>
{/if}
