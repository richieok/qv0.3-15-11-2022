<script>
    import '../app.css'
    import Nav from "$lib/components/Nav.svelte"
    import {userStore} from "$lib/components/mystore.js"
    export let data;
    const staticlinks = data.staticlinks;
    const dynamiclinks = data.dynamiclinks;
    let user = data.user    

    let scaleX
    let scaleY

    let vWidth
    let vHeight

    let svgPath = {
        width: 100,
        height: 100
    }

    $:{
        scaleX = vWidth/svgPath.width
        scaleY = vHeight/svgPath.height
    }
    $: if (user.firstname){
        console.log("set userStore layout svelte");
        userStore.set({
            firstname: user.firstname
        })
    }
</script>

<div class="main">
    <div class="bg" bind:clientWidth={vWidth} bind:clientHeight={vHeight}>
        {#if (scaleX && scaleY)}
        <svg class="bg-svg">
            <defs>
                <linearGradient id="gradient" x1="0" x2="1" y1="0.5" y2="0.5">
                    <stop offset="0%" stop-color="rgb(13,200,253)" stop-opacity="0.7"></stop>
                    <stop offset="100%" stop-color="rgb(0,150,189)" stop-opacity="0.5" ></stop>
                </linearGradient>
            </defs>
            <path d="M0 0h{svgPath.width} v{svgPath.height} h-{svgPath.width}z"style="fill: url(#gradient);stroke:none" transform="scale({scaleX}, {scaleY})"></path>
        </svg>
            
        {/if}
    </div>
    <Nav {staticlinks} {dynamiclinks} user={$userStore}></Nav>
    <div class="pre-padding">
        <slot></slot>
    </div>
</div>

<style>
    .main {
        position: relative;
        height: 100vh;
    }
    .bg {
        /* display: none; */
        position: fixed;
        top: 0;
        z-index: -2;
        width: 100%;
        height: 100%;
        background-size: cover;
    }

    .bg-svg {
        width: 100%;
        height: 100%;
    }
    .pre-padding {
        padding-top: 4em;
        height: 100vh;
    }
</style>