import { readFileSync } from 'fs';

const getData = (): Array<string> => {
    return readFileSync('./inputs/day-05.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n');
}

const placeVents = (data: Array<string>, skipDiagonal: boolean): Map<string, number> => {
    const vents: Map<string, number> = new Map();

    for(let i: number = 0; i < data.length; i += 1) {
        const row: string = data[i];

        const splitRow: Array<string> = row.split(' -> ');
        const beginning: Array<string> = splitRow[0].split(',');
        const end: Array<string> = splitRow[1].split(',');

        const isDiagonal = beginning[0] !== end[0] && beginning[1] !== end[1];

        if(isDiagonal) {
            if(skipDiagonal) { continue; }

            let xDirection = (Number(beginning[0]) < Number(end[0])) ? 1 : -1;
            let yDirection = (Number(beginning[1]) < Number(end[1])) ? 1 : -1;
            let currentPoint = `${beginning[0]},${beginning[1]}`;
            let finalPoint = `${end[0]},${end[1]}`;

            while(currentPoint !== finalPoint) {
                currentPoint = `${beginning[0]},${beginning[1]}`;
                let currentPointOccurrences = vents.get(currentPoint) || 0;
                vents.set(currentPoint, currentPointOccurrences + 1);

                beginning[0] = (Number(beginning[0]) + xDirection).toString();
                beginning[1] = (Number(beginning[1]) + yDirection).toString();
            }

            // currentPoint = `${beginning[0]},${beginning[1]}`;
            // let currentPointOccurrences = vents.get(currentPoint) || 0;
            // vents.set(currentPoint, currentPointOccurrences + 1);

        } else {
            const isHorizontal: boolean = beginning[1] === end[1];
            const changingCoordinate: number = (isHorizontal) ? 0 : 1;

            const current = (Number(beginning[changingCoordinate]) < Number(end[changingCoordinate]))
                ? beginning
                : end;

            while(beginning[changingCoordinate] !== end[changingCoordinate]) {
                let currentPoint = `${current[0]},${current[1]}`;
                let currentPointOccurrences = vents.get(currentPoint) || 0;
                vents.set(currentPoint, currentPointOccurrences + 1);

                current[changingCoordinate] = (Number(current[changingCoordinate]) + 1).toString();
            }

            let currentPoint = `${current[0]},${current[1]}`;
            let currentPointOccurrences = vents.get(currentPoint) || 0;
            vents.set(currentPoint, currentPointOccurrences + 1);
        }
    }

    return vents;
}

const getOverlappingPoints = (vents: Map<string, number>): number => {
    let overlappingPoints = 0;

    vents.forEach(point => {
        if(point > 1) {
            overlappingPoints += 1;
        }
    });

    return overlappingPoints;
}

const data: Array<string> = getData();
const ventsWithoutDiagonals: Map<string, number> = placeVents(data, true);
const overlappingPointsWithoutDiagonals: number = getOverlappingPoints(ventsWithoutDiagonals);
console.log(`Answer for part 1: ${overlappingPointsWithoutDiagonals}`);

const ventsWithDiagonals: Map<string, number> = placeVents(data, false);
const overlappingPointsWithDiagonals: number = getOverlappingPoints(ventsWithDiagonals);
console.log(`Answer for part 2: ${overlappingPointsWithDiagonals}`);