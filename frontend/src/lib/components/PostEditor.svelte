<script lang="ts">
	import type Quill from 'quill';
	import { onMount } from 'svelte';

	export let title = '';
	export let submitText = '';
	export let name = '';
	export let description = '';
	export let files: FileList | undefined;
	export let quill: Quill;

	let imageSrc = '';

	const fr = new FileReader();
	fr.onload = function (e) {
		imageSrc = this.result as string;
	};

	$: if (files) {
		fr.readAsDataURL(files[0]);
	}

	let editor: HTMLDivElement;

	const toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	onMount(async () => {
		const { default: Quill } = await import('quill');

		quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});
	});
</script>

<div class="w-full h-full flex justify-center items-center flex-col">
	<h1 class="h1 mb-5">{title}</h1>
	<form on:submit class="card p-4 space-y-4">
		<label class="label">
			<span>Post name</span>
			<input bind:value={name} class="input" type="text" placeholder="Post name" />
		</label>

		<label class="label">
			<span>Post description</span>
			<input bind:value={description} class="input" type="text" placeholder="Post description" />
		</label>

		{#if imageSrc}
			<img src={imageSrc} alt="" class="w-[25rem] h-[10rem] object-cover" />
		{/if}

		<label class="btn variant-filled w-full">
			Pick image
			<input class="hidden" accept="image/*" bind:files type="file" />
		</label>

		<div class="bg-white">
			<div bind:this={editor} class="text-black" />
		</div>

		<button class="btn variant-filled-primary w-full">{submitText}</button>
	</form>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
