import { readFileSync } from 'fs';

const getPolymerTemplate = (): Array<string> => {
    return readFileSync('./inputs/day-14.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n\n')[0]
        .split('');
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

const getPolymer = ((template: Array<string>, rules: Map<string, string>, steps: number): Map<string, number> => {
    let pairs: Map<string, number> = new Map();
    for(let i: number = 0; i < template.length - 1; i += 1) {
        const currentPair: string = `${template[i]}${template[i+1]}`;
        const currentPairOccurrences: number = pairs.get(currentPair) || 0;
        pairs.set(currentPair, currentPairOccurrences + 1);
    };

    for(let i: number = 0; i < steps; i += 1) {
        let newPairs: Map<string, number> = new Map();
    
        pairs.forEach((pairOccurrences: number, pair: string) => {
            const splitPair: Array<string> = pair.split('');
    
            if(rules.has(pair)) {
                for(let k: number = 0; k < 2; k += 1) {
                    const newPair: string = (k === 0) 
                        ? `${splitPair[k]}${rules.get(pair)}` 
                        : `${rules.get(pair)}${splitPair[k]}`;

                    const newPairOccurrences: number = newPairs.get(newPair) || 0;
                    newPairs.set(newPair, newPairOccurrences + pairOccurrences);
                }
            }
        });
    
        pairs = newPairs;
    }

    return pairs;
});

const getResult = ((pairs: Map<string, number>, polymerTemplate: Array<string>): number => {
    const characterOccurrences: Map<string, number> = new Map();

    pairs.forEach((pairOccurrences: number, pair: string) => {
        const splitPair: Array<string> = pair.split('');
    
        // just the first one, as second one will be always a part of another pair
        const resultingCharacter: string = splitPair[0];
        const resultingCharacterOccurrences = characterOccurrences.get(resultingCharacter) || 0;
        characterOccurrences.set(resultingCharacter, resultingCharacterOccurrences + pairOccurrences);
    });
    
    // additionally the last one as it is the second element of the last pair
    const lastCharacter = polymerTemplate[polymerTemplate.length - 1];
    const lastCharacterOccurrences = characterOccurrences.get(lastCharacter) || 0;
    characterOccurrences.set(lastCharacter, lastCharacterOccurrences + 1);
    
    const sortedCharacterOccurrences: Map<string, number> = new Map(
        [...characterOccurrences.entries()]
        .sort((a, b) => a[1] - b[1]));

    const mostCommonElementCount: number = Array.from(sortedCharacterOccurrences)[sortedCharacterOccurrences.size - 1][1];
    const leastCommonElementCount: number = Array.from(sortedCharacterOccurrences)[0][1];
    
    return mostCommonElementCount - leastCommonElementCount;
})

const polymerTemplate: Array<string> = getPolymerTemplate();
const rules: Map<string, string> = getRules();

let polymer: Map<string, number> = getPolymer(polymerTemplate, rules, 10);
console.log(`Answer for part 1: ${getResult(polymer, polymerTemplate)}`);

polymer = getPolymer(polymerTemplate, rules, 40);
console.log(`Answer for part 2: ${getResult(polymer, polymerTemplate)}`);