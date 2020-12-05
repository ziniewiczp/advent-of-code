import { inputs } from "./inputs.js";

const getSeatId = (code) => {
    const row = code.substring(0,7).replace(/B/g, "1").replace(/F/g, "0");
    const column = code.substring(7).replace(/R/g, "1").replace(/L/g, "0");

    return parseInt(row,2) * 8 + parseInt(column,2);
}

const seatIds = inputs["day-05"]
    .split("\n")
    .map(boardingPass => getSeatId(boardingPass))
    .sort((a,b) => a-b);

console.log(`Highest seat ID: ${seatIds[seatIds.length - 1]}`);

const missingSeats = [];
for(let i = seatIds[0]; i < seatIds[seatIds.length - 1]; i += 1) {
    if(!seatIds.includes(i) && seatIds.includes(i+1) && seatIds.includes(i-1)) {
        missingSeats.push(i);
    }
}

console.log(`My seat ID: ${missingSeats}`);