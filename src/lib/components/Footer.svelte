<script lang="ts">
import { useTranslations } from '$lib/i18n';
import Socials from './Socials.svelte';

let { locale = 'en', noMarginTop = false }: { locale?: string; noMarginTop?: boolean } = $props();
let t = $derived(useTranslations(locale));
const year = new Date().getFullYear();
</script>

<footer class:nomargin={noMarginTop}>
  <div class="inner">
    <Socials />
    <p>&copy; {year} {t.footer.copyright}. {t.footer.allRightsReserved}</p>
  </div>
</footer>

<style>
  footer { max-width: 48rem; margin: 0 auto; width: 100%; padding: 0 1rem; }
  footer.nomargin { margin-top: auto; }
  .inner { display: flex; flex-direction: column; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding: 1.5rem 0; }
  p { margin: 0.5rem 0; text-align: center; white-space: nowrap; font-size: 0.875rem; color: var(--muted-fg); }
  @media (width >= 640px) { .inner { flex-direction: row-reverse; padding: 1rem 0; } p { margin: 0; } }
</style>
