<script lang="ts">
    import { sBody } from "./../stores/snakeBody";

    export let cols: number;
    export let color: string;

    let x: number, y: number;
    export let col = x;
    export let row = y;

    export const genNewFood = () => {
        const illigalCoords = $sBody.map(part=>`${part.col}, ${part.row}`);

        const genCoords = () => {
            x = Math.floor(Math.random() * (cols - 2) + 1);
            y = Math.floor(Math.random() * (cols - 2) + 1);
    
            if (illigalCoords.includes(`${x}, ${y}`)) {return genCoords()}
            return [x, y]
        }
        
        [col, row] = genCoords();
    }

    genNewFood();
</script>

<svelte:options accessors={true}/>
<div class="food" style="grid-column:{x};grid-row:{y};background:{color}"></div>
