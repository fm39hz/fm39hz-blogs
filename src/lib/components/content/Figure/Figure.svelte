<script lang="ts">
import { inView } from '$lib/attachments/inView';
import CopyButton from '$lib/components/ui/CopyButton/CopyButton.svelte';
import { svgToPng } from '$lib/scrap/model';
import styles from './Figure.module.scss';
import { PanZoom } from './panzoom.svelte';

/**
 * Prerendered diagram (build-time SVG from the mdsvex highlighter).
 * `svg` is trusted build output; `source` is the authored DSL for copying.
 */
let {
	kind,
	source,
	svg,
	label = 'Diagram',
}: { kind: 'mermaid' | 'vega-lite'; source: string; svg: string; label?: string } = $props();

let root = $state<HTMLElement>();
// Pencil wiggle animates only on screen; off screen it paints the static twin.
let visible = $state(false);
const view = new PanZoom();
</script>

<svelte:window onpointermove={view.move} onpointerup={view.up} onpointercancel={view.up} />

<figure bind:this={root} class={styles.figure} data-kind={kind} aria-label={label}>
  <!-- Pointer-only magnifier (middle-drag, dblclick); the diagram stays exposed as role="img". -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class={styles.viewport}
    title="Middle-drag: pan · Pinch or Shift+scroll: zoom · Double-click: reset"
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
        class={`pencil-edge ${styles.surface}`}
        data-pencil={visible ? undefined : 'static'}
        role="img"
        aria-label={label}
        {@attach inView((v) => (visible = v))}
      >
        {@html svg}
      </div>
    </div>
  </div>
  <div class={styles.copy}>
    <CopyButton
      kind="figure"
      payload={{ text: source, image: () => (root ? svgToPng(svg, root) : Promise.reject()) }}
    />
  </div>
</figure>
