<script lang="ts">
	import { authStore } from '$lib/scripts/authentication';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	$: if (browser && $authStore === 'LOGGED_OUT') {
		setTimeout(() => goto('/login'), 0); // setTimeout is to fix some weird bug
	}
</script>

<slot />
