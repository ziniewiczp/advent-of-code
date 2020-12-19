import { inputs } from "./inputs.js";

const isNeighbour = (a, b) => {
    if(a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w) {
        return false;
    }

    return (Math.abs(b.x - a.x) <= 1 
        && Math.abs(b.y - a.y) <= 1 
        && Math.abs(b.z - a.z) <= 1 
        && Math.abs(b.w - a.w) <= 1);
}

const checkNeighbours = (coordinates, currentPoint) => {
    return coordinates.reduce((activeNeighbours, point) => {
        return activeNeighbours += (point.active && isNeighbour(point, currentPoint))
            ? 1
            : 0
    });
}

let height = inputs["day-17"].split("\n").length;
let middle = Math.floor((height - 1)/2);

let dimensions = 10;

let initialCoordinates = inputs["day-17"].split("\n").map(row => row.split(""));

let coordinates = [];
for(let y = -dimensions; y < dimensions; y += 1) {
    for(let x = -dimensions; x < dimensions; x += 1) {
        for(let z = -dimensions; z < dimensions; z += 1) {
            for(let w = -dimensions; w < dimensions; w += 1) {
                let currentPoint = (x + middle >= 0 && x + middle < height && y + middle >= 0 && y + middle < height)
                    ? initialCoordinates[y + middle][x + middle]
                    : "."

                coordinates.push({ 
                    x: x, 
                    y: y, 
                    z: z,
                    w: w, 
                    active: (currentPoint === "#" && z === 0 && w === 0)
                });
            }
        }
    }
}

console.log("Cycle 0: " + coordinates.filter(point => point.active).length);

for(let cycle = 0; cycle < 6; cycle += 1) {
    let newCoordinates = [];

    coordinates.forEach(point => {
        let neighbours = checkNeighbours(coordinates, point);
        
        let newPoint = {...point};

        if(point.active && !(neighbours === 2 || neighbours === 3)) {
            newPoint.active = false;
        
        } else if(!point.active && neighbours === 3) {
            newPoint.active = true;
        }

        newCoordinates.push(newPoint);
    });

    console.log(`Cycle ${cycle + 1}: ${newCoordinates.filter(point => point.active).length}`);

    coordinates = newCoordinates;
}