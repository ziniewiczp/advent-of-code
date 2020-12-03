class Asteroid {
    constructor(coordinates) {
        this.coordinates = coordinates;
        this.detected = [];
    }

    isVisible(otherAsteroid) {
        if(otherAsteroid === this || this.detected.includes(otherAsteroid)) { return false; }
        
        let [x, y] = [...this.coordinates];
        let [otherX, otherY] = [...otherAsteroid.coordinates];

        for(let detectedAsteroid of this.detected) {
            let [detectedX, detectedY] = [...detectedAsteroid.coordinates];
            if(Math.atan2(y - otherY, x - otherX) === Math.atan2(y - detectedY, x - detectedX)) {
                const thisToOtherDist = Math.sqrt(Math.pow(x - otherX, 2) + Math.pow(y - otherY, 2));
                const thisToDetectedDist = Math.sqrt(Math.pow(x - detectedX, 2) + Math.pow(y - detectedY, 2));
                if(thisToOtherDist > thisToDetectedDist) {
                    return false;
                }
            }
        }

        return true;
    }

    scan(radius, map) {
        let [x, y] = this.coordinates;
        let currentPosition;
        for(let i = -radius; i <= radius; i++) {
            if(map[y + i] && map[y + i][x  - radius]) {
                currentPosition = map[y + i][x  - radius];
                if(currentPosition && currentPosition instanceof Asteroid && this.isVisible(currentPosition)) {
                    this.detected.push(currentPosition);
                }
            }

            if((map[y + i] && map[y + i][x  + radius])) {
                currentPosition = map[y + i][x  + radius];
                if(currentPosition && currentPosition instanceof Asteroid && this.isVisible(currentPosition)) {
                    this.detected.push(currentPosition);
                }
            }

            if(map[y - radius] && map[y - radius][x + i]) {
                currentPosition = map[y - radius][x + i];
                if(currentPosition && currentPosition instanceof Asteroid && this.isVisible(currentPosition)) {
                    this.detected.push(currentPosition);
                }
            }

            if(map[y + radius] && map[y + radius][x + i]) {
                currentPosition = map[y + radius][x + i];
                if(currentPosition && currentPosition instanceof Asteroid && this.isVisible(currentPosition)) {
                    this.detected.push(currentPosition);
                }
            }
        }
    }
}

const input = 
`.#..#..#..#...#..#...###....##.#....
.#.........#.#....#...........####.#
#..##.##.#....#...#.#....#..........
......###..#.#...............#.....#
......#......#....#..##....##.......
....................#..............#
..#....##...#.....#..#..........#..#
..#.#.....#..#..#..#.#....#.###.##.#
.........##.#..#.......#.........#..
.##..#..##....#.#...#.#.####.....#..
.##....#.#....#.......#......##....#
..#...#.#...##......#####..#......#.
##..#...#.....#...###..#..........#.
......##..#.##..#.....#.......##..#.
#..##..#..#.....#.#.####........#.#.
#......#..........###...#..#....##..
.......#...#....#.##.#..##......#...
.............##.......#.#.#..#...##.
..#..##...#...............#..#......
##....#...#.#....#..#.....##..##....
.#...##...........#..#..............
.............#....###...#.##....#.#.
#..#.#..#...#....#.....#............
....#.###....##....##...............
....#..........#..#..#.......#.#....
#..#....##.....#............#..#....
...##.............#...#.....#..###..
...#.......#........###.##..#..##.##
.#.##.#...##..#.#........#.....#....
#......#....#......#....###.#.....#.
......#.##......#...#.#.##.##...#...
..#...#.#........#....#...........#.
......#.##..#..#.....#......##..#...
..##.........#......#..##.#.#.......
.#....#..#....###..#....##..........
..............#....##...#.####...##.`;

let rows = input.split("\n");
let map = new Array();
for(let index = 0; index < rows.length; index += 1) {
    map.push(rows[index].split(""));
}

const asteroids = [];
for(let y = 0; y < map.length; y += 1) {
    for(let x = 0; x < map[y].length; x += 1) {
        if(map[y][x] === "#") {
            const newAsteroid = new Asteroid([x, y]);
            asteroids.push(newAsteroid);
            map[y][x] = newAsteroid;
        }
    }
}

for(let asteroid of asteroids) {
    for(let radius = 1; radius <= map.length; radius += 1) {
        asteroid.scan(radius, map);
    }
}

let max = 0;
let best;
asteroids.forEach(asteroid => {
    if(asteroid.detected.length > max) {
        max = asteroid.detected.length;
        best = asteroid.coordinates;
    }
});

console.log(`${best} : ${max}`);