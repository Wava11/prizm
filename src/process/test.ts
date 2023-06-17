import { generateNextStagesMap } from ".";

console.log(generateNextStagesMap(["a", "b", "c", "d"], [
    ["c", "d"],
    ["c", "d"],
    ["b", "c"],
    ["b", "c"],
    ["b", "c"],
    ["b", "c"],
    ["a", "b", "c"],
    ["d"],
]));