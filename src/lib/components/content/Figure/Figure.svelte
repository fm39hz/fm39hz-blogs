<script lang="ts">
import { inView } from '$lib/attachments/inView';
import CopyButton from '$lib/components/ui/CopyButton/CopyButton.svelte';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { diagramToPng } from '$lib/scrap/model';
import type { FigureProps } from '../contract';
import styles from './Figure.module.scss';
import { PanZoom } from './panzoom.svelte';

/** Prerendered diagram from the mdsvex highlighter (see contract.ts). */
let { kind, source, art, label }: FigureProps = $props();

let t = $derived(useTranslations(locale.value));
let name = $derived(label ?? t.a11y.diagram);

let root = $state<HTMLElement>();
// Pencil wiggle animates only on screen; off screen it paints the static twin.
let visible = $state(false);
const view = new PanZoom();

function exportImage(): Promise<Blob> {
	return root ? diagramToPng(art, root) : Promise.reject(new Error('figure not mounted'));
}
</script>

<svelte:window onpointermove={view.move} onpointerup={view.up} onpointercancel={view.up} />

<figure bind:this={root} class={styles.figure} data-kind={kind} aria-label={name}>
  <!-- Pointer-only magnifier (middle-drag, dblclick); the diagram stays exposed as role="img". -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class={styles.viewport}
    title={t.a11y.diagramControls}
    bind:clientWidth={view.viewWidth}
    bind:clientHeight={view.viewHeight}
    onpointerdown={view.down}
    ondblclick={view.reset}
    {@attach view.wheel}
  >
    <div
      class={styles.target}
      style:transform={view.transform}
      data-dragging={view.dragging || undefined}
      bind:clientHeight={view.contentHeight}
    >
      <div
        class={['pencil-edge', styles.surface]}
        data-pencil={visible ? undefined : 'static'}
        role="img"
        aria-label={name}
        {@attach inView((v) => (visible = v))}
      >
        {@html art.svg}
      </div>
    </div>
  </div>
  <CopyButton kind="figure" pinned payload={{ text: source, image: exportImage }} />
</figure>
