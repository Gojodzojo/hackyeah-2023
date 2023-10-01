<script lang="ts">
	import { goto } from '$app/navigation';
	import CourseEditor from '$lib/components/CourseEditor.svelte';
	import { protectedApiFetch } from '$lib/scripts/apiFetch';

	let name = '';
	let description = '';
	let files: FileList | undefined;

	async function submit() {
		await protectedApiFetch('/course', 'POST', { name, description });
		setTimeout(() => goto('/courses'), 0);
	}
</script>

<CourseEditor title="Add course" submitText="Add" bind:name bind:description bind:files {submit} />
