<script lang="ts">
	import {page } from '$app/stores';
	import {IoIosSend} from '$lib/icons.js'
	console.log($page.params);


	const messages= [
		{
			userId: 1,
			content: "Treść wiadomości",
			self: 1
		},
		{
			userId: 2,
			content: "Treść wiadomości",
			self: 0
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
	<section class="card">
		<div class="chat w-full h-full">
			<div class="grid grid-row-[1fr_auto]">
				<section class="p-4 overflow-y-auto space-y-4 w-full">
					{#each messages as message}
						{#if message.self}
							<div class="grid grid-cols-[1fr_auto] gap-2">
								<div class="card p-4 variant-filled-tertiary rounded-tl-none space-y-2">
									<header class="flex justify-between items-center">
										<p class="font-bold">Temat wiadomości/user</p>
										<small class="opacity-50">timestamp</small>
									</header>
									<article>
										<p class="text-sm">
											{message.content}
										</p>
									</article>
								</div>
								<figure class="avatar flex aspect-square text-surface-50 font-semibold justify-center items-center overflow-hidden isolate bg-surface-400-500-token w-12  rounded-full" data-testid="avatar">
									<img class="avatar-image w-full h-full object-cover" src="https://i.pravatar.cc/?img=48" alt="">
								</figure>
							</div>
						{:else}
							<div class="grid grid-cols-[auto_1fr] gap-2">
								<figure class="avatar flex aspect-square text-surface-50 font-semibold justify-center items-center overflow-hidden isolate bg-surface-400-500-token w-12  rounded-full" data-testid="avatar">
									<img class="avatar-image w-full h-full object-cover" src="https://i.pravatar.cc/?img=48" alt="">
								</figure>
								<div class="card p-4 variant-soft rounded-tl-none space-y-2">
									<header class="flex justify-between items-center">
										<p class="font-bold">Temat wiadomości/user</p>
										<small class="opacity-50">timestamp</small>
									</header>
									<article>
										<p class="text-sm">
											{message.content}
										</p>
									</article>
								</div>
							</div>
						{/if}
					{/each}
				</section>
				<section class="border-t border-surface-500/30 p-4">
					<div class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-token">
						<textarea
								class="bg-transparent border-0 ring-0"
								name="prompt"
								id="prompt"
								placeholder="Write a message..."
								rows="1"
						/>
						<button class="input-group-shim">
							send
						</button>
					</div>
				</section>
			</div>
		</div>

	</section>

</div>