<script>
	import '../app.postcss';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, AppShell, Toast, initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import { authStore, tryLoginFromCookie } from '$lib/scripts/authentication';
	import { browser } from '$app/environment';
	import PageLoading from '$lib/components/PageLoading.svelte';
	import UserAvatar from '$lib/components/UserAvatar.svelte';

	// Floating UI for Popups
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();
	browser && tryLoginFromCookie();
</script>

<Toast />

<AppShell>
	<AppBar slot="header">
		<svelte:fragment slot="lead">
			<a href="/">
				<strong class="text-xl uppercase">Starship</strong>
			</a>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<a
				class="btn btn-sm variant-ghost-surface"
				href="https://github.com/Gojodzojo/hackyeah-2023"
				target="_blank"
				rel="no-refer"
			>
				GITHUB
			</a>
			<a class="btn btn-sm variant-ghost-surface" href="/courses"> KURSY </a>
			<a class="btn btn-sm variant-ghost-surface" href="/login"> LOGIN </a>
			{#if typeof $authStore === 'object'}
				<UserAvatar username="Mateusz Goik" />
			{/if}
		</svelte:fragment>
	</AppBar>

	{#if $authStore === 'LOADING'}
		<PageLoading />
	{:else}
		<slot />
	{/if}
</AppShell>
