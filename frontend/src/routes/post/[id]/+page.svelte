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
	<div class="p-20">
		<p>nazwa: {data.lesson.name}</p>
		<p>opis: {data.lesson.description}</p>
		<p>content: {@html data.lesson.content}</p>
	</div>
{/await}
