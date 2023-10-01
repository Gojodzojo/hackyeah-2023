<script lang="ts">
	import {page } from '$app/stores';
	import { authStore } from '$lib/scripts/authentication';
	import {GoDiffAdded} from '$lib/icons.js'
	import {TiEdit} from '$lib/icons.js'
	console.log($page.params);

	const posts = [
		{
			id: 1,
			name: "post 1",
			description: "opis posta"
		},
		{
			id: 2,
			name: "post 2",
			description: "opis posta"
		}
	];
	
</script>

<header class="w-full flex gap-1 p-1">
		<a class="logo-item h-1" href="/posts/{$page.params.id}">
			<span>POSTY</span>
		</a>
		<a class="logo-item h-1" href="/forum/{$page.params.id}">
			<span>FORUM</span>
		</a>
</header>

<div class="p-20">
	<div class="flex flex-wrap justify-center"> 
		{#each posts as post}
			<!-- dodać coś takiego https://www.skeleton.dev/elements/cards -->
			<a href="/post/{post.id}" class="card bg-initial card-hover overflow-hidden max-w-sm m-5">
				<header class=" max-h-[10rem]">
					<img class="w-[25rem] h-[10rem] object-cover" src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" alt="">
				</header>
				<div class="p-4 space-y-4">
					<h2 class="h2">{post.name}</h2>
					<article>
						<p>{post.description}</p>
					</article>
				</div>
				<hr class="opacity-50">
				<footer class="p-4 flex justify-start items-center space-x-4">
					<div class="flex-auto flex justify-between items-center">
						<small>
							data stworzenia kursu
						</small>
						{#if typeof $authStore === "object"}
							<small class="w-6 h-6">
								<a href="/edit_post/{$page.params.id}"><TiEdit/></a>
							</small>
						{/if}
					</div>
				</footer>
			</a>
		{/each}
	</div>
</div>

{#if typeof $authStore === "object"}
	<a href="/add_post" class="absolute right-3 bottom-3 w-16 h-16">
		<GoDiffAdded />
	</a>
{/if}