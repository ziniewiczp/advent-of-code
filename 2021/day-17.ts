import { readFileSync } from 'fs';

type TargetArea = {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

const getTargetArea = (): TargetArea => {
    const trimmedData: Array<string> = readFileSync('./inputs/day-17.txt', 'utf8')
        .replaceAll('\r', '')
        .replaceAll('target area: ', '')
        .replaceAll('x=', '')
        .replaceAll(' y=', '')
        .split(',');

    return {
        x1: Number(trimmedData[0].split('..')[0]),
        x2: Number(trimmedData[0].split('..')[1]),
        y1: Number(trimmedData[1].split('..')[0]),
        y2: Number(trimmedData[1].split('..')[1]),
    };
}

const targetArea: TargetArea = getTargetArea();

let maxY = 0;
let bestPair: string = '0,0';
const goodPairs: Set<string> = new Set();

let boundaries: number = 500;

for(let xVelocityInitial: number = boundaries * (-1); xVelocityInitial < boundaries; xVelocityInitial += 1) {
    for(let yVelocityInitial: number = boundaries * (-1); yVelocityInitial < boundaries; yVelocityInitial += 1) {
        let x: number = 0;
        let y: number = 0;

        let xVelocity: number = xVelocityInitial;
        let yVelocity: number = yVelocityInitial;

        let currentMaxY = 0;
        
        while(y >= targetArea.y1) {
            if(x >= targetArea.x1 && x <= targetArea.x2 && y >= targetArea.y1 && y <= targetArea.y2) {
                goodPairs.add(`${xVelocityInitial},${yVelocityInitial}`);
    
                // console.log(`${x},${y}`);
    
                if(currentMaxY > maxY) {
                    maxY = currentMaxY;
                    bestPair = `${xVelocityInitial},${yVelocityInitial}`;
                }
            
                break;
            }

            x += xVelocity;
            y += yVelocity;
        
            if(y > currentMaxY) { currentMaxY = y; }
        
            if(xVelocity !== 0) {
                xVelocity += (xVelocity > 0) ? -1 : 1;
            }
        
            yVelocity -= 1;
        }

        
    }
}

console.log(goodPairs);
console.log(goodPairs.size);
console.log(maxY);
console.log(bestPair);