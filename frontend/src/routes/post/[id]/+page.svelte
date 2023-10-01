<script lang="ts">
	import {page } from '$app/stores';
	console.log($page.params);

    const post = [
        {
            id: 1,
            creatorId: 1,
            name: "nazwa",
            description: "opis",
            content: "mdx content"
        }   
    ];

</script>

<div class="p-20">
    <p>wybrany post: {$page.params.id}</p>
    <p>nazwa: {post[0].name}</p>
    <p>opis: {post[0].description}</p>
    <p>content: {post[0].content}</p>
</div>