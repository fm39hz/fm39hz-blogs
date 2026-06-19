<script lang="ts">
import { useTranslations } from '$lib/i18n';
import Socials from './Socials.svelte';

let { locale = 'en', noMarginTop = false }: { locale?: string; noMarginTop?: boolean } = $props();
let t = $derived(useTranslations(locale));
const currentYear = new Date().getFullYear();
</script>

<footer class="app-layout {noMarginTop ? '' : 'mt-auto'}">
	<div class="border-border flex flex-col items-center justify-between border-t py-6 sm:flex-row-reverse sm:py-4">
		<Socials />
		<div class="my-2 flex flex-col items-center whitespace-nowrap sm:flex-row">
			<span>{t.footer.copyright} @ {currentYear}</span>
			<span class="hidden sm:inline"> | </span>
			<span>{t.footer.allRightsReserved}</span>
		</div>
	</div>
</footer>
