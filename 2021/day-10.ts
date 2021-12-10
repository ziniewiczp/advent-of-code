import { readFileSync } from 'fs';

const getSubsystem = (): Array<string> => {
    return readFileSync('./inputs/day-10.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n');
}

const calculateScores = ((subsystem: Array<string>): void => {
    const bracketsMapping: Map<string, string> = new Map([
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
        ['<', '>']]);
    
    const corruptionScoreMapping: Map<string, number> = new Map([
        [')', 3],
        [']', 57],
        ['}', 1197],
        ['>', 25137,]]);
    
    const completionScoreMapping: Map<string, number> = new Map([
        [')', 1],
        [']', 2],
        ['}', 3],
        ['>', 4,]]);
    
    let syntaxErrorScore = 0;
    const lineCompletionScores: Array<number> = new Array();
    
    for(let i: number = 0; i < subsystem.length; i += 1) {
        const line = subsystem[i].split('');
        let isLineCorrupted: boolean = false;
    
        let openedBrackets: Array<string> = new Array();
    
        for(let j: number = 0; j < line.length; j += 1) {
            if(bracketsMapping.has(line[j])) {
                openedBrackets.push(line[j]);
            
            } else {
                const currentOpenBracket = openedBrackets.pop();
                if(bracketsMapping.get(currentOpenBracket) !== line[j]) {
                    syntaxErrorScore += corruptionScoreMapping.get(line[j]);
                    isLineCorrupted = true;
                    break;
                }
            }
        }
    
        if(!isLineCorrupted) {
            let totalScore = 0;
    
            while(openedBrackets.length > 0) {
                const currentOpenBracket = openedBrackets.pop();
                const matchingClosingBracket = bracketsMapping.get(currentOpenBracket);
                line.push(matchingClosingBracket);
    
                totalScore *= 5;
                totalScore += completionScoreMapping.get(matchingClosingBracket);
            }
    
            lineCompletionScores.push(totalScore);
        }
    }
    
    console.log(`Answer for part 1: ${syntaxErrorScore}`);
    
    lineCompletionScores.sort((a,b) => a-b);
    const n: number = lineCompletionScores.length;
    const middleScore = lineCompletionScores[Math.floor(n / 2)];
    
    console.log(`Answer for part 2: ${middleScore}`);
});

const subsystem: Array<string> = getSubsystem();
calculateScores(subsystem);