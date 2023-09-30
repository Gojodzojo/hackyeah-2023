<script lang="ts">
	import { goto } from '$app/navigation';
	import { register } from '$lib/scripts/authentication';
	import { showApiErrorToast, showErrorToast } from '$lib/scripts/errorToast';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	let username = '';
	let password1 = '';
	let password2 = '';
	let registerPromise: Promise<any> | undefined;

	function submit() {
		let error = '';

		if (password1 !== password2) {
			error = "Passwords aren't identical";
		} else if (password1.length < 8) {
			error = 'Password is too short';
		} else if (username.length < 5) {
			error = 'Username is too short';
		}

		if (error !== '') {
			showErrorToast(error, toastStore);
		} else {
			registerPromise = register(username, password1)
				.then(() => setTimeout(() => goto('/dashboard'), 1))
				.catch(showApiErrorToast(toastStore));
		}
	}
</script>

<div class="w-full h-full flex justify-center items-center flex-col">
	<h1 class="h1 mb-3">Create your account</h1>
	<span class="text-surface-400 mb-5">
		Already registered?
		<a href="/login" class="anchor">Login</a>
	</span>

	<form on:submit={submit} class="card p-4 space-y-4">
		<label class="label">
			<span>Username</span>
			<input bind:value={username} class="input" type="text" placeholder="Username" />
		</label>

		<label class="label">
			<span>Password</span>
			<input bind:value={password1} class="input" placeholder="Password" type="password" />
		</label>

		<label class="label">
			<span>Repeat password</span>
			<input bind:value={password2} class="input" placeholder="Repeat password" type="password" />
		</label>

		<button class="btn variant-filled-primary w-full">Register</button>
	</form>
</div>
