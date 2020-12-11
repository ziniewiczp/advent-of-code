import { inputs } from "./inputs.js";

const checkDirectlyAdjacent = (state, y, x) => {
    let occupied = 0;

    for(let i = -1; i < 2; i += 1) {
        for(let j = -1; j < 2; j += 1) {
            let isCurrentSeat = (i === 0 && j === 0);
            let isOutOfBounds = (y + i < 0 || y + i > state.length - 1 || x + j < 0 || x + j > state[0].length - 1);

            if(isCurrentSeat || isOutOfBounds) { continue; }
            
            if(state[y + i][x + j] === "#") { occupied += 1; }
        }
    }

    return occupied;
}

const checkAdjacentInSight = (state, y, x) => {
    let occupied = 0;
    let directions = [[-1, -1], [-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
    
    directions.forEach(direction => {
        let i = y + direction[0];
        let j = x + direction[1];

        while(i >= 0 && i < state.length && j >= 0 && j < state[0].length) {
            if(state[i][j] != ".") {
                if(state[i][j] === "#") {
                    occupied += 1;
                }

                break;
            }

            i += direction[0];
            j += direction[1];
        }
    });

    return occupied;
}

const solve = (state, part) => {
    let changes;
    
    do {
        changes = 0;
        let newState = state.map(function(arr) {
            return arr.slice();
        });
    
        for(let y = 0; y < state.length; y += 1) {
            for(let x = 0; x < state[0].length; x += 1) {
                if(state[y][x] === ".") { continue; }
        
                let occupied = (part === 1)
                    ? checkDirectlyAdjacent(state, y, x)
                    : checkAdjacentInSight(state, y, x);

                if(occupied === 0 && state[y][x] === "L") {
                    newState[y][x] = "#";
                    changes += 1;
                }

                let threshold = (part === 1) ? 3 : 4;
                if(occupied > threshold && state[y][x] === "#") {
                    newState[y][x] = "L";
                    changes += 1;
                }
            }
        }
    
        state = newState;
    
    } while(changes > 0);

    return state;
}

const countOccupied = (state) => {
    return state.reduce((occupiedInTotal, row) => {
        return occupiedInTotal += row.reduce((occupiedInRow, seat) => {
            return occupiedInRow += (seat === "#") ? 1 : 0;
        }, 0);
    }, 0);
}

let state = inputs["day-11"]
    .split("\n")
    .map(row => row.split(""));

console.log("Part 1: " + countOccupied(solve(state, 1)));
console.log("Part 2: " + countOccupied(solve(state, 2)));