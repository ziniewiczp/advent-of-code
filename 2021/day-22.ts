import { readFileSync } from 'fs';

type Cuboid = {
    isOff: boolean;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    z1: number;
    z2: number;
}

const getInstructions = (): Array<string> => {
    return readFileSync('./inputs/day-22.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n');
}

const instructions: Array<string> = getInstructions();

const turnedOn: Array<Cuboid> = new Array();

let totalVolume: number = 0;

for(let i: number = 0; i < instructions.length; i += 1) {
    const indicator: string = instructions[i].split(' ')[0];
    const ranges: string = instructions[i]
        .split(' ')[1]
        .replaceAll('x=', '')
        .replaceAll('y=', '')
        .replaceAll('z=', '');

    const [xRange, yRange, zRange]: Array<string> = ranges.split(',');
    let [x1, x2]: Array<number> = xRange.split('..').map(element => Number(element));
    let [y1, y2]: Array<number> = yRange.split('..').map(element => Number(element));
    let [z1, z2]: Array<number> = zRange.split('..').map(element => Number(element));
    
    let volume: number = (indicator === 'on')
        ? (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1) * (Math.abs(z2 - z1) + 1)
        : 0;

    const turnedOff: Set<string> = new Set();

    for(let j: number = 0; j < turnedOn.length; j += 1) {
        const cuboid: Cuboid = turnedOn[j];

        const xOverlapIndicator: boolean = (x1 >= cuboid.x1 && x1 <= cuboid.x2) || (x2 >= cuboid.x1 && x2 <= cuboid.x2);
        const yOverlapIndicator: boolean = (y1 >= cuboid.y1 && y1 <= cuboid.y2) || (y2 >= cuboid.y1 && x2 <= cuboid.y2);
        const zOverlapIndicator: boolean = (z1 >= cuboid.z1 && z1 <= cuboid.z2) || (z2 >= cuboid.z1 && x2 <= cuboid.z2);
        
        if(xOverlapIndicator && yOverlapIndicator && zOverlapIndicator) {
            let x1Overlap: number = x1;
            let x2Overlap: number = x2;
            let y1Overlap: number = y1;
            let y2Overlap: number = y2;
            let z1Overlap: number = z1;
            let z2Overlap: number = z2;

            if(x1 < cuboid.x1) { x1Overlap = cuboid.x1; }
            if(x2 > cuboid.x2) { x2Overlap = cuboid.x2; }
            if(y1 < cuboid.y1) { y1Overlap = cuboid.y1; }
            if(y2 > cuboid.y2) { y2Overlap = cuboid.y2; }
            if(z1 < cuboid.z1) { z1Overlap = cuboid.z1; }
            if(z2 > cuboid.z2) { z2Overlap = cuboid.z2; }

            const overlapVolume: number = (Math.abs(x2Overlap - x1Overlap) + 1)
                * (Math.abs(y2Overlap - y1Overlap) + 1)
                * (Math.abs(z2Overlap - z1Overlap) + 1);
            
            volume = (!cuboid.isOff && indicator === 'on') 
                ? volume - overlapVolume
                : volume + overlapVolume;
        }
    }

    totalVolume = (indicator === 'on') 
        ? totalVolume + volume
        : totalVolume - volume;

    turnedOn.push({
        isOff: indicator === 'off',
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2,
        z1: z1,
        z2: z2
    });

    turnedOn.forEach((cuboid: Cuboid) => {
        console.log(JSON.stringify(cuboid));
    });

    // let turnedOnCount: number = 0;

    // turnedOn.forEach((cuboid: Cuboid) => {
    //     for(let x: number = cuboid.x1; x <= cuboid.x2; x += 1) {
    //         for(let y: number = cuboid.y1; y <= cuboid.y2; y += 1) {
    //             for(let z: number = cuboid.z1; z <= cuboid.z2; z += 1) {
    //                 turnedOnCount += 1;
    //             }
    //         }
    //     }
    // });

    console.log(`Step ${i + 1}: ${totalVolume}`);
    console.log();
}