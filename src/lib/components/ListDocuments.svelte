<script>
    import {createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()
    import Keys from "./Keys.svelte";
    export let documents;
    export let checks

    let selectDocuments = false;

    const startSelection = ()=>{
        selectDocuments = true
    }
    const cancelSelection = ()=>{
        for (let c of checks){
            c.checked = false
        }
        selectDocuments = false
    }
    const deleteSelection = async ()=>{
        let deleteList = checks.filter((item) => item.checked)
        // console.log(deleteList);
        dispatch('deletelist', {
            list: deleteList
        })
    }

    // $: if (documents.length){
    //     // checks = []
    //     for (let d of documents){
    //         let checked = false;
    //         checks = [...checks, {checked, _id: d._id}]
    //     }
    // }
</script>

<div>
    {#if checks.length}
        <div class="">
            {#if !selectDocuments}
                <button on:click={startSelection}>Select</button>
            {:else}
                <button on:click={cancelSelection}>Cancel</button>
                <button on:click={deleteSelection}>Delete</button>
            {/if}
        </div>
        {#each documents as doc, i}
            {#if selectDocuments}
                <input type="checkbox" bind:checked={checks[i].checked}>
            {/if}
            <Keys document={doc} />
        {/each}
    {/if}
</div>

<style>
    input {
        margin-left: 1em;
    }
    button {
        width: 6em;
    }
</style>