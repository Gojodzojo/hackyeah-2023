<script lang="ts">
	import CourseEditor from '$lib/components/CourseEditor.svelte';
	import { page } from '$app/stores';
	import { apiFetch, protectedApiFetch } from '$lib/scripts/apiFetch';
	import PageLoading from '$lib/components/PageLoading.svelte';
	import { goto } from '$app/navigation';

	let name = '';
	let description = '';
	let files: FileList | undefined;

	console.log($page.params);
	const postsPromise = apiFetch(`/course/${$page.params.id}`, 'GET').then(({ data }) => {
		name = data.course.name;
		description = data.course.description;
	});

	async function submit() {
		await protectedApiFetch(`/course/${$page.params.id}`, 'PUT', { name, description });
		setTimeout(() => goto('/courses'), 0);
	}
</script>

{#await postsPromise}
	<PageLoading />
{:then _}
	<CourseEditor
		title="Edit course"
		submitText="Edit"
		bind:name
		bind:description
		bind:files
		{submit}
	/>
{/await}
