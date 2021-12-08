import { readFileSync } from 'fs';
import { listenerCount } from 'process';

const getData = (): Array<string> => {
    return readFileSync('./inputs/day-08.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n');
}

const data: Array<string> = getData();

let easyDigitsCounter: number = 0;

data.forEach((row: string) => {
    const secondPart: string = row.split(' | ')[1];
    secondPart.split(' ').forEach((combination: string) => {
        if(combination.length === 2 
            ||combination.length === 3 
            || combination.length === 4 
            || combination.length === 7) {
            
            easyDigitsCounter += 1;
        }
    });
});

console.log(`Answer for part 1: ${easyDigitsCounter}`);

let outputValuesSum: number = 0;

data.forEach((row: string) => {
    const splitRow: Array<string> = row.split(' | ');
    const combinationMapping: Map<string, string> = new Map();

    let oneCombination: string;
    let sevenCombination: string;
    let fourCombination: string;

    // Get easy, unique digits, so 1, 4, 7 and 8.
    splitRow[0].split(' ').forEach((combination: string) => {
        if(combination.length === 2) { 
            combinationMapping.set(combination.split('').sort().join(''), '1');
            oneCombination = combination; 
        }

        if(combination.length === 3) { 
            combinationMapping.set(combination.split('').sort().join(''), '7');
            sevenCombination = combination; 
        }
        
        if(combination.length === 4) { 
            combinationMapping.set(combination.split('').sort().join(''), '4');
            fourCombination = combination; 
        }
        
        if(combination.length === 7) { combinationMapping.set(combination.split('').sort().join(''), '8'); }
    });


    /**
     *   0000
     *  1    2
     *  1    2
     *   3333
     *  4    5
     *  4    5
     *   6666
     */

    const segmentsMapping: Map<string, string> = new Map();
    sevenCombination.split('').forEach((letter: string) => {
        if(!oneCombination.includes(letter)) {
            segmentsMapping.set('0', letter);
        }
    });

    // segmentsMapping.set('2 || 5', oneCombination.charAt(0));
    // segmentsMapping.set(oneCombination.charAt(1), '2 || 5');
    
    // fourCombination.split('').forEach((letter: string) => {
    //     if(!oneCombination.includes(letter)) {
    //         segmentsMapping.set(letter, '1 || 3');
    //     }
    // });

    // Get 6-characters-long combinations, so 0, 6 and 9.

    let nineCombination: string;
    let sixCombination: string;

    splitRow[0].split(' ').forEach((combination: string) => {
        if(combination.length === 6) {
            let oneSplit = oneCombination.split('');
            let fourSplit = fourCombination.split('').filter((letter: string) => {
                return !oneCombination.includes(letter);
            });

            if(combination.includes(oneSplit[0]) && !combination.includes(oneSplit[1])) {
                combinationMapping.set(combination.split('').sort().join(''), '6');
                segmentsMapping.set('5', oneSplit[0]);
                segmentsMapping.set('2', oneSplit[1]);
                sixCombination = combination;
            
            } else if(!combination.includes(oneSplit[0]) && combination.includes(oneSplit[1])) {
                combinationMapping.set(combination.split('').sort().join(''), '6');
                segmentsMapping.set('2', oneSplit[0]);
                segmentsMapping.set('5', oneSplit[1]);
                sixCombination = combination;
            
            } else if(combination.includes(fourSplit[0]) && !combination.includes(fourSplit[1])) {
                combinationMapping.set(combination.split('').sort().join(''), '0');
                segmentsMapping.set('1', fourSplit[0]);
                segmentsMapping.set('3', fourSplit[1]);
            
            } else if(!combination.includes(fourSplit[0]) && combination.includes(fourSplit[1])) {
                combinationMapping.set(combination.split('').sort().join(''), '0');
                segmentsMapping.set('3', fourSplit[0]);
                segmentsMapping.set('1', fourSplit[1]);
            
            } else {
                combinationMapping.set(combination.split('').sort().join(''), '9');
                nineCombination = combination;
            }
        }
    });

    let fiveLikeCombination: string = nineCombination
        .replace(segmentsMapping.get('2'), '')
        .split('')
        .sort()
        .join('');

    let threeLikeCombination: string = nineCombination
        .replace(segmentsMapping.get('1'), '')
        .split('')
        .sort()
        .join('');

    let twoLikeCombination: string = sixCombination
        .replace(segmentsMapping.get('1'), segmentsMapping.get('2'))
        .replace(segmentsMapping.get('5'), '')
        .split('')
        .sort()
        .join('');

    // Get 5-characters-long combinations, so 2, 3 and 5.
    splitRow[0].split(' ').forEach((combination: string) => {
        if(combination.length === 5) {
            let sortedCombination: string = combination.split('').sort().join('');

            switch(sortedCombination) {
                case fiveLikeCombination:
                    combinationMapping.set(sortedCombination, '5');
                    break;
                
                case threeLikeCombination:
                    combinationMapping.set(sortedCombination, '3');
                    break;

                case twoLikeCombination:
                    combinationMapping.set(sortedCombination, '2');
                    break;
            }
        }
    });

    console.log(combinationMapping);

    let outputValue: string = '';

    splitRow[1].split(' ').forEach((digit: string) => {
        outputValue += combinationMapping.get(digit.split('').sort().join(''));
    });

    console.log(outputValue);
    console.log();

    outputValuesSum += Number(outputValue);
});

console.log(outputValuesSum);