<script>
    import { onMount } from "svelte";
    export let document;
    let keys = [];

    // $: console.log(document);

    onMount(() => {
        if (document) {
            for (let key in document){
                keys = [...keys, key]
            }
        }
    });
</script>

{#if keys.length}
    <ul>
        {#each keys as key}
            <li>{key}: {document[key]}</li>
        {/each}
    </ul>
{/if}

<style>
    ul {
        padding: .5em 1em 0.5em 1em;
    }
    li {
        list-style: none;
    }
</style>