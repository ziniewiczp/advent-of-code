import { inputs } from "./inputs.js";

const rows = inputs["day-03"].split("\n");
const map = [];

rows.forEach(row => {
    if(row.length > 0) {
        map.push([...row]);
    }
});

let combinations = [
    {
        x: 0,
        y: 0,
        treesCounter: 0,
        xAcc: 1,
        yAcc: 1,
    },
    {
        x: 0,
        y: 0,
        treesCounter: 0,
        xAcc: 3,
        yAcc: 1
    },
    {
        x: 0,
        y: 0,
        treesCounter: 0,
        xAcc: 5,
        yAcc: 1
    },
    {
        x: 0,
        y: 0,
        treesCounter: 0,
        xAcc: 7,
        yAcc: 1
    },
    {
        x: 0,
        y: 0,
        treesCounter: 0,
        xAcc: 1,
        yAcc: 2
    }
];

let multipliedTreesCounter = 1;
for(let combination of combinations) {
    while(combination.y < map.length) {
        if(map[combination.y][combination.x] === "#") { 
            combination.treesCounter += 1;
        }
    
        combination.x = (combination.x + combination.xAcc >= map[0].length)
            ? combination.xAcc - (map[0].length - combination.x)
            : combination.x + combination.xAcc;
    
        combination.y += combination.yAcc;
    }

    console.log("Combination " + combination.xAcc + ", " + combination.yAcc + ": " + combination.treesCounter);
    multipliedTreesCounter *= combination.treesCounter;
}

console.log(multipliedTreesCounter);