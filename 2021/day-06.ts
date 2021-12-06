import { readFileSync } from 'fs';

const getInitialPopulation = (): Array<number> => {
    return readFileSync('./inputs/day-06.txt', 'utf8')
        .replaceAll('\r', '')
        .replaceAll('\n', '')
        .split(',')
        .map((entry: string) => Number(entry));
}

const initializePopulationMap = (initialPopulation: Array<number>): Map<number, number> => {
    const populationMap: Map<number, number> = new Map();

    initialPopulation.forEach((number: number) => {
        const currentCount = (populationMap.has(number)) ? populationMap.get(number) : 0;
        
        populationMap.set(number, currentCount + 1);
    });

    return populationMap;
}

const simulatePopulation = (initialPopulation: Array<number>, days: number): Map<number,number> => {
    let populationMap: Map<number, number> = initializePopulationMap(initialPopulation);

    for(let day: number = 0; day < days; day += 1) {
        const newPopulationMap: Map<number, number> = new Map();
    
        populationMap.forEach((occurrences: number, number: number) => {
            newPopulationMap.set(number - 1, occurrences);
        });
    
        if(newPopulationMap.has(-1)) {
            const zerosCount = newPopulationMap.get(-1);
            newPopulationMap.delete(-1);
            newPopulationMap.set(6, (newPopulationMap.get(6) || 0) + zerosCount);
            newPopulationMap.set(8, (newPopulationMap.get(8) || 0) + zerosCount);
        }
    
        populationMap = newPopulationMap;
    }

    return populationMap;
}

const getPopulationCount = (populationMap: Map<number, number>): number => {
    let counter: number = 0;
    
    populationMap.forEach((occurrences: number) => {
        counter += occurrences;
    });

    return counter;
}

const initialPopulation: Array<number> = getInitialPopulation();

const populationMapForPart1: Map<number, number> = simulatePopulation(initialPopulation, 80);
console.log(`Answer for part 1: ${getPopulationCount(populationMapForPart1)}`);

const populationMapForPart2: Map<number, number> = simulatePopulation(initialPopulation, 256);
console.log(`Answer for part 2: ${getPopulationCount(populationMapForPart2)}`);