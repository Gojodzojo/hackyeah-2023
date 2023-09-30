<script lang="ts">
	import { page } from '$app/stores';
	import PostEditor from '$lib/components/PostEditor.svelte';

	let name = '';
	let description = '';
	let files: FileList | undefined;
	let quill: any;

	console.log($page.params.id);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		console.log({
			courseId: $page.params.id,
			name,
			description,
			content: quill.root.innerHTML
		});
	}
</script>

<PostEditor
	title="Edit course"
	submitText="Edit"
	bind:name
	bind:description
	bind:files
	bind:quill
	on:submit={submit}
/>
