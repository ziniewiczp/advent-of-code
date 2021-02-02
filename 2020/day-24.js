import { inputs } from "./inputs.js";

const input = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;

const getBlackNeighbours = (blackTiles, x, y, z) => {
    let blackNeighbours = 0;
    
    let tilesToCheck = [
        [x,     y+1,    z-1],
        [x,     y-1,    z+1],
        [x+1,   y,      z-1],
        [x+1,   y-1,    z],
        [x-1,   y+1,    z],
        [x-1,   y,      z+1]
    ];
    
    for(let i = 0; i < tilesToCheck.length; i += 1) {
        let coordinates = `x=${tilesToCheck[i][0]};y=${tilesToCheck[i][1]};z=${tilesToCheck[i][2]}`;
        if(blackTiles.has(coordinates)) {
            blackNeighbours += 1;
        }
    }

    return blackNeighbours;
}

// strings in form x=0;y=0;z=0
let blackTiles = new Set();
let highestCoordinate = 0;

const instructions = inputs["day-24"].split("\n");
for(let i = 0; i < instructions.length; i += 1) {
    let instruction = instructions[i].split("");

    let x = 0;
    let y = 0;
    let z = 0;

    let j = 0;
    while(j < instruction.length) {
        let current = instruction[j];
        if(current === "n" || current === "s") {
            current += instruction[j + 1]
            j += 1;
        }

        switch(current) {
            case "w":
                y += 1;
                z -= 1;
                break;

            case "e":
                y -= 1;
                z += 1;
                break;

            case "nw":
                x += 1;
                z -= 1;
                break;

            case "ne":
                x += 1;
                y -= 1;
                break;

            case "sw":
                x -= 1;
                y += 1;
                break;

            case "se":
                x -= 1;
                z += 1;
                break;
        }

        j += 1;
    }

    if(x > highestCoordinate) { highestCoordinate = x; }
    if(y > highestCoordinate) { highestCoordinate = y; }
    if(z > highestCoordinate) { highestCoordinate = z; }

    let coordinates = `x=${x};y=${y};z=${z}`;
    if(blackTiles.has(coordinates)) {
        blackTiles.delete(coordinates);
    
    } else {
        blackTiles.add(coordinates);
    }
}

console.log("Day 0: " + blackTiles.size);

for(let day = 1; day < 101; day += 1) {
    let newBlackTiles = new Set();
    for(let i = -(highestCoordinate + 15); i <= highestCoordinate + 15; i += 1) {
        for(let j = -(highestCoordinate + 15); j <= highestCoordinate + 15; j += 1) {
            for(let k = -(highestCoordinate + 15); k <= highestCoordinate + 15; k += 1) {
                let neighbours = getBlackNeighbours(blackTiles, i, j, k);
                let coordinates = `x=${i};y=${j};z=${k}`;
                if(!blackTiles.has(coordinates) && neighbours === 2) {
                    newBlackTiles.add(coordinates);
                
                    if(i >= highestCoordinate) { highestCoordinate = i + 5; }
                    if(j >= highestCoordinate) { highestCoordinate = j + 5; }
                    if(k >= highestCoordinate) { highestCoordinate = k + 5; }

                } else if(blackTiles.has(coordinates) && neighbours > 0 && neighbours <= 2) {
                    newBlackTiles.add(coordinates);

                    if(i >= highestCoordinate) { highestCoordinate = i + 5; }
                    if(j >= highestCoordinate) { highestCoordinate = j + 5; }
                    if(k >= highestCoordinate) { highestCoordinate = k + 5; }
                }
            }
        }
    }

    blackTiles = newBlackTiles;

    console.log("Day " + day + ": " + blackTiles.size);
}