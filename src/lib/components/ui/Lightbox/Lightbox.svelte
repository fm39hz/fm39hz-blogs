<script lang="ts">
import Icon from '@iconify/svelte';
import { browser } from '$app/environment';
import { lightbox } from '$lib/state/lightbox.svelte';
import styles from './Lightbox.module.scss';

// Helper to convert Melt attachment (which may return a raw function)
// into Svelte's expected { destroy() } action structure.
function toSvelteAction(attachFn: (node: HTMLElement) => void | (() => void)) {
	return (node: HTMLElement) => {
		const destroy = attachFn(node);
		return {
			destroy() {
				if (typeof destroy === 'function') {
					destroy();
				}
			},
		};
	};
}

const attachOverlay = toSvelteAction(lightbox.dialog.refs.attach('overlay'));
const attachContent = toSvelteAction(lightbox.dialog.refs.attach('content'));
</script>

{#if browser}
  <!-- Background Overlay -->
  <div 
    {...lightbox.dialog.overlay} 
    use:attachOverlay
    class={styles.overlay}
  ></div>
  
  <!-- Centered Dialog Modal -->
  <dialog 
    {...lightbox.dialog.content} 
    use:attachContent
    class={styles.dialog}
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
      aria-label="Close image viewer"
    >
      <Icon icon="ph:x-bold" />
    </button>
  </dialog>
{/if}
