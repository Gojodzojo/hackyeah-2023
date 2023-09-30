<script>
	import '../app.postcss';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { Toast, initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import { authStore, tryLoginFromCookie } from '$lib/scripts/authentication';
	import { browser } from '$app/environment';
	import PageLoading from '$lib/components/PageLoading.svelte';

	// Floating UI for Popups
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();
	browser && tryLoginFromCookie();
</script>

<Toast />

{#if $authStore === 'LOADING'}
	<PageLoading />
{:else}
	<slot />
{/if}
