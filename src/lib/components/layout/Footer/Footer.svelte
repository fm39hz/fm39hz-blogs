<script lang="ts">
import { useTranslations } from '$lib/i18n';
import styles from './Footer.module.scss';
import Socials from '../../ui/Socials/Socials.svelte';

let { locale = 'en', noMarginTop = false }: { locale?: string; noMarginTop?: boolean } = $props();
let t = $derived(useTranslations(locale));
const year = new Date().getFullYear();
</script>

<footer class={`${styles.root} ${noMarginTop ? styles.nomargin : ''}`}>
  <div class={styles.inner}>
    <Socials />
    <p class={styles.copy}>&copy; {year} {t.footer.copyright}. {t.footer.allRightsReserved}</p>
  </div>
</footer>
