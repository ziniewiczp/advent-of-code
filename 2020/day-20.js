const input = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;

import { inputs } from "./inputs.js";

// rotates array 90 degrees clockwise
// const rotate = (original) => {
//     const length = original.length;

//     const rotated = new Array(length);
//     for(let i = 0; i < length; i += 1) {
//         rotated[i] = new Array(length);
//     }

//     for(let y = 0; y < length; y += 1) {
//         for(let x = 0; x < length; x += 1) {
//             let currentValue = original[y][x];
    
//             rotated[x][(length - 1) - y] = currentValue;
//         }
//     }

//     return rotated;
// }

const tiles = new Map();

const splitInput = input.split("\n\n");
splitInput.forEach(tile => {
    let splitTile = tile.split("\n");
    let key = splitTile[0].match(/\d+/)[0];

    let tileObject = {
        id: key,
        image: new Array(splitInput[1].length),
        edges: new Set(),
        matchingEdges: new Set()
    };

    let left = "";
    let right = "";

    for(let i = 1; i < splitTile.length; i += 1){
        let splitRow = splitTile[i].split("");

        tileObject.image.push(splitRow);

        left += splitRow[0];
        right += splitRow[splitRow.length - 1];
    }

    tileObject.edges.add(left);
    tileObject.edges.add(right);
    tileObject.edges.add(splitTile[1]);
    tileObject.edges.add(splitTile[splitTile.length - 1]);

    tiles.set(key, tileObject);
});

let result = 1;
tiles.forEach(outerTile => {
    tiles.forEach(innerTile => {
        if(outerTile.id !== innerTile.id) {
            outerTile.edges.forEach(outerEdge => {
                if(innerTile.edges.has(outerEdge) || innerTile.edges.has(outerEdge.split("").reverse().join(""))) {
                    outerTile.matchingEdges.add(innerTile.id);
                };
            });
        }
    });

    if(outerTile.matchingEdges.size === 2) { 
        result *= outerTile.id; 
    }

    console.log(`${outerTile.id}:`);
    console.log(outerTile.matchingEdges);
    console.log();
});

console.log("Part 1: " + result);