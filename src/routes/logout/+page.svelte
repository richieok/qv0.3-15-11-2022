<script>
    import {goto} from "$app/navigation"
    import {userStore} from "$lib/components/mystore.js"

    export let data
    const {logout} = data
    if (logout){
        console.log('set userStore logout');
        userStore.set({
            firstname: null
        })
        goto('/')
    }
</script>