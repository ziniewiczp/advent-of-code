import { inputs } from "./inputs.js";

const part1 = (adapters) => {    
    const highestRating = Math.max(...adapters);
    let currentRating = 0;
    let oneJoltDifferences = 0;
    let threeJoltsDifferences = 0;
    
    while(currentRating !== highestRating) {
        if(adapters.has(currentRating + 1)) {
            oneJoltDifferences += 1;
            currentRating += 1;
        
        } else if(adapters.has(currentRating + 3)) {
            threeJoltsDifferences += 1;
            currentRating += 3;
        }
    }
    
    // built-in adapter
    threeJoltsDifferences += 1;

    return oneJoltDifferences * threeJoltsDifferences;
}

const part2 = (adapters) => {
    const highestRating = Math.max(...adapters);
    let currentRating = 0;

    // map of the latest value of rating mapped to the number 
    // of different possible paths that led to this rating.
    let state = new Map([[0, 1]]);
    
    while(currentRating !== highestRating) {
        let possibleMoves = [];
        for(let i = 1; i < 4; i += 1) {
            if(adapters.has(currentRating + i)) {
                possibleMoves.push(i);
            }
        }

        let currentRatingState = state.get(currentRating);
        state.delete(currentRating);
        
        for(let i = 0; i < possibleMoves.length; i += 1) {
            let nextRatingState = (state.has(currentRating + possibleMoves[i]))
                ? state.get(currentRating + possibleMoves[i])
                : 0;

            state.set(currentRating + possibleMoves[i], currentRatingState + nextRatingState);
        }

        currentRating += possibleMoves[0];
    }

    return state.get(highestRating);
}

const adapters = new Set(inputs["day-10"].split("\n").map(adapter => +adapter));

console.log("Part 1: " + part1(adapters));
console.log("Part 2: " + part2(adapters));
