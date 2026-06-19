<script lang="ts">
import cfg, { socialIcons } from '$lib/config';
import Icon from '@iconify/svelte';

function iconName(name: string): string {
  const link = cfg.socials.find(s => s.name === name);
  return link?.icon ?? socialIcons[name] ?? `ph:${name}`;
}
</script>

<div class="socials">
  {#each cfg.socials as { name, url, linkTitle }}
    <a href={url} title={linkTitle ?? `${cfg.site.title} on ${name}`}>
      <Icon icon={iconName(name)} />
    </a>
  {/each}
</div>

<style>
  .socials { display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem; }
  .socials a { display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.5rem; color: var(--fg); }
  .socials a:hover { color: var(--accent); rotate: 6deg; }
  .socials svg { width: 1.5rem; height: 1.5rem; }
  @media (width >= 640px) { .socials a { padding: 0.25rem; } }
</style>
