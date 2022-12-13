<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()
    export let collections;
    
    function handleClick(collectionName){
        dispatch('open', {
            collectionName
        })
    }
</script>

<div class="collections">
    {#each collections as collection, i}
        <h3>{collection.name}</h3>
        <button on:click={()=> handleClick(collection.name)}>Manage</button>
    {/each}
</div>

<style>
    button {
        padding: 5px;
    }
</style>