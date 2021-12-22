import { readFileSync } from 'fs';

const getMap = (): Array<Array<number>> => {
    return readFileSync('./inputs/day-11.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n')
        .map((row: string) => {
            return row
                .split('')
                .map((element: string) => Number(element))
        });
}

const flash = ((map: Array<Array<number>>, x: number, y: number, octopusesWhichFlashed: Set<string>): void => {
    for(let i: number = -1; i < 2; i += 1) {
        for(let j: number = -1; j < 2; j += 1) {
            const isCurrentPoint: boolean = i === 0 && j === 0;
            const isOutOfBounds: boolean = y + i > map.length - 1 
                || y + i < 0
                || x + j > map[0].length - 1
                || x + j < 0;

            if(isCurrentPoint || isOutOfBounds) { continue; }
            
            map[y + i][x + j] += 1;

            if(map[y + i][x + j] > 9 && !octopusesWhichFlashed.has(`${y + i},${x + j}`)) {
                map[y + i][x + j] = 0;
                octopusesWhichFlashed.add(`${y + i},${x + j}`);
                flash(map, x + j, y + i, octopusesWhichFlashed);
            }
        }
    }
});

const map: Array<Array<number>> = getMap();

let flashes: number = 0;
const steps: number = 500;

let simultaneousFlashStep: number;

for(let step: number = 0; step < steps; step += 1) {
    let octopusesWhichFlashed: Set<string> = new Set();
    
    for(let y: number = 0; y < map.length; y += 1) {
        for(let x: number = 0; x < map[0].length; x += 1) {
            map[y][x] += 1;
        }
    }

    for(let y: number = 0; y < map.length; y += 1) {
        for(let x: number = 0; x < map[0].length; x += 1) {
            if(map[y][x] > 9) {
                map[y][x] = 0;
                octopusesWhichFlashed.add(`${y},${x}`);
                flash(map, x, y, octopusesWhichFlashed);
            }
        }
    }

    octopusesWhichFlashed.forEach((octopus: String) => {
        const octopusCoordinates: Array<String> = octopus.split(',');
        map[Number(octopusCoordinates[0])][Number(octopusCoordinates[1])] = 0;
    });

    if(octopusesWhichFlashed.size === map.length * map[0].length && simultaneousFlashStep === undefined) {
        simultaneousFlashStep = step + 1;
    }

    flashes += octopusesWhichFlashed.size;
}

console.log();
console.log(flashes);
console.log(simultaneousFlashStep);