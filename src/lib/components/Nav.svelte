<script>
    import { page } from "$app/stores"
    import { userStore } from "./mystore.js"

    export let staticlinks = [];
    export let dynamiclinks = []
    export let user;

    let checked = false;
    let currentPath = $page.url.pathname;

    $: {
        if (checked && !(currentPath === $page.url.pathname)){
            checked = false
        }
        currentPath = $page.url.pathname;
    }
    $: {
        //RENDERS ON SERVER AND CLIENT
        console.log(user);
    }

</script>

<div class="navbar">
    {#if staticlinks.length}
    <ul >
        {#each staticlinks as link}
            <li class:active={$page.url.pathname === `${link.href}`}><a href={link.href}>{link.name}</a></li>
        {/each}
        {#each dynamiclinks as {href, name, signedIn}}
            {#if (user && user.firstname ? signedIn: !signedIn)}
                <li class:active={$page.url.pathname === `${href}`}><a href={href}>{name}</a></li>
            {/if}
        {/each}
        {#if user.firstname}
        <p>hi, <span>{user.firstname}</span></p>
        {/if}
    </ul>
    {/if}
    <div class="burger">
        <svg style="stroke: white;stroke-width:4;stroke-linecap: round;">
            <path id="path1" d="M 16 20 h32"/>
            <path id="path2" d="M 16 32 h32"/>
            <path id="path3" d="M 16 44 h32"/>
        </svg>
        <input type="checkbox" bind:checked={checked}>
    </div>
</div>

<style>
    .navbar {
        position: absolute;
        background-color: rgb(45, 43, 43);
        opacity: .95;
        /* width: 100%; */
        color: white;
        height: 4em;
        width: 100%;
    }
    ul {
        position: absolute;
        background-color: inherit;
        width: 100%;
        flex-direction: row;
        bottom: 4em;
        height: fit-content;
        opacity: 0;
        transition: opacity 1s;
    }
    ul li{
        display: flex;
        list-style: none;
        padding: .5em 0;
        justify-content: flex-end;
    }
    ul p {
        margin: auto;
    }
    ul p span{
        font-size: 1.2em;
        text-transform: uppercase;
    }
    ul:has(+ .burger > input:checked){
        top: 4em;
        opacity: 1;
    }
    .burger {
        position: absolute;
        top: 0;
        height: 100%;
        width: 4em;
        right: 0;
    }
    .burger svg {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    #path1, #path3 {
        transition: .5s;
        transform-origin: 32px 32px;
    }
    #path2 {
        transition: opacity .5s;
    }
    svg:has(+ input:checked) #path1{
        transform: rotate(45deg) translate(0, 12px);
    }
    svg:has(+ input:checked) #path2{
        opacity: 0;
    }
    svg:has(+ input:checked) #path3{
        transform: rotate(-45deg) translate(0, -12px);
    }
    .burger input {
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
    }
    a {
        text-decoration: none;
        padding: .2em .5em;
    }
    a:visited, a:link {
        color: inherit;
    }

    @media (min-width: 600px){
        ul {
            position: relative;
            display: flex;
            height: 100%;
            top: 0;
            opacity: 1;
        }
        ul:has(+ .burger > input:checked){
            top: 0;
        }
        ul li {
            padding-left: 1em;
            display: grid;
            place-items: center;
        }
        .burger {
            display: none;
        }
    }
</style>