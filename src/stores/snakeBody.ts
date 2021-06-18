import { writable } from "svelte/store";


interface bodyPart {
    col: number, row: number, isHead: boolean
};
type direction = "right" | "up" | "left" | "down";

// default values
export let dBody = [
        {col:18, row:1, isHead:false},
        {col: 19, row: 1, isHead: false},
        {col: 20, row: 1, isHead: true}
    ];
export let dDirection: direction = "right";


export const sBody = writable<bodyPart[]>(dBody);
export const sDirection = writable<direction>(dDirection);
