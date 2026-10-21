<script lang="ts">
import type { Snippet } from 'svelte';
import { inView } from '$lib/attachments/inView';

/**
 * Markdown `>` quote (layout export `blockquote`). The pencil wiggle animates
 * only on screen; off screen it paints the static twin (.pencil-edge in
 * global.scss; typography in prose.scss).
 */
let { children }: { children?: Snippet } = $props();

let visible = $state(false);
</script>

<blockquote
  class="pencil-edge"
  data-pencil={visible ? undefined : 'static'}
  {@attach inView((v) => (visible = v))}
>
  {@render children?.()}
</blockquote>
