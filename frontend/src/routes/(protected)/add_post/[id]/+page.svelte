<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PostEditor from '$lib/components/PostEditor.svelte';
	import { protectedApiFetch } from '$lib/scripts/apiFetch';

	let name = '';
	let description = '';
	let files: FileList | undefined;
	let quill: any;

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		await protectedApiFetch(`/course/${$page.params.id}/lesson`, 'POST', {
			name,
			description,
			content: quill.root.innerHTML
		});
		setTimeout(() => goto(`/posts/${$page.params.id}`), 0);
	}
</script>

<PostEditor
	title="Add post"
	submitText="Add"
	bind:name
	bind:description
	bind:files
	bind:quill
	on:submit={submit}
/>
