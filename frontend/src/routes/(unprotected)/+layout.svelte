<script lang="ts">
	import { authStore } from '$lib/scripts/authentication';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	$: if (browser && typeof $authStore === 'object') {
		setTimeout(() => goto('/courses'), 0); // setTimeout is to fix some weird bug
	}
</script>

<slot />
