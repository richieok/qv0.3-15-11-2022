<script>
    export let action;
    export let message = '';

    let password
    let confPassword
    let disabled

    $: if (password && (password === confPassword)) {
        disabled = false
    } else {
        disabled = true

    }
</script>

<form action="{action}" method="post">
    <div class="message">
        {#if message}
            {message}
        {/if}
    </div>
    <div class="input-grid">
        <label for="firstname">Username: 
        </label>
        <input type="text" placeholder="Username" id="username" name="username">
        <label for="firstname">First Name: 
        </label>
        <input type="text" placeholder="John" id="firstname" name="firstname">
        <label for="lastname">Last Name:
        </label>
        <input type="text" placeholder="Doe" id="lastname" name="lastname">
        <label for="email">Email: 
        </label>
        <input type="email" placeholder="john@doe.com" required id="email" name="email">
        <label for="password">Password:</label>
        <input type="password" required id="password" name="password" bind:value={password}>
        <label for="conf-password">Confirm Password</label>
        <input type="password" required id="confPassword" bind:value={confPassword}>
    </div>
    <div>
        <button type="submit" disabled={disabled}>Submit</button>
    </div>
</form>

<style>
    .input-grid{
        display: grid;
        grid-template-columns: auto auto;
        gap: 5px 0;
    }
    form {
        background-color: antiquewhite;
        padding: 1em;
        border-radius: 1em;
        margin: 8em auto;
        width: 300px;
    }
    .input-grid input {
        height: 1.5em;
    }
    .input-grid + div{
        display: grid;
        place-items: center;
    }
    
    button {
        padding: .5em 1em;
    }
    .message {
        height: 2em;
        width: 100%;
        font-weight: bold;
        color: red;
        text-transform: capitalize;
    }
</style>
