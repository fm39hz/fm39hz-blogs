<script lang="ts">
import cfg from '$lib/config';
import { socialIcons } from '$lib/design-system';
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import styles from './Socials.module.scss';

let t = $derived(useTranslations(locale.value));

function iconName(name: string): string {
	const link = cfg.socials.find((s) => s.name === name);
	return link?.icon ?? socialIcons[name] ?? `ph:${name}`;
}
</script>

<!-- Per-network hover tilt lives in Socials.module.scss, keyed by data-social. -->
<div class={styles.socials}>
  {#each cfg.socials as { name, url, linkTitle }}
    <a href={url} title={linkTitle ?? t.socialLinkTitle(cfg.site.title, name)} data-social={name}>
      <Icon icon={iconName(name)} class={styles.icon} />
    </a>
  {/each}
</div>
