import { inputs } from "./inputs.js";

const input = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

// const adapters = new Set(input
//     .split("\n")
//     .map(adapter => +adapter));

// let currentRating = 0;
// const highestRating = Math.max(...adapters);

// let oneJoltDifferences = 0;
// let threeJoltsDifferences = 0;

// while(currentRating !== highestRating) {
//     if(adapters.has(currentRating + 1)) {
//         oneJoltDifferences += 1;
//         currentRating += 1;
    
//     } else if(adapters.has(currentRating + 3)) {
//         threeJoltsDifferences += 1;
//         currentRating += 3;
//     }
// }

// // built-in adapter
// threeJoltsDifferences += 1;

// console.log("Differences of 1 jolt: " + oneJoltDifferences);
// console.log("Differences of 3 jolts: " + threeJoltsDifferences);
// console.log("Part 1: " + oneJoltDifferences * threeJoltsDifferences);

const adapters = new Set(input.split("\n").map(adapter => +adapter));

let possibilities = [0];
let currentRating = 0;
const highestRating = Math.max(...adapters);
while(currentRating !== highestRating) {
    let possibleMoves = [];
    for(let index = 1; index < 4; index += 1) {
        if(adapters.has(currentRating + index)) {
            possibleMoves.push(index);
        }
    }

    let newPossibilities = [];
    for(let m = 0; m < possibilities.length; m += 1) {
        if(possibilities[m] === currentRating) {
            possibilities[m] = currentRating + possibleMoves[0];

            if(possibleMoves.length > 1) {
                for(let i = 1; i < possibleMoves.length; i += 1) {
                    newPossibilities.push(currentRating + possibleMoves[i]);
                }
            }
        }
    }

    newPossibilities.forEach(newPossibility => {
        possibilities.push(newPossibility);
    });

    currentRating += possibleMoves[0];
}

console.log(possibilities.length);