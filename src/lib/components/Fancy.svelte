<script>
    let width
    let height

    let inset = 10
    let inset2 = 15
</script>

<div class="out" >
    <div class="border" bind:clientWidth={width} bind:clientHeight={height}>
        {#if width && height}
        <svg >
            <path d="M{inset} {inset} h{width - inset*2} v{height-inset*2} h-{width - inset*2}z" style="stroke:black;stroke-width:3;fill:none;stroke-linejoin: round;"/>
            <path d="M{inset2} {inset2} h{width - inset2*2} v{height-inset2*2} h-{width - inset2*2}z" style="stroke:red;stroke-width:3;fill:none;stroke-linejoin: round;"/>
        </svg>
            
        {/if}

    </div>
    <div class="content">
        <slot></slot>
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
</style>