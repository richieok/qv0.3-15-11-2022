<script>
    import Signup from "$lib/components/forms/Signup.svelte";

    export let form;
    let message = ''
    $: if (form?.message){
        message = form.message
    }

</script>

<div>
    <Signup {message}/>
</div>

<style>
    div {
        height: 100%;
    }
</style>