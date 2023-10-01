<script lang="ts">
	import {page } from '$app/stores';
	import {GoDiffAdded} from '$lib/icons.js'
	import {TiEdit} from '$lib/icons.js'
	import { authStore } from '$lib/scripts/authentication';

	const courses = [
		{
			id: 1,
			creatorId: 1,
			name: 'Kurs 1',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet eligendi cumque consequatur sint nisi sapiente. Iste beatae laboriosam iure molestias cum expedita architecto itaque quae rem.',
		},
		{
			id: 2,
			creatorId: 2,
			name: 'Kurs 2',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet eligendi cumque consequatur sint nisi sapiente. Iste beatae laboriosam iure molestias cum expedita architecto itaque quae rem.',
		},
		{
			id: 3,
			creatorId: 3,
			name: 'Kurs 3',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet eligendi cumque consequatur sint nisi sapiente. Iste beatae laboriosam iure molestias cum expedita architecto itaque quae rem.',
		}
	];

</script>

<div class="p-20">
	<h1 class="h1">Courses</h1>
	<div class="flex flex-wrap justify-center"> 
		{#each courses as course}
		<!-- dodać coś takiego https://www.skeleton.dev/elements/cards -->
		<a href="/posts/{course.id}" class="card bg-initial card-hover overflow-hidden max-w-sm m-5">
			<header class=" max-h-[10rem]">
				<img class="w-[25rem] h-[10rem] object-cover" src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="">
			</header>
			<div class="p-4 space-y-4">
				<h2 class="h2">{course.name}</h2>
				<article>
					<p>{course.description}</p>
				</article>
			</div>
			<hr class="opacity-50">
			<footer class="p-4 flex justify-start items-center space-x-4">
				<figure class="avatar flex aspect-square text-surface-50 font-semibold justify-center items-center overflow-hidden isolate bg-surface-400-500-token w-8 rounded-full" data-testid="avatar">
					<img class="avatar-image w-full h-full object-cover" src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" alt="">
				</figure>
				<div class="flex-auto flex justify-between items-center">
					<h6 class="font-bold">Autor</h6>
					<small>
						data stworzenia kursu
					</small>
					{#if typeof $authStore === "object"}
							<small class="w-6 h-6">
								<a href="/edit_course/{$page.params.id}"><TiEdit/></a>
							</small>
					{/if}
				</div>
			</footer>
			
		</a>
	{/each}
	</div>
	
</div>

{#if typeof $authStore === "object"}
	<a href="/add_course" class="absolute right-3 bottom-3 w-16 h-16">
		<GoDiffAdded />
	</a>
{/if}