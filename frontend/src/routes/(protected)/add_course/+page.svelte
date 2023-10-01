<script lang="ts">
	import CourseEditor from '$lib/components/CourseEditor.svelte';

	let name = '';
	let description = '';
	let files: FileList | undefined;

	function submit() {}
</script>

<CourseEditor title="Add course" submitText="Add" bind:name bind:description bind:files {submit} />
