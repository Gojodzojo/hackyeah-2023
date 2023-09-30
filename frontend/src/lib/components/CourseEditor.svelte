<script lang="ts">
	export let title = '';
	export let submitText = '';
	export let name = '';
	export let description = '';
	export let files: FileList | undefined;
	export let submit: () => any = () => {};
	let imageSrc = '';

	const fr = new FileReader();
	fr.onload = function (e) {
		imageSrc = this.result as string;
	};

	$: if (files) {
		fr.readAsDataURL(files[0]);
	}
</script>

<div class="w-full h-full flex justify-center items-center flex-col">
	<h1 class="h1 mb-5">{title}</h1>
	<form on:submit={submit} class="card p-4 space-y-4">
		<label class="label">
			<span>Course name</span>
			<input bind:value={name} class="input" type="text" placeholder="Course name" />
		</label>

		<label class="label">
			<span>Course description</span>
			<input bind:value={description} class="input" type="text" placeholder="Course description" />
		</label>

		{#if imageSrc}
			<img src={imageSrc} alt="" class="w-[25rem] h-[10rem] object-cover" />
		{/if}

		<label class="btn variant-filled w-full">
			Pick image
			<input class="hidden" accept="image/*" bind:files type="file" />
		</label>

		<button class="btn variant-filled-primary w-full">{submitText}</button>
	</form>
</div>
