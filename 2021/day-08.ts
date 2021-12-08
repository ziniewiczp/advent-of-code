import { readFileSync } from 'fs';

const getData = (): Array<string> => {
    return readFileSync('./inputs/day-08.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n');
}

const getEasyDigitsCount = ((data: Array<string>): number => {
    const easyDigitLengths: Set<number> = new Set([2, 3, 4, 7]);

    return data.reduce((counter: number, row: string): number => {
        const outputValues: Array<string> = row.split(' | ')[1].split(' ');
        
        return counter += outputValues.reduce((innerCounter: number, signal: string): number => {
            return innerCounter += (easyDigitLengths.has(signal.length)) ? 1 : 0;
        }, 0);
    }, 0);
});

const decode = ((signals: Array<string>): Map<string, string> => {
    const combinationMapping: Map<string, string> = new Map();

    let oneCombination: string;
    let sevenCombination: string;
    let fourCombination: string;

    // Get easy, unique digits, so 1, 4, 7 and 8.
    signals.forEach((combination: string) => {
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

    let nineCombination: string;
    let sixCombination: string;

    // Get 6-characters-long combinations, so 0, 6 and 9.
    signals.forEach((combination: string) => {
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

    const fiveCombination: string = nineCombination
        .replace(segmentsMapping.get('2'), '')
        .split('')
        .sort()
        .join('');

    combinationMapping.set(fiveCombination, '5');

    const threeCombination: string = nineCombination
        .replace(segmentsMapping.get('1'), '')
        .split('')
        .sort()
        .join('');

    combinationMapping.set(threeCombination, '3');

    const twoCombination: string = sixCombination
        .replace(segmentsMapping.get('1'), segmentsMapping.get('2'))
        .replace(segmentsMapping.get('5'), '')
        .split('')
        .sort()
        .join('');

    combinationMapping.set(twoCombination, '2');

    return combinationMapping;
});

const getOutputValuesSum = ((data: Array<string>): number => {
    return data.reduce((sum: number, row: string): number => {
        const splitRow = row.split(' | ');
        const signals: Array<string> = splitRow[0].split(' ');
        const signalsMapping: Map<string, string> = decode(signals);

        const outputValue: Array<string> = splitRow[1].split(' ');
        const decodedOutputValue: string = outputValue.reduce((finalValue: string, signal: string): string => {
            const formattedSignal: string = signal.split('').sort().join('');
            return finalValue += signalsMapping.get(formattedSignal);
        }, '');
    
        return sum += Number(decodedOutputValue);
    }, 0);
});

const data: Array<string> = getData();

console.log(`Answer for part 1: ${getEasyDigitsCount(data)}`);
console.log(`Answer for part 2: ${getOutputValuesSum(data)}`);