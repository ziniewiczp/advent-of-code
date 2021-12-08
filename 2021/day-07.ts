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

const smartPart1 = (initialPositions: Array<number>): number => {
    const length = initialPositions.length;

    const median = (length % 2 === 0)
        ? Math.floor((initialPositions[length / 2] + initialPositions[(length / 2) + 1]) / 2)
        : initialPositions[(length + 1) / 2];

    return initialPositions.reduce((requiredFuel: number, currentPosition: number) => {
        return requiredFuel += Math.abs(median - currentPosition);
    }, 0);
}

const smartPart2 = (initialPositions: Array<number>): number => {
    const length = initialPositions.length;0

    const mean = Math.floor(initialPositions.reduce((sum: number, currentPosition: number) => sum += currentPosition, 0) / length);

    const possibleAnswers: Array<number> = new Array();
    for(let i: number = -1; i < 2; i += 1) {
        possibleAnswers.push(
            initialPositions.reduce((requiredFuel: number, currentPosition: number) => {
                return requiredFuel += (((mean + i) - currentPosition)*(mean-currentPosition) + Math.abs(mean - currentPosition)) / 2;
            }, 0)
        )
    }

    console.log(possibleAnswers);

    return possibleAnswers.sort((a, b) => a - b)[0];
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

console.log(smartPart1(initialPositions));
console.log(smartPart2(initialPositions));