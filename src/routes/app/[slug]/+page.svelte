<script>
    import {goto} from "$app/navigation"
    import ListDocuments from "$lib/components/ListDocuments.svelte";

    export let data;
    let checks = []
    let {documents, collection, count} = data

    const deleteChecked = async (evt) => {
        let list = evt.detail.list
        console.log(list);
        const result = await fetch('/api/collection/'+collection, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'json/application'
            },
            body: JSON.stringify({
                list
            })
        })
        const j = await result.json()
        console.log(j);
        if (j.deletedCount === 0){
            return
        }
        console.log('upading documents');
        const current = await fetch('/api/collection/'+collection, {
            credentials: 'include'
        })
        const down = await current.json()
        documents = down.list
        count = down.count
        documents = documents
    }

    $: if (documents.length){
        console.log('documents length changed');
        checks = []
        for (let d of documents){
            let checked = false;
            checks = [...checks, {checked, _id: d._id}]
        }
    }
</script>

<div class="book">
    <button on:click={()=> goto('/app')}>Back</button>
    {#if documents}
        <h4>{count} item{count > 1 ?'s':''}</h4>
        <ListDocuments {documents} {checks} on:deletelist={deleteChecked}/>
    {/if}
</div>

<style>
    .book {
        width: 100%;
        height: 100%;
        padding: 1em;
    }
    button {
        padding: 0 5px;
    }
</style>