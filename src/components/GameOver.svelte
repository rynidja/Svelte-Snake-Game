<script lang="ts">
    export let score: number;
    export let show: boolean;
</script>

{#if show}
    <div class="menu">
        <h1>Game Over</h1>
        <h3>Your Score: <span>{score}</span></h3>
        <button on:click>Restart</button>
    </div>
{/if}

<style lang="css">
    .menu{
        position: absolute;
        border: 2px solid #ffd;
        box-shadow: 2px 2px black;
        border-radius: 5px;
        height: 35%;
        width: 50%;
        background: #ddd;
        text-align: center;
        inset: 50% 50%;
        transform: translate(-50%, -50%);
    }
    button{
        border: 1px solid goldenrod;
        font-size: 1.3em;
        height: 25%;
        width: 33.3%;
    }
    button:hover{
        background: #ea3;
        color: white;
    }
</style>