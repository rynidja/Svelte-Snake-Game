<script lang="ts">
    import {dBody, dDirection, sBody, sDirection} from "./../stores/snakeBody";

    export let color: string;
    export let cols: number;

    export let hcol = $sBody[$sBody.length-1].col;
    export let hrow = $sBody[$sBody.length-1].row;
    export let length = 0;
    export let isAlive = true;

    export const appendPart = () => {
        $sBody = [$sBody[0], ...$sBody];
        length++;
    };

    export const render = () => {
        let head = $sBody[$sBody.length-1];

        let col = head.col;
        let row = head.row; 

        if ($sDirection === "right") {
            if (col === cols) {
                col = 0;
            }
            col++;
        } else if ($sDirection === "left") {
            if (col === 1) {
                col = cols + 1;
            }
            col--;
        }
        if ($sDirection === "up") {
            if (row === 1) {
                row = cols + 1;
            }
            row--;
        } else if ($sDirection === "down") {
            if (row === cols) {
                row = 0;
            }
            row++;
        }

        let newHead = {col, row, isHead:true};
        isAlive = !$sBody.some(part=>{return (part.col===newHead.col) && (part.row===newHead.row)});
        
        if (isAlive) {
            head.isHead = false;
            $sBody = [...$sBody.slice(1), newHead];
            [hcol, hrow] = [col, row]; 
        }
    };

    export const reset = () => {
        $sBody = dBody;
        $sDirection = dDirection;
        length = 0;
        isAlive = true;
    }

    const changeDirection = (e:KeyboardEvent) => {
        const key = e.key;
        if (isAlive) {
            if ((key === "d" || key === "ArrowRight") && $sBody[$sBody.length-1].col+1 !== $sBody[$sBody.length-2].col) {
                $sDirection = "right";
            } else if ((key === "a" || key === "ArrowLeft") && $sBody[$sBody.length-1].col-1 !== $sBody[$sBody.length-2].col) {
                $sDirection = "left";
            }
            if ((key === "w" || key === "ArrowUp") && $sBody[$sBody.length-1].row-1 !== $sBody[$sBody.length-2].row) {
                $sDirection = "up";
            } else if ((key === "s" || key === "ArrowDown") && $sBody[$sBody.length-1].row+1 !== $sBody[$sBody.length-2].row) {
                $sDirection = "down";
            }
        }
    };

    document.documentElement.style.setProperty('--scolor', color);
</script>

<svelte:window on:keydown={changeDirection} />
<svelte:options accessors={true}/>
{#each $sBody as part}
    <div class="snake {part.isHead ?  "head " + $sDirection : ""}" class:dead={!isAlive && part.isHead} style="grid-column: {part.col};grid-row: {part.row}"></div>
{/each}

<style lang="scss">
    .snake{
        background: var(--scolor);
    }
    .head{
        background: #222;
        position: relative;
        &::after{
            content: "";
            position: absolute;
            inset: 30% 30%;
            border: solid crimson;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 3px;
        }
        &.right::after{
            transform: rotate(-45deg);
        }
        &.left::after{
            transform: rotate(135deg);
        }
        &.up::after{
            transform: rotate(-135deg);
        }
        &.down::after{
            transform: rotate(45deg);
        }
    }
    .dead{
        &::after {
            content: "x x";
            inset: 25% 1px;
            font-size: 0.8em;
            border: none;
            color: red;
        }
        &.right::after{
            transform: rotate(-90deg);
        }
        &.left::after{
            transform: rotate(90deg);
        }
        &.up::after{
            transform: rotate(-180deg);
        }
        &.down::after{
            transform: rotate(0deg);
        }
    }
</style>
