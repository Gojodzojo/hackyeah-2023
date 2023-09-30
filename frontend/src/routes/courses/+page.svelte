<script lang="ts">
	const courses = [
		{
			id: 1,
			creatorId: 1,
			name: 'Kurs 1',
			description: 'cos'
		}
	];
</script>

<div class="p-20">
	<h1 class="h1">Courses</h1>
	{#each courses as course}
		<!-- dodać coś takiego https://www.skeleton.dev/elements/cards -->
	{/each}
</div>
