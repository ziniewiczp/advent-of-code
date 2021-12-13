import { readFileSync } from 'fs';

const getCoordinates = (): Set<string> => {
    return new Set(readFileSync('./inputs/day-13.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n\n')[0]
        .split('\n'));
}

const getFoldingInstructions = (): Array<string> => {
    return readFileSync('./inputs/day-13.txt', 'utf8')
        .replaceAll('\r', '')
        .replaceAll('fold along ', '')
        .split('\n\n')[1]
        .split('\n');
}

const fold = ((coordinates: Set<string>, instruction: string): Set<string> => {
    const splitInstruction = instruction.split('=');
    const axis: string = splitInstruction[0];
    const foldValue: number = Number(splitInstruction[1]);
    
    const foldedCoordinates: Set<string> = new Set();
    coordinates.forEach((coordinate: string) => {
        const splitCoordinate: Array<string> = coordinate.split(',');
        let x: number = Number(splitCoordinate[0]);
        let y: number = Number(splitCoordinate[1]);

        if(axis === 'x' && x > foldValue) {
            x -= 2 * (Math.abs(x - foldValue));
        
        } else if(axis === 'y' && y > foldValue) {
            y -= 2 * (Math.abs(y - foldValue));
        }

        foldedCoordinates.add(`${x},${y}`);
    });

    return foldedCoordinates;
});

const getPaperSize = ((coordinates: Set<string>): number => {
    let biggestCoordinate = -1;

    coordinates.forEach((coordinate: string) => {
        const splitCoordinate = coordinate.split(',');
        const x: number = Number(splitCoordinate[0]);
        const y: number = Number(splitCoordinate[1]);
        
        if(x > biggestCoordinate) {
            biggestCoordinate = x;
        }

        if(y > biggestCoordinate) {
            biggestCoordinate = y;
        }
    });

    return biggestCoordinate;
});

const printPaper = ((coordinates: Set<string>, size: number): void => {
    const paper: Array<Array<string>> = new Array(size);
    for(let i: number = 0; i < size; i += 1) {
        paper[i] = new Array(size).fill('.');
    }

    coordinates.forEach((coordinate: string) => {
        const splitCoordinate = coordinate.split(',');
        const x: number = Number(splitCoordinate[0]);
        const y: number = Number(splitCoordinate[1]);

        paper[y][x] = '#';
    });

    paper.forEach(row => {
        console.log(row.join(''));
    });
});

let coordinates: Set<string> = getCoordinates();
const foldingInstructions: Array<string> = getFoldingInstructions();

foldingInstructions.forEach((instruction: string) => {
    coordinates = fold(coordinates, instruction);
});

console.log(`Answer for part 1: ${coordinates.size}`);

const paperSize = getPaperSize(coordinates);
printPaper(coordinates, paperSize);