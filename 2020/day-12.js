// TODO:
// - refactor
// - switch to (x,y) coordinates
// - make trigonometric approach work

import { inputs } from "./inputs.js";

const compass = new Map([
    ["N", 0],
    ["E", 90],
    ["S", 180],
    ["W", 270],
    [0, "N"],
    [90, "E"],
    [180, "S"],
    [270, "W"]
]);

const oppositeDirections = new Map([
    ["N", "S"],
    ["S", "N"],
    ["E", "W"],
    ["W", "E"]
]);

const part1 = (instructions) => {
    let facing = "E";

    const shipPosition = new Map([
        ["N", 0],
        ["S", 0],
        ["E", 0],
        ["W", 0]
    ]);

    instructions.forEach(instruction => {
        switch(instruction.direction) {
            case "F":
            case "N": 
            case "S":
            case "E":
            case "W":
                let direction = (instruction.direction === "F")
                    ? facing
                    : instruction.direction;
                let oppositeDirection = oppositeDirections.get(direction);

                let directionPosition = shipPosition.get(direction);
                let oppositeDirectionPosition = shipPosition.get(oppositeDirection);

                if(oppositeDirectionPosition <= instruction.argument) {
                    directionPosition += instruction.argument - oppositeDirectionPosition;
                    oppositeDirectionPosition = 0;
                
                } else {
                    oppositeDirectionPosition -= instruction.argument - directionPosition;
                }

                shipPosition.set(direction, directionPosition);
                shipPosition.set(oppositeDirection, oppositeDirectionPosition);
                break;

            case "L": 
            case "R":
                let currentFacing = compass.get(facing);
                
                let compassDirection = (instruction.direction === "L") ? -1 : 1;
                let newDirection = currentFacing + (compassDirection * instruction.argument);
                if(newDirection >= 360) {
                    newDirection -= 360;
                }

                if(newDirection < 0) {
                    newDirection += 360;
                }

                facing = compass.get(newDirection);
                break;
        }
    });

    let distance = 0;
    shipPosition.forEach(value => distance += value);
    return distance;
}

const part2 = (instructions) => {
    const shipPosition = new Map([
        ["N", 0],
        ["S", 0],
        ["E", 0],
        ["W", 0]
    ]);
    
    const waypointPosition = new Map([
        ["N", 1],
        ["S", 0],
        ["E", 10],
        ["W", 0]
    ]);

    instructions.forEach(instruction => {
        switch(instruction.direction) {
            case "F":
                waypointPosition.forEach((value, direction) => {
                    let oppositeDirection = oppositeDirections.get(direction);
    
                    let directionPosition = shipPosition.get(direction);
                    let oppositeDirectionPosition = shipPosition.get(oppositeDirection);
    
                    let difference = value * instruction.argument;
                    if(oppositeDirectionPosition <= difference) {
                        directionPosition += difference - oppositeDirectionPosition;
                        oppositeDirectionPosition = 0;
                    
                    } else {
                        oppositeDirectionPosition -= difference - directionPosition;
                    }
    
                    shipPosition.set(direction, directionPosition);
                    shipPosition.set(oppositeDirection, oppositeDirectionPosition);
                });
                break;
            
            case "N":
            case "S":
            case "E":
            case "W":
                let direction = instruction.direction;
                let oppositeDirection = oppositeDirections.get(direction);
    
                let directionPosition = waypointPosition.get(direction);
                let oppositeDirectionPosition = waypointPosition.get(oppositeDirection);
    
                if(oppositeDirectionPosition <= instruction.argument) {
                    directionPosition += instruction.argument - oppositeDirectionPosition;
                    oppositeDirectionPosition = 0;
                
                } else {
                    oppositeDirectionPosition -= instruction.argument - directionPosition;
                }
    
                waypointPosition.set(direction, directionPosition);
                waypointPosition.set(oppositeDirection, oppositeDirectionPosition);
                break;
    
            case "L":
            case "R":
                let x1 = 0;
                let y1 = 0;
    
                waypointPosition.forEach((value, key) => {
                    switch(key) {
                        case "N":
                            y1 += value;
                            break;
                        
                        case "S":
                            y1 -= value;
                            break;
    
                        case "E":
                            x1 += value;
                            break;
    
                        case "W":
                            x1 -= value;
                            break;
                    }
                });
                
                let times = instruction.argument / 90;
                let tmp;
                for(let i = 0; i < times; i += 1) {
                    if(instruction.direction === "L") {
                        tmp = y1;
                        y1 = x1;
                        x1 = tmp * (-1);
                    
                    } else {
                        tmp = y1;
                        y1 = x1 * (-1);
                        x1 = tmp;
                    }
                }
    
                waypointPosition.clear();
                waypointPosition.set("N", (y1 >= 0) ? y1 : 0);
                waypointPosition.set("S", (y1 >= 0) ? 0 : Math.abs(y1));
                waypointPosition.set("E", (x1 >= 0) ? x1 : 0);
                waypointPosition.set("W", (x1 >= 0) ? 0 : Math.abs(x1));
                
                // let x1 = 0;
                // let y1 = 0;
    
                // waypointPosition.forEach((value, key) => {
                //     switch(key) {
                //         case "N":
                //             y1 += value;
                //             break;
                        
                //         case "S":
                //             y1 -= value;
                //             break;
    
                //         case "E":
                //             x1 += value;
                //             break;
    
                //         case "W":
                //             x1 -= value;
                //             break;
                //     }
                // });
    
                // let compassDirection = (instruction.direction === "R") ? -1 : 1;
                // let degrees = instruction.argument * compassDirection;
                // let radians = degrees * 0.0175;
    
                // let x2 = Math.round(x1*Math.cos(radians) - y1*Math.sin(radians));
                // let y2 = Math.round(x1*Math.sin(radians) + y1*Math.cos(radians));
    
                // waypointPosition.clear();
                // waypointPosition.set("N", (y2 >= 0) ? y2 : 0);
                // waypointPosition.set("S", (y2 >= 0) ? 0 : Math.abs(y2));
                // waypointPosition.set("E", (x2 >= 0) ? x2 : 0);
                // waypointPosition.set("W", (x2 >= 0) ? 0 : Math.abs(x2));
        }
    });
    
    let distance = 0;
    shipPosition.forEach(value => distance += value);
    return distance;
}

const instructions = inputs["day-12"].split("\n").map(instruction => {
    return  { 
        direction: instruction.substring(0, 1),
        argument: +instruction.substring(1)
    }; 
});

console.log("Part 1: " + part1(instructions));
console.log("Part 2: " + part2(instructions));