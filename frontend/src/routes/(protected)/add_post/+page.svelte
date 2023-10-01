<script lang="ts">
	import PostEditor from '$lib/components/PostEditor.svelte';

	let name = '';
	let description = '';
	let files: FileList | undefined;
	let quill: any;

	function submit(e: SubmitEvent) {
		e.preventDefault();
		console.log({
			name,
			description,
			content: quill.root.innerHTML
		});
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
