<script>
    export let delay = .2
    let width
    let height
    let p1

    let inset1 = 5
    let pathLength
    // let inset2 = 10

    
    $: if (p1){
        pathLength = p1.getTotalLength()
    }
</script>

<div class="out">
    <div class="border" bind:clientWidth={width} bind:clientHeight={height}>
        {#if width && height}
            <svg>
                <path bind:this={p1} class="wrap" d="M{inset1} {inset1} h{width - inset1*2} v{height-inset1*2} h-{width - inset1*2}z" 
                style="--doffset:{pathLength};--delay:{delay}s;stroke:black;stroke-width:3;fill:none;stroke-linejoin:round;stroke-dasharray:{pathLength};stroke-dashoffset:{pathLength};"/>
                <!-- <path bind:this={p1} class="wrap" d="M{inset1} {inset1} h{width - inset1*2} v{height-inset1*2} h-{width - inset1*2}z" 
                style="stroke:black;stroke-width:3;fill:none;stroke-linejoin:round;"/> -->
            </svg>
        {/if}
    </div>
    <div class="content">
        <slot/>
    </div>
</div>

<style>
    .out {
        display: inline-block;
        position: relative;
        /* margin: 2em; */
    }

    .content {
        display: grid;
        place-items: center;
        padding: 2em;
    }

    .border {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    svg {
        width: 100%;
        height: 100%;
    }
    .wrap {
        animation: wrapContent 1s var(--delay) forwards;
    }

    @keyframes wrapContent {
        0% {
            stroke-dashoffset: var(--doffset);
        }
        100% {
            stroke-dashoffset: 0;
        }
    }
</style>