<form method="post" action="/login">
    <div class="input-grid">
        <label for="email">Email: 
        </label>
        <input type="email" placeholder="john@doe.com" required id="email" name="email">
        <label for="password">Password:</label>
        <input type="password" required id="password" name="password">
    </div>
    <div>
        <button type="submit" >Submit</button>
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
        margin-top: 1em;
        padding: .5em 1em;
    }
</style>