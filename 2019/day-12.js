class Moon {
    constructor(coordinates) {
        this.coordinates = coordinates;
        this.velocity = [0, 0, 0];
    }

    updatePosition(coordinate) {
        this.coordinates[coordinate] += this.velocity[coordinate];
    }
}

function calculateGravity(coordinate, first, second) {
    let difference = first.coordinates[coordinate] - second.coordinates[coordinate];
    if(difference < 0) {
        first.velocity[coordinate] += 1;
        second.velocity[coordinate] -= 1;
    
    } else if(difference > 0) {
        first.velocity[coordinate] -= 1;
        second.velocity[coordinate] += 1;
    }
}

function simulateUniverse(moons, initialState, coordinate) {
    for(let index = 0; index < moons.length - 1; index += 1) {
        for(let comparisonIndex = index + 1; comparisonIndex < moons.length; comparisonIndex += 1) {
            calculateGravity(coordinate, moons[index], moons[comparisonIndex]);
        }
    }

    moons.map(current => current.updatePosition(coordinate));

    let counter = 0;
    for(let index = 0; index < moons.length; index += 1) {
        let coordinateMatches = moons[index].coordinates[coordinate] === initialState[index].coordinates[coordinate];
        let velocitiesMatches = moons[index].velocity[coordinate] === initialState[index].velocity[coordinate];
        if(coordinateMatches && velocitiesMatches) {
            counter += 1;
        }
    }

    return (counter === moons.length) ? false : true;
}

function lcm(a, b) {
    let temp;
    let ab = a * b;

    while(b) {
        temp = b;
        b = a % b;
        a = temp;
    }
    
    return ab / a;
}

const initialState = [
    new Moon([-19, -4, 2]),
    new Moon([-9, 8, -16]),
    new Moon([-4, 5, -11]),
    new Moon([1, 9, -13])
];

const moons = [];
for(let index = 0; index < initialState.length; index += 1) {
    moons.push(new Moon([...initialState[index].coordinates]));
}

const part = 2;

if(part === 1) {
    for(let coordinate = 0; coordinate < 3; coordinate += 1) {
        for(let step = 1; step < 1001; step += 1) {
            simulateUniverse(moons, initialState, coordinate);
        }
    }
    
    let energy = moons.reduce((finalAcc, current) => {
        let potential = current.coordinates.reduce((acc, current) => acc += Math.abs(current), 0);
        let kinetic = current.velocity.reduce((acc, current) => acc += Math.abs(current), 0);
        return finalAcc += potential * kinetic;
    }, 0);
    console.log(`Energy after 1000 steps: ${energy}`);
}

if(part === 2) {
    const periods = [];
    for(let coordinate = 0; coordinate < 3; coordinate += 1) {
        let period = 0;
        while(simulateUniverse(moons, initialState, coordinate)) {
            period += 1;
        }

        periods.push(period + 1);
    }
    let result = lcm(periods[0], periods[1]);
    console.log(lcm(result, periods[2]));
}