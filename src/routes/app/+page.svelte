<script>
    import { goto } from "$app/navigation";
    import ListCollections from "$lib/components/ListCollections.svelte";
    export let data;
    
    const collections = data?.collections;
    // $: console.log(collections);

    const openCollection = async (evt) => {
        // console.log(`/app/${evt.detail.collectionName}`);
        goto(`/app/${evt.detail.collectionName}`);
    };
</script>

<div class="book">
    {#if collections}
        <ListCollections on:open={openCollection} {collections} />
    {/if}
</div>

<style>
    .book {
        width: 100%;
        height: 100%;
        padding: 1em;
    }
    .container {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
    }

    .collections {
        display: grid;
        grid-template-columns: auto auto;
        text-transform: capitalize;
        padding: 0.3em 0.3em;
        gap: 10px 10px;
    }
    .collections h3 {
        display: grid;
        place-items: center;
        padding: 5px;
    }
    .collections button {
        padding: 5px;
    }
</style>
