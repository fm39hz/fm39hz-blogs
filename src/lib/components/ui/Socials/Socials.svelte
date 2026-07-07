<script lang="ts">
import Icon from '@iconify/svelte';
import cfg from '$lib/config';
import { socialIcons } from '$lib/design-system';
import styles from './Socials.module.scss';

function iconName(name: string): string {
	const link = cfg.socials.find((s) => s.name === name);
	return link?.icon ?? socialIcons[name] ?? `ph:${name}`;
}

const anim = {
	github:   '--rotate-val: -12deg; --zoom-val: 1.15',
	x:        '--rotate-val: 8deg;   --zoom-val: 1.25',
	linkedin: '--rotate-val: -6deg;  --zoom-val: 1.1',
	mail:     '--rotate-val: 10deg;  --zoom-val: 1.2',
} as Record<string, string>;
</script>

<div class={styles.socials}>
  {#each cfg.socials as { name, url, linkTitle }}
    <a href={url} title={linkTitle ?? `${cfg.site.title} on ${name}`} style={anim[name] ?? ''}>
      <Icon icon={iconName(name)} />
    </a>
  {/each}
</div>
