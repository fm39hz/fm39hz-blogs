<script lang="ts">
import Icon from '@iconify/svelte';
import cfg, { socialIcons } from '$lib/config';
import styles from './Socials.module.scss';

function iconName(name: string): string {
	const link = cfg.socials.find((s) => s.name === name);
	return link?.icon ?? socialIcons[name] ?? `ph:${name}`;
}
</script>

<div class={styles.socials}>
  {#each cfg.socials as { name, url, linkTitle }}
    <a href={url} title={linkTitle ?? `${cfg.site.title} on ${name}`}>
      <Icon icon={iconName(name)} />
    </a>
  {/each}
</div>
