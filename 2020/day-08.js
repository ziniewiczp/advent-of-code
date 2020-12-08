import { inputs } from "./inputs.js";

const getState = () => {
    return {
        index: 0,
        accumulator: 0,
        visitedIndexes: new Set()
    }
}
const executeInstruction = (instruction, state) => {
    switch(instruction.type) {
        case "nop":
            state.index += 1;
            break;

        case "acc":
            state.accumulator += instruction.sign * instruction.argument;
            state.index += 1;
            break;

        case "jmp":
            state.index += instruction.sign * instruction.argument;
            break;
    }

    return state;
}

const part1 = (instructions) => {
    let state = getState();

    while(!state.visitedIndexes.has(state.index)) {
        state.visitedIndexes.add(state.index);

        state = executeInstruction(instructions[state.index], state);
    }

    return state.accumulator;
}

const toggleInstruction = (instruction) => {
    instruction.type = (instruction.type === "nop")
        ? "jmp"
        : "nop";
}

const part2 = (instructions) => {
    let state = getState();

    let nopsAndJmps = [];
    for(let i = 0; i < instructions.length; i += 1) {
        if(instructions[i].type !== "acc") {
            nopsAndJmps.push(i);
        }
    }

    let nopsAndJmpsIndex = 0;
    toggleInstruction(instructions[nopsAndJmps[nopsAndJmpsIndex]]);

    while(state.index < instructions.length) {
        state.visitedIndexes.add(state.index);

        state = executeInstruction(instructions[state.index], state);

        if(state.visitedIndexes.has(state.index)) {
            state = getState();

            toggleInstruction(instructions[nopsAndJmps[nopsAndJmpsIndex]]);
            
            nopsAndJmpsIndex += 1;
            toggleInstruction(instructions[nopsAndJmps[nopsAndJmpsIndex]]);
        }
    }

    return state.accumulator;
}

const instructions = inputs["day-08"]
    .split("\n")
    .map(row => {
        const splitRow = row.split(" ");

        return {
            type: splitRow[0],
            sign: (splitRow[1].substring(0,1) === "+") ? 1 : -1,
            argument: splitRow[1].substring(1)            
        };
    });

console.log("Part 1: " + part1(instructions));
console.log("Part 2: " + part2(instructions));