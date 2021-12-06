import { readFileSync } from 'fs';

const getVentsCoordinates = (): Array<string> => {
    return readFileSync('./inputs/day-05.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n');
}

const placeVents = (ventsCoordinates: Array<string>, skipDiagonal: boolean): Map<string, number> => {
    const vents: Map<string, number> = new Map();

    for(let i: number = 0; i < ventsCoordinates.length; i += 1) {
        const row: string = ventsCoordinates[i];

        const splitRow: Array<string> = row.split(' -> ');
        const beginning: Array<number> = splitRow[0].split(',').map(coordinate => Number(coordinate));
        const end: Array<number> = splitRow[1].split(',').map(coordinate => Number(coordinate));

        const isDiagonal = beginning[0] !== end[0] && beginning[1] !== end[1];

        if(isDiagonal && skipDiagonal) { continue; }

        const xDirection = (beginning[0] === end[0])
            ? 0
            : (beginning[0] < end[0]) ? 1 : -1;

        const yDirection = (beginning[1] === end[1])
            ? 0
            : (beginning[1] < end[1]) ? 1 : -1;
            
        let currentPoint = `${beginning[0]},${beginning[1]}`;
        const finalPoint = `${end[0]},${end[1]}`;

        while(currentPoint !== finalPoint) {
            currentPoint = `${beginning[0]},${beginning[1]}`;
            let currentPointOccurrences = vents.get(currentPoint) || 0;
            vents.set(currentPoint, currentPointOccurrences + 1);

            beginning[0] = beginning[0] + xDirection;
            beginning[1] = beginning[1] + yDirection;
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

const ventsCoordinates: Array<string> = getVentsCoordinates();

const ventsWithoutDiagonals: Map<string, number> = placeVents(ventsCoordinates, true);
console.log(`Answer for part 1: ${getOverlappingPoints(ventsWithoutDiagonals)}`);

const ventsWithDiagonals: Map<string, number> = placeVents(ventsCoordinates, false);
console.log(`Answer for part 2: ${getOverlappingPoints(ventsWithDiagonals)}`);