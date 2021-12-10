import { readFileSync } from 'fs';

const openingBrackets: Map<string, string> = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
    ['<', '>']]);

const getSubsystem = (): Array<string> => {
    return readFileSync('./inputs/day-10.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n');
}

const removeCorruptedLines = ((corruptedSubsystem: Array<string>): Array<string> => {
    let syntaxErrorScore = 0;
    const subsystem: Array<string> = new Array();

    const closingBrackets: Map<string, number> = new Map([
        [')', 3],
        [']', 57],
        ['}', 1197],
        ['>', 25137,]]);

    const openedBrackets: Array<string> = new Array();

    for(let i: number = 0; i < corruptedSubsystem.length; i += 1) {
        const line = corruptedSubsystem[i].split('');
        let isLineCorrupted = false;
    
        for(let j: number = 0; j < line.length; j += 1) {
            if(openingBrackets.has(line[j])) {
                openedBrackets.push(line[j]);
            
            } else {
                const currentOpenBracket = openedBrackets.pop();
                if(openingBrackets.get(currentOpenBracket) !== line[j]) {
                    syntaxErrorScore += closingBrackets.get(line[j]);
                    isLineCorrupted = true;
                    break;
                }
            }
        }
    
        if(!isLineCorrupted) { subsystem.push(line.join('')); }
    }
    
    console.log(`Answer for part 1: ${syntaxErrorScore}`);

    return subsystem;
});

const corruptedSubsystem: Array<string> = getSubsystem();
const subsystem: Array<string> = removeCorruptedLines(corruptedSubsystem);
const lineScores: Array<number> = new Array();

for(let i: number = 0; i < subsystem.length; i += 1) {
    const line = subsystem[i].split('');

    const closingBrackets: Map<string, number> = new Map([
        [')', 1],
        [']', 2],
        ['}', 3],
        ['>', 4,]]);

    const openedBrackets: Array<string> = new Array();

    for(let j: number = 0; j < line.length; j += 1) {
        if(openingBrackets.has(line[j])) {
            openedBrackets.push(line[j]);
        
        } else {
            openedBrackets.pop();
        }
    }

    let totalScore = 0;

    while(openedBrackets.length > 0) {
        const currentOpenBracket = openedBrackets.pop();
        const matchingClosingBracket = openingBrackets.get(currentOpenBracket);
        line.push(matchingClosingBracket);

        totalScore *= 5;
        totalScore += closingBrackets.get(matchingClosingBracket);
    }

    lineScores.push(totalScore);
}

lineScores.sort((a,b) => a-b);

console.log(lineScores);
const n: number = lineScores.length;
const middleScore = lineScores[Math.floor(n / 2)];

console.log(`Answer for part 2: ${middleScore}`);