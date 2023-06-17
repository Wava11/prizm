import { generateNextStagesMap, generateTransitions } from ".";

console.log(generateTransitions(generateNextStagesMap(["a", "b", "c", "d"], [
    ["c", "d"],
    ["c", "d"],
    ["b", "c"],
    ["b", "c"],
    ["b", "c"],
    ["b", "c"],
    ["a", "b", "c"],
    ["d"],
])));