<script lang="ts">
	export let icon: any;
	export let selected: boolean = false;
</script>

<span style="color: {selected ? 'black' : 'white'};">
	<svelte:component this={icon} />
</span>

<style>
	span {
		display: inline-block;
		color: white;
		width: 24px;
		height: 24px;
	}
</style>
