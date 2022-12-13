<div>
    <slot/>
</div>

<style>
    div {
        opacity: .1;
        animation: fadein .5s forwards;
        min-height: 100vh;
    }

    @keyframes fadein {
        0% {
            opacity: .1;
        }
        100% {
            opacity: 1;
        }
    }
</style>