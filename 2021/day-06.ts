import { readFileSync } from 'fs';

const getData = (): Array<number> => {
    return readFileSync('./inputs/day-06.txt', 'utf8')
        .replaceAll('\r', '')
        .replaceAll('\n', '')
        .split(',')
        .map((entry: string) => Number(entry));
}

const data: Array<number> = getData();
let fishMap: Map<number, number> = new Map();

data.forEach((number: number) => {
    let currentCount = (fishMap.has(number)) ? fishMap.get(number) : 0;
    
    fishMap.set(number, currentCount + 1);
});

const numberOfDays: number = 256;

for(let day: number = 0; day < numberOfDays; day += 1) {
    let newFishMap: Map<number, number> = new Map();

    fishMap.forEach((occurrences: number, number: number) => {
        newFishMap.set(number - 1, occurrences);
    });

    if(newFishMap.has(-1)) {
        let zerosCount = newFishMap.get(-1);
        newFishMap.delete(-1);
        newFishMap.set(6, (newFishMap.get(6) || 0) + zerosCount);
        newFishMap.set(8, (newFishMap.get(8) || 0) + zerosCount);
    }

    fishMap = newFishMap;
}

let counter: number = 0;

fishMap.forEach((occurrences: number) => {
    counter += occurrences;
});

console.log(counter);

