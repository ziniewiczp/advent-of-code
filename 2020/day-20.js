import { inputs } from "./inputs.js";

// rotates array 90 degrees clockwise
const rotate = (original) => {
    const length = original.length;

    const rotated = new Array(length);
    for(let i = 0; i < length; i += 1) {
        rotated[i] = new Array(length);
    }

    for(let y = 0; y < length; y += 1) {
        for(let x = 0; x < length; x += 1) {
            let currentValue = original[y][x];
    
            rotated[x][(length - 1) - y] = currentValue;
        }
    }

    return rotated;
}

// flips array along x axis
const flip = (original) => {
    const length = original.length;

    const flipped = new Array(length);
    for(let i = 0; i < length; i += 1) {
        flipped[i] = new Array(length);
    }

    for(let y = 0; y < length; y += 1) {
        for(let x = 0; x < length; x += 1) {
            let currentValue = original[y][x];
    
            flipped[(length - 1) - y][x] = currentValue;
        }
    }

    return flipped;
}

const tiles = new Map();

const splitInput = inputs["day-20"].split("\n\n");
splitInput.forEach(tile => {
    let splitTile = tile.split("\n");
    let key = splitTile[0].match(/\d+/)[0];

    let tileObject = {
        id: key,
        image: new Array(splitTile.length - 1),
        edges: new Set(),
        matchingEdges: new Set()
    };

    let left = "";
    let right = "";

    for(let i = 1; i < splitTile.length; i += 1) {
        let splitRow = splitTile[i].split("");

        tileObject.image[i - 1] = splitRow;

        left += splitRow[0];
        right += splitRow[splitRow.length - 1];
    }

    tileObject.edges.add(left);
    tileObject.edges.add(right);
    tileObject.edges.add(splitTile[1]);
    tileObject.edges.add(splitTile[splitTile.length - 1]);

    tiles.set(key, tileObject);
});

const tilesCount = splitInput.length;
const rowLength = Math.sqrt(tilesCount);
const placedTiles = new Array(rowLength);

let result = 1;
tiles.forEach(outerTile => {
    tiles.forEach(innerTile => {
        if(outerTile.id !== innerTile.id) {
            outerTile.edges.forEach(outerEdge => {
                if(innerTile.edges.has(outerEdge) || innerTile.edges.has(outerEdge.split("").reverse().join(""))) {
                    outerTile.matchingEdges.add({
                        neighbour: innerTile.id,
                        edge: outerEdge
                    });
                };
            });
        }
    });

    if(outerTile.matchingEdges.size === 2) { 
        result *= outerTile.id; 

        if(placedTiles[0] === undefined) {
            placedTiles[0] = new Array(rowLength);
            placedTiles[0][0] = outerTile;
        }
    }
});

console.log("Part 1: " + result);

// place the first tile properly
let isPlaced = false;
while(!isPlaced) {
    let top = placedTiles[0][0].image[0].join("");
    let left = placedTiles[0][0].image.reduce((acc, row) => acc += row[0], "");

    isPlaced = true;
    placedTiles[0][0].matchingEdges.forEach(matchingEdge => {
        if(matchingEdge.edge === top || matchingEdge.edge === left) {
            isPlaced = false;

            placedTiles[0][0].image = rotate(placedTiles[0][0].image);
        }
    });
}

// place remaining tiles
for(let i = 0; i < rowLength; i += 1) {
    for(let j = 0; j < rowLength; j += 1) {
        if(i === 0 && j === 0) { continue; }

        if(placedTiles[i] === undefined) {
            placedTiles[i] = new Array(rowLength);
        }
        
        let previousTile = (j === 0)
            ? placedTiles[i-1][0]
            : placedTiles[i][j-1];

        let previousEdge = (j === 0)
            ? previousTile.image[previousTile.image.length - 1].join("") // bottom
            : previousTile.image.reduce((acc, row) => acc += row[row.length - 1], ""); // right
            
        let neighbourId;
        previousTile.matchingEdges.forEach(matchingEdge => {
            if(matchingEdge.edge === previousEdge || matchingEdge.edge.split("").reverse().join("") === previousEdge) {
                neighbourId = matchingEdge.neighbour;
            }
        });

        let neighbour = tiles.get(neighbourId);
        let currentEdge = (j === 0)
            ? neighbour.image[0].join("") // top
            : neighbour.image.reduce((acc, row) => acc += row[0], ""); // left
        let rotateCounter = 0;
        while(currentEdge !== previousEdge) {
            neighbour.image = rotate(neighbour.image);
            currentEdge = (j === 0)
                ? neighbour.image[0].join("") // top
                : neighbour.image.reduce((acc, row) => acc += row[0], ""); // left
            rotateCounter += 1;

            if(rotateCounter === 4) {
                neighbour.image = flip(neighbour.image);
            }
        }

        placedTiles[i][j] = neighbour;
    }
}

// remove borders from each tile
placedTiles.forEach(row => {
    row.forEach(tile => {
        let imageWithoutBorders = new Array(tile.image.length - 2);
        for(let i = 1; i < tile.image.length - 1; i += 1) {
            imageWithoutBorders[i - 1] = new Array(tile.image.length - 2);

            for(let j = 1; j < tile.image.length - 1; j += 1) {
                imageWithoutBorders[i-1][j-1] = tile.image[i][j];
            }
        }

        tile.image = imageWithoutBorders;
    });
});

// combine tiles into the one final image
let finalImage = new Array(rowLength * placedTiles[0][0].image.length);
for(let i = 0; i < finalImage.length; i += 1) {
    finalImage[i] = new Array(rowLength * placedTiles[0][0].image.length);
}

for(let i = 0; i < placedTiles.length; i += 1) {
    for(let j = 0; j < placedTiles[0].length; j += 1) {
        
        for(let m = 0; m < placedTiles[0][0].image.length; m += 1) {
            for(let n = 0; n < placedTiles[0][0].image.length; n += 1) {
                finalImage[m + (i * placedTiles[0][0].image.length)][n + (j * placedTiles[0][0].image.length)] = placedTiles[i][j].image[m][n];
            }
        }
    }
}

let monsters = 0;
let rotateCounter = 0;

// find monsters in final image
while(monsters === 0) {
    for(let i = 0; i < finalImage.length - 2; i += 1) {
        for(let j = 0; j < finalImage.length - 19; j += 1) {
            if(finalImage[i+1][j] === "#"
                && finalImage[i+2][j+1] === "#"
                && finalImage[i+2][j+4] === "#"
                && finalImage[i+1][j+5] === "#"
                && finalImage[i+1][j+6] === "#"
                && finalImage[i+2][j+7] === "#"
                && finalImage[i+2][j+10] === "#"
                && finalImage[i+1][j+11] === "#"
                && finalImage[i+1][j+12] === "#"
                && finalImage[i+2][j+13] === "#"
                && finalImage[i+2][j+16] === "#"
                && finalImage[i+1][j+17] === "#"
                && finalImage[i][j+18] === "#"
                && finalImage[i+1][j+18] === "#"
                && finalImage[i+1][j+19] === "#") {
    
                monsters += 1;
                finalImage[i+1][j] = "O";
                finalImage[i+2][j+4] = "O";
                finalImage[i+1][j+5] = "O";
                finalImage[i+1][j+6] = "O";
                finalImage[i+2][j+7] = "O";
                finalImage[i+2][j+10] = "O";
                finalImage[i+2][j+1] = "O";
                finalImage[i+1][j+11] = "O";
                finalImage[i+1][j+12] = "O";
                finalImage[i+2][j+13] = "O";
                finalImage[i+2][j+16] = "O";
                finalImage[i+1][j+17] = "O";
                finalImage[i][j+18] = "O";
                finalImage[i+1][j+18] = "O";
                finalImage[i+1][j+19] = "O";
            }
        }
    }

    if(monsters === 0) {
        finalImage = rotate(finalImage);
        rotateCounter += 1;

        if(rotateCounter === 4) {
            finalImage = flip(finalImage);
        }
    }
}

result = 0;
finalImage.forEach(row => {
    console.log(row.join(""));
    row.forEach(tile => {
        if(tile === "#") {
            result += 1;
        }
    });
});

console.log();
console.log(result);