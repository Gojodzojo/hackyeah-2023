<script lang="ts">
	import CourseEditor from '$lib/components/CourseEditor.svelte';
	import { page } from '$app/stores';

	let name = '';
	let description = '';
	let files: FileList | undefined;

	console.log($page.params);

	function submit() {}
</script>

<CourseEditor
	title="Edit course"
	submitText="Edit"
	bind:name
	bind:description
	bind:files
	{submit}
/>
