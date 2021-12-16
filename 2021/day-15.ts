import { readFileSync } from 'fs';

type Node = {
    coordinates: string;
    dist: number;
    prev: Node;
}

const getMap = (): Array<Array<number>> => {
    return readFileSync('./inputs/day-15.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n')
        .map((row: string) => row.split('').map((item: string) => Number(item)));
}

const duplicateRow = ((row: Array<number>): Array<number> => {
    return row.map((element: number) => {
        return (element === 9) ? 1 : element + 1;
    });
});

const duplicateMap = ((map: Array<Array<number>>): Array<Array<number>> => {
    return map.map((row: Array<number>) => duplicateRow(row));
});

const map: Array<Array<number>> = getMap();

const fullMap: Array<Array<number>> = new Array();
let currentMap = map;

for(let j: number = 0; j < 5; j += 1) {
    currentMap.forEach((row: Array<number>) => {
        let finalRow = '';
        let currentRow = row;

        for(let i: number = 0; i < 5; i += 1) {
            finalRow += currentRow.join('');
            currentRow = duplicateRow(currentRow);
        }

        fullMap.push(finalRow.split('').map((element: string) => Number(element)));
    });

    currentMap = duplicateMap(currentMap);
}

const length: number = fullMap.length;
const width: number = fullMap[0].length;

const goalCoordinates: string = `${length - 1},${width - 1}`;

let goal: Node;

const unvisited: Map<string, Node> = new Map();

for(let i: number = 0; i < length; i += 1) {
    for(let j: number = 0; j < width; j += 1) {
        const newNode: Node = {
            coordinates: `${i},${j}`,
            dist: (i === 0 && j === 0) ? 0 : Number.MAX_VALUE,
            prev: null
        }

        unvisited.set(newNode.coordinates, newNode);
    }
}

while(unvisited.size > 0) {
    const sortedUnvisited: Map<string, Node> = new Map(
        [...unvisited.entries()]
        .sort((a, b) => a[1].dist - b[1].dist));

    const currentNode: Node = Array.from(sortedUnvisited)[0][1];
    unvisited.delete(currentNode.coordinates);

    if(currentNode.coordinates === goalCoordinates) { goal = currentNode; }

    let y: number = Number(currentNode.coordinates.split(',')[0]);
    let x: number = Number(currentNode.coordinates.split(',')[1]);

    if(y < length - 1) {
        const neighbourCoordinates: string = `${y + 1},${x}`;
        const neighbour: Node = unvisited.get(neighbourCoordinates);

        if(neighbour?.dist > currentNode.dist + fullMap[y + 1][x]) {
            neighbour.dist = currentNode.dist + fullMap[y + 1][x];
            neighbour.prev = currentNode;
        }
    }

    if(x < width - 1) {
        const neighbourCoordinates: string = `${y},${x + 1}`;
        const neighbour: Node = unvisited.get(neighbourCoordinates);

        if(neighbour?.dist > currentNode.dist + fullMap[y][x + 1]) {
            neighbour.dist = currentNode.dist + fullMap[y][x + 1];
            neighbour.prev = currentNode;
        }
    }
    
    if(y > 0) {
        const neighbourCoordinates: string = `${y - 1},${x}`;
        const neighbour: Node = unvisited.get(neighbourCoordinates);

        if(neighbour?.dist > currentNode.dist + fullMap[y - 1][x]) {
            neighbour.dist = currentNode.dist + fullMap[y - 1][x];
            neighbour.prev = currentNode;
        }
    }

    if(x > 0) {
        const neighbourCoordinates: string = `${y},${x - 1}`;
        const neighbour: Node = unvisited.get(neighbourCoordinates);

        if(neighbour?.dist > currentNode.dist + fullMap[y][x - 1]) {
            neighbour.dist = currentNode.dist + fullMap[y][x - 1];
            neighbour.prev = currentNode;
        }
    }
}

let totalRisk: number = 0;

let current: Node = goal;

while(current.prev != null) {
    let y: number = Number(current.coordinates.split(',')[0]);
    let x: number = Number(current.coordinates.split(',')[1]);

    totalRisk += fullMap[y][x];

    current = current.prev;
}

console.log(totalRisk);