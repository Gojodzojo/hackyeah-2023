<script lang="ts">
	import { goto } from '$app/navigation';
	import { logout } from '$lib/scripts/authentication';
	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let username = '';
	$: initials = username.split(' ').reduce((acc, u) => acc + u.toUpperCase(), '');

	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};

	function signOut() {
		logout();
		setTimeout(() => goto('/'), 1);
	}
</script>

<div use:popup={popupFeatured}>
	<Avatar {initials} width="w-8" />
</div>

<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
	<div class="space-y-4">
		<button class="btn variant-soft w-full" on:click={signOut}> Logout </button>
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>
