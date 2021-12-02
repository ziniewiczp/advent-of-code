import { readFileSync } from 'fs';

const getMeasurements = (): Array<number> => {
    return readFileSync('./inputs/day-01.txt', 'utf8')
        .split('\n')
        .map(row => Number(row));
}

const part1 = (measurements: Array<number>): number => {
    let counter: number = 0;

    for (let i: number = 1; i < measurements.length; i += 1) {
        if (measurements[i - 1] < measurements[i]) {
            counter += 1;
        }
    }

    return counter;
}

const part2 = (measurements: Array<number>): number => {
    let counter: number = 0;

    for (let i: number = 0; i < measurements.length - 3; i += 1) {
        const firstWindow = measurements[i] + measurements[i + 1] + measurements[i + 2];
        const secondWindow = measurements[i + 1] + measurements[i + 2] + measurements[i + 3];

        if (firstWindow < secondWindow) {
            counter += 1;
        }
    }

    return counter;
}

const measurements: Array<number> = getMeasurements();

console.log(`Answer for part 1: ${part1(measurements)}`);
console.log(`Answer for part 2: ${part2(measurements)}`);