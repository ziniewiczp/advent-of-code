import { readFileSync } from 'fs';

const getMap = (): Array<Array<number>> => {
    return readFileSync('./inputs/day-09.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n')
        .map((row: string) => row.split('').map((item: string) => Number(item)));
}

const getBasinSize = (map: Array<Array<number>>, y: number, x: number, visited: Set<string>): number => {   
    let basinSize = 1;

    visited.add(`${y},${x}`);

    // Top adjacent
    if(y > 0) {
        if(map[y - 1][x] < 9 && !visited.has(`${y - 1},${x}`)) { basinSize += getBasinSize(map, y - 1, x, visited); }
    }

    // Bottom adjacent
    if(y < map.length - 1) {
        if(map[y + 1][x] < 9 && !visited.has(`${y + 1},${x}`)) { basinSize += getBasinSize(map, y + 1, x, visited); }
    }

    // Left adjacent
    if(x > 0) {
        if(map[y][x - 1] < 9 && !visited.has(`${y},${x - 1}`)) { basinSize += getBasinSize(map, y, x - 1, visited); }
    }

    // Right adjacent
    if(x < map[0].length - 1) {
        if(map[y][x + 1] < 9 && !visited.has(`${y},${x + 1}`)) { basinSize += getBasinSize(map, y, x + 1, visited); }
    }

    return basinSize;
}

const map: Array<Array<number>> = getMap();

const lowPoints: Array<number> = [];
const basinSizes: Array<number> = [];

for(let i: number = 0; i < map.length; i += 1) {
    for(let j: number = 0; j < map[0].length; j += 1) {
        let isLowPoint = true;

        // Top adjacent
        if(i > 0) {
            if(map[i - 1][j] <= map[i][j]) { isLowPoint = false; }
        }

        // Bottom adjacent
        if(i < map.length - 1) {
            if(map[i + 1][j] <= map[i][j]) { isLowPoint = false; }
        }

        // Left adjacent
        if(j > 0) {
            if(map[i][j - 1] <= map[i][j]) { isLowPoint = false; }
        }

        // Right adjacent
        if(j < map[0].length - 1) {
            if(map[i][j + 1] <= map[i][j]) { isLowPoint = false; }
        }

        if(isLowPoint) { 
            lowPoints.push(map[i][j]); 

            const visited = new Set([`${j},${i}`]);
            basinSizes.push(getBasinSize(map, i, j, visited));
        
        }
    }
}

console.log(lowPoints.reduce((riskLevelsSum: number, riskLevel: number) => {
    return riskLevelsSum += riskLevel + 1;
}, 0));

basinSizes.sort((a, b) => b - a);

console.log(basinSizes);

console.log(basinSizes[0] * basinSizes[1] * basinSizes[2]);