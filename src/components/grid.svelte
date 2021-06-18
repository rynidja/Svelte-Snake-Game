<script lang="ts">
    export let cols: number;
    export let width: number;
    export let color: string;
    export let gap: number;
</script>

<div class="grid" style="--cols:{cols};--width:{width/cols-gap/2}px;--gcolor:{color};--gap:{gap}px">
    {#each Array(cols**2) as _ , l}
        <div class="box {l}" style="grid-column: {l - (Math.ceil(l / cols)-1) * cols};grid-row: {Math.ceil(l / cols)}"></div>
    {/each}
    <slot name="snake"/>
    <slot name="food"/>
</div>

<style lang="css">
    .grid{
        display: grid;
        grid-template-columns: repeat(var(--cols), var(--width));
        grid-template-rows: repeat(var(--cols), var(--width));
        grid-gap: var(--gap);
    }
    .box{
        background: var(--gcolor)
    }
</style>
