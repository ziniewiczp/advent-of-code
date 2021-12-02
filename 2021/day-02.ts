import { readFileSync } from 'fs';

const getInstructions = (): Array<[string, number]> => {
    return readFileSync('./inputs/day-02.txt', 'utf8')
        .split('\n')
        .map(row => {
            let splitRow: Array<string> = row.split(' ');
            return [splitRow[0], Number(splitRow[1])];
        });
}

const part1 = (instructions: Array<[string, number]>): number => {
    let horizontal: number = 0;
    let depth: number = 0;

    for(let i: number = 0; i < instructions.length; i += 1) {
        if(instructions[i][0] === 'forward') {
            horizontal += instructions[i][1];
        
        } else {
            let direction: number = (instructions[i][0] === 'down') ? 1 : -1;
            depth += direction * instructions[i][1];
        }
    }

    return horizontal * depth;
}

const part2 = (instructions: Array<[string, number]>): number => {
    let horizontal: number = 0;
    let depth: number = 0;
    let aim: number = 0;

    for(let i: number = 0; i < instructions.length; i += 1) {
        if(instructions[i][0] === 'forward') {
            horizontal += instructions[i][1];
            depth += aim * instructions[i][1];
        
        } else {
            let direction: number = (instructions[i][0] === 'down') ? 1 : -1;
            aim += direction * instructions[i][1];
        }
    }

    return horizontal * depth;
}

const instructions: Array<[string, number]> = getInstructions();

console.log(`Answer for part 1: ${part1(instructions)}`);
console.log(`Answer for part 2: ${part2(instructions)}`);