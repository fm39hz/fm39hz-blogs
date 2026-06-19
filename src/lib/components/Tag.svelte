<script lang="ts">
import Icon from '@iconify/svelte';

let { tag, tagName, size = 'lg' }: { tag: string; tagName: string; size?: 'sm' | 'lg' } = $props();
</script>

<li class="tag">
  <a href="/tags/{tag}/" class="{size}">
    <Icon icon="ph:tag" class="{size}" />
    {tagName}
  </a>
</li>

<style>
  .tag a { display: inline-flex; align-items: center; gap: 0.125rem; border-bottom: 2px dashed var(--fg); text-decoration: none; color: var(--fg); }
  .tag a:hover { border-color: var(--accent); color: var(--accent); margin-top: -0.125rem; }
  .tag a:focus-visible { color: var(--accent); border: none; }
  .lg { font-size: 1.125rem; }
  .sm { font-size: 0.875rem; }
  .lg svg { width: 1.25rem; height: 1.25rem; opacity: 0.8; }
  .sm svg { width: 1rem; height: 1rem; opacity: 0.8; }
</style>
