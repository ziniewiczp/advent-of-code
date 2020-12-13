import { inputs } from "./inputs.js";

const part1 = (splitInput) => {
    const departure = +splitInput[0];

    const busSchedule = splitInput[1]
        .split(",")
        .filter(value => value !== "x")
        .map(busId => {
            let nearestDeparture = +busId;
            while(nearestDeparture < departure) {
                nearestDeparture += +busId;
            }

            return { id: +busId, departure: nearestDeparture };
        
        }).sort((a, b) => a.departure - b.departure);

    return (busSchedule[0].departure - departure) * busSchedule[0].id;
}

const part2 = (splitInput) => {
    const busSchedule = [];
    let offset = 0;
    splitInput[1].split(",").forEach(value => {
        if(value === "x") {
            offset += 1;
        
        } else {
            busSchedule.push({ departure: +value, offset: offset });
        }
    });

    let time = busSchedule[0].departure;
    let increment = busSchedule[0].departure;

    for(let order = 1; order < busSchedule.length; order += 1) {
        while((time + busSchedule[order].offset + order) % busSchedule[order].departure !== 0) {
            time += increment;
        }

        increment *= busSchedule[order].departure;
    }

    return time;
}

const splitInput = inputs["day-13"].split("\n");

console.log("Part 1: " + part1(splitInput));
console.log("Part 2: " + part2(splitInput));