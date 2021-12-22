import { readFileSync } from 'fs';

const getNumbers = (): Array<string> => {
    return readFileSync('./inputs/day-18.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n');
}

// Method used to put the whole numbers into array to make
// switching them later on easier (no need to build 2-digit numbers).
const splitNumber = ((number: string): Array<string> => {
    const result: Array<string> = new Array();

    let currentNumber: string = '';
    number.split('').forEach((character: string) => {
        if(isNaN(Number(character))) {
            if(currentNumber.length > 0) {
                result.push(currentNumber);
                currentNumber = '';
            }

            result.push(character);
        
        } else {
            currentNumber += character;
        }
    });

    return result;
});

const explode = ((number: Array<string>, start: number): Array<string> => {
    const leftmost: number = Number(number[start + 1]);
    const rightmost: number = Number(number[start + 3]);

    for(let i: number = start; i > 0; i -= 1) {        
        const currentNumber: number = Number(number[i]); 

        // found an actual pair
        if(!isNaN(currentNumber)) {
            number[i] = (Number(number[i]) + leftmost).toString();
            break;
        }
    }

    for(let i: number = start + 4; i < number.length; i += 1) {     
        const currentNumber: number = Number(number[i]); 

        // found an actual pair
        if(!isNaN(currentNumber)) {
            number[i] = (currentNumber + rightmost).toString();
            break;
        }
    }

    number.splice(start, 5, '0');

    return number;
});

const split = ((number: Array<string>, start: number): Array<string> => {
    const left = Math.floor(Number(number[start]) / 2);
    const right = Math.ceil(Number(number[start]) / 2);

    number.splice(start, 1, '[', left.toString(), ',', right.toString(), ']');

    return number;
});

const reduce = ((number: Array<string>): Array<string> => {
    let isValid = false;

    while(!isValid) {
        let openedBrackets: number = 0;
        let processedCharacters: number = 0;

        for(let j: number = 0; j < number.length; j += 1) {
            processedCharacters = j;

            if(number[j] === '[') {
                openedBrackets += 1;
            
            } else if(number[j] === ']') {
                openedBrackets -= 1;
            
            }

            if(openedBrackets === 5) {
                number = explode(number, j);
                break;
            }
        }

        if(processedCharacters === number.length - 1) {

            for(let j: number = 0; j < number.length; j += 1) {
                processedCharacters = j;

                if(number[j] === '[') {
                    openedBrackets += 1;
                
                } else if(number[j] === ']') {
                    openedBrackets -= 1;
                
                }

                if(Number(number[j]) >= 10) {
                    number = split(number, j);
                    break;
                }
            }

            isValid = processedCharacters === number.length - 1;
        }
    }

    return number;
});

const getMagnitude = ((number: Array<string>): number => {
    while(number.length > 1) {
        let pairFound: boolean = false;
        let i: number = 0;

        while(!pairFound) {
            pairFound = number[i] === '['
                && !isNaN(Number(number[i + 1]))
                && number[i + 2] === ','
                && !isNaN(Number(number[i + 3]))
                && number[i + 4] === ']';

            i += (pairFound) ? 0 : 1;
        }

        const resultingNumber: number = 3 * Number(number[i + 1]) + 2 * Number(number[i + 3]);
        number.splice(i, 5, resultingNumber.toString());
    }

    return Number(number[0]);
});

const numbers: Array<string> = getNumbers();

let currentNumber: string = numbers[0];

for(let i: number = 1; i < numbers.length; i += 1) {
    // "add" two numbers
    currentNumber = `[${currentNumber},${numbers[i]}]`;

    // format array for easier reducing by grouping multiple digit numbers into one number
    const splitCurrentNumber: Array<string> = splitNumber(currentNumber);

    // reduce resulting number to the valid format
    currentNumber = reduce(splitCurrentNumber).join('');
}

const finalNumber = splitNumber(currentNumber);
console.log(`Answer for part 1: ${getMagnitude(finalNumber)}`);

let maxMagnitude = 0;

for(let i: number = 0; i < numbers.length; i += 1) {
    for(let j: number = 0; j < numbers.length; j += 1) {
        if(i === j) { continue; }

        // "add" two numbers
        const currentNumber = `[${numbers[i]},${numbers[j]}]`;

        // format array for easier reducing by grouping multiple digit numbers into one number
        const splitCurrentNumber: Array<string> = splitNumber(currentNumber);

        // reduce resulting number to the valid format
        const reducedNumber: Array<string> = reduce(splitCurrentNumber);

        // calculate magnitude of the resulting number
        const magnitude = getMagnitude(reducedNumber);

        if(magnitude > maxMagnitude) {
            maxMagnitude = magnitude;
        }
    }
}

console.log(`Answer for part 2: ${maxMagnitude}`);