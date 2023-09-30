<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { authStore } from '$lib/scripts/authentication';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	$: if (browser && typeof $authStore === 'object') {
		setTimeout(() => goto('/dashboard'), 0); // setTimeout is to fix some weird bug
	}
</script>

<AppShell>
	<AppBar slot="header">
		<svelte:fragment slot="lead">
			<a href="/">
				<strong class="text-xl uppercase">Starship*</strong>
			</a>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<a
				class="btn btn-sm variant-ghost-surface"
				href="/"
				target="_blank"
				rel="noreferrer"
			>
				FORUM
			</a>
			<a
				class="btn btn-sm variant-ghost-surface"
				href="/"
				target="_blank"
				rel="noreferrer"
			>
				KURSY
			</a>
			<a
				class="btn btn-sm variant-ghost-surface"
				href="/login"
				target="_blank"
				rel="noreferrer"
			>
				LOGIN
			</a>
		</svelte:fragment>
	</AppBar>

	<slot />
</AppShell>
