import { readFileSync } from 'fs';

const getInitialPositions = (): Array<number> => {
    return readFileSync('./inputs/day-07.txt', 'utf8')
        .replaceAll('\r', '')
        .replaceAll('\n', '')
        .split(',')
        .map((entry: string) => Number(entry));
}

const getRequiredFuel = (start: number, end: number, mode: string): number => {
    if(mode === 'part 1') {
        return Math.abs(end - start);
    
    } else {
        let requiredFuel = 0;
        let index = 1;

        while(start !== end) {
            requiredFuel += index;
            start += 1;
            index += 1;
        }

        return requiredFuel;
    }
}

const initialPositions: Array<number> = getInitialPositions().sort((a, b) => a-b);
const beginning = initialPositions[0];
const end = initialPositions[initialPositions.length - 1];

const positionsWithRequiredFuel: Map<number, number> = new Map();

for(let i: number = beginning; i <= end; i += 1) {
    if(!positionsWithRequiredFuel.has(i)) {
        let requiredFuel = 0;

        initialPositions.forEach((number: number) => {
            if(i !== number) {
                requiredFuel += (i > number)
                    ? getRequiredFuel(number, i, 'part 2')
                    : getRequiredFuel(i, number, 'part 2');
            }
        });

        positionsWithRequiredFuel.set(i, requiredFuel);
    }
}

let numberWithLeastRequiredFuel: [number, number] = [Number.MAX_VALUE, Number.MAX_VALUE];

positionsWithRequiredFuel.forEach((requiredFuel: number, number: number) => {
    if(requiredFuel < numberWithLeastRequiredFuel[1]) {
        numberWithLeastRequiredFuel = [number, requiredFuel];
    }
});

console.log(numberWithLeastRequiredFuel);