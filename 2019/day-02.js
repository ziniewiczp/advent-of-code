const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,6,19,23,1,13,23,27,1,6,27,31,1,31,10,35,1,35,6,39,1,39,13,43,2,10,43,47,1,47,6,51,2,6,51,55,1,5,55,59,2,13,59,63,2,63,9,67,1,5,67,71,2,13,71,75,1,75,5,79,1,10,79,83,2,6,83,87,2,13,87,91,1,9,91,95,1,9,95,99,2,99,9,103,1,5,103,107,2,9,107,111,1,5,111,115,1,115,2,119,1,9,119,0,99,2,0,14,0];

function solve(input, noun, verb) {
    input[1] = noun;
    input[2] = verb;

    let current = 0;
    while(input[current] !== 99) {
        let a = input[input[current + 1]];
        let b = input[input[current + 2]];
        input[input[current + 3]] = (input[current] === 1) ? a+b : a*b;
        current += 4;
    }

    return input[0];
}

function findParameters() {
    for(let noun = 0; noun < 100; noun += 1) {
        for(let verb = 0; verb < 100; verb += 1) {
            if(solve([...input], noun, verb) === 19690720) {
                return {"noun": noun, "verb": verb};
            }
        }
    }

    return {};
}

const result = findParameters();
console.log(`noun: ${result.noun}; verb: ${result.verb}; result: ${100 * result.noun + result.verb}`);