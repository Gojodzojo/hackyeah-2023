<script lang="ts">
	import { page } from '$app/stores';
	import { protectedApiFetch } from '$lib/scripts/apiFetch';

	const postPromise = protectedApiFetch(`/course/0/lesson/${$page.params.id}`, 'GET');

	const post = [
		{
			id: 1,
			creatorId: 1,
			name: 'nazwa',
			description: 'opis',
			content: 'mdx content'
		}
	];
</script>

{#await postPromise}
	Loading
{:then { data }}
	<div class="w-full h-full flex items-center flex-col">
		<h1 class="h1 mb-5 mt-16">{data.lesson.name}</h1>
		<span class="text-surface-400 mb-5">
			{data.lesson.description}
		</span>

		<div class="card p-4 space-y-4 w-5/6">
			{@html data.lesson.content}
		</div>
	</div>
{/await}
