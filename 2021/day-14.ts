import { readFileSync } from 'fs';

const getPolymerTemplate = (): string => {
    return readFileSync('./inputs/day-14.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n\n')[0];
}

const getRules = (): Map<string, string> => {
    const rulesArray: Array<string> = readFileSync('./inputs/day-14.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n\n')[1]
        .split('\n');

    const rulesMap: Map<string, string> = new Map();

    rulesArray.forEach((row: string) => {
        const splitRow = row.split(' -> ');
        rulesMap.set(splitRow[0], splitRow[1]);
    });

    return rulesMap;
}

const performInsertionStep = ((polymer: string, rules: Map<string, string>): string => {
    let newPolymer: string = polymer.charAt(0);

    for(let i: number = 0; i < polymer.length - 1; i += 1) {
        newPolymer += rules.get(`${polymer.charAt(i)}${polymer.charAt(i+1)}`)
            + polymer.charAt(i+1); 
    }

    return newPolymer;
});

const getOccurrences = ((polymer: string): Map<string, number> => {
    let splitPolymer = polymer.split('');
    const occurrences: Map<string, number> = new Map();
    splitPolymer.forEach((character: string) => {
        const currentCharacterOccurrences = occurrences.get(character) || 0;
        occurrences.set(character, currentCharacterOccurrences + 1); 
    });

    return new Map([...occurrences.entries()].sort((a, b) => a[1] - b[1]));
})

let polymer = getPolymerTemplate();
const rules = getRules();

for(let i: number = 0; i < 40; i += 1) {
    polymer = performInsertionStep(polymer, rules);
}

const occurrences: Map<string, number> = getOccurrences(polymer);

console.log(Array.from(occurrences)[occurrences.size - 1][1] - Array.from(occurrences)[0][1]);
