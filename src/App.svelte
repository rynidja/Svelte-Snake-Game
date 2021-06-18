<script lang="ts">
    import Grid from "./components/grid.svelte";
    import Food from "./components/food.svelte";
    import Snake from "./components/snake.svelte";
    import GOMenu from "./components/GameOver.svelte";

    const cols = 20;
    const width = 500;
    const gGap = 1;

    let gColor = "lightgrey";
    let fColor = "red";
    let sColor = "green";

    let snake:Snake;
    let food:Food;
    let score = 0;
    let gameOver = false;

    const start = () => {
        let loop = setInterval(() => {
            if (snake.isAlive) {
                snake.render();
                if (food.col === snake.hcol && food.row === snake.hrow) {
                    food.genNewFood(); 
                    snake.appendPart();
                }
                score = snake.length;
            } else {
                clearInterval(loop);
                gameOver = true;
            }
        },100);
    }
    
    const restart = () => {
        gameOver = false;
        score = 0;
        snake.reset();
        start();
    };
    start();
</script>

<main>
    <div class="title">
        <h1>Snake Game w/ svelte</h1>
    </div>
    <div class="main">
        <Grid {cols} {width} color={gColor} gap={gGap}>
            <Snake {cols} color={sColor} slot="snake" bind:this={snake}/>
            <Food {cols} color={fColor} slot="food" bind:this={food}/>
        </Grid>
        <GOMenu {score} show={gameOver} on:click={restart}/>
    </div>
    <div class="display">
        <h3>Your Score: {score}</h3>
    </div>
</main>

<style lang="css">
    main{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .display{
        text-align: center;
        border: 2px solid #ffa;
        box-shadow: 1px 1px #dda;
        background: #fe9;
        border-radius: 15px;
        width: 250px;
        height: 40px;
        margin: 15px auto;
    }
    h3{
        margin-top: 8px;
        font-size: 1.5em;
    }
    .title{
        text-align: center;
        background: #bbc;
        border: 2px solid #ddf;
        box-shadow: 1px 1px #ccd;
        border-radius: 10px;
        width: 350px;
        height: 50px;
        margin: 20px auto;
        margin-top: 0;
    }
    h1{
        margin: 8px 0;
        font-size: 1.8em;
    }
</style>
