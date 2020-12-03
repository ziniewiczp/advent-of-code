function getParameter(mode, which, input, relativeBase, current) {
    switch(mode) {
        case 1:
            return current + which + 1 || 0;

        case 2:
            return relativeBase + input[current + which + 1] || 0;

        default:
            return input[current + which + 1] || 0;
    }
}

let input = [3,8,1005,8,352,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,28,1,1003,20,10,2,106,11,10,2,1107,1,10,1,1001,14,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,1002,8,1,67,2,1009,7,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,101,0,8,92,1,105,9,10,1006,0,89,1,108,9,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1002,8,1,126,1,1101,14,10,1,1005,3,10,1006,0,29,1006,0,91,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,1002,8,1,161,1,1,6,10,1006,0,65,2,106,13,10,1006,0,36,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,198,1,105,15,10,1,1004,0,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,101,0,8,228,2,1006,8,10,2,1001,16,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,257,1006,0,19,2,6,10,10,2,4,13,10,2,1002,4,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1002,8,1,295,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,316,2,101,6,10,1006,0,84,2,1004,13,10,1,1109,3,10,101,1,9,9,1007,9,1046,10,1005,10,15,99,109,674,104,0,104,1,21101,387365315340,0,1,21102,369,1,0,1105,1,473,21101,666685514536,0,1,21102,380,1,0,1106,0,473,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,1,46266346536,1,21102,427,1,0,1105,1,473,21101,235152829659,0,1,21101,438,0,0,1105,1,473,3,10,104,0,104,0,3,10,104,0,104,0,21102,838337188620,1,1,21101,461,0,0,1105,1,473,21102,988753429268,1,1,21102,1,472,0,1106,0,473,99,109,2,22101,0,-1,1,21101,40,0,2,21101,504,0,3,21102,494,1,0,1106,0,537,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,499,500,515,4,0,1001,499,1,499,108,4,499,10,1006,10,531,1101,0,0,499,109,-2,2106,0,0,0,109,4,2101,0,-1,536,1207,-3,0,10,1006,10,554,21102,1,0,-3,21202,-3,1,1,21201,-2,0,2,21102,1,1,3,21101,573,0,0,1105,1,578,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,601,2207,-4,-2,10,1006,10,601,21201,-4,0,-4,1105,1,669,22101,0,-4,1,21201,-3,-1,2,21202,-2,2,3,21101,620,0,0,1106,0,578,22102,1,1,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,639,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,661,22101,0,-1,1,21102,661,1,0,106,0,536,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2106,0,0];

let gridSize = 50;
let grid = new Array();
for(let index = 0; index < gridSize; index += 1) {
    grid.push(new Array(gridSize).fill("."));
}

let x = Math.floor(gridSize/2);
let y = Math.floor(gridSize/2);
grid[x][y] = '#';
let robotDirection = 0;
let paintedPanels = [];

let relativeBase = 0;
let current = 0;
let output = [];
while (input[current] !== 99) {
    if(output.length === 2) {
        grid[y][x] = (output.shift() === 0) ? "." : "#";

        let panelAlreadyPainted = false;
        for(let index = 0; index < paintedPanels.length; index += 1){
            if(paintedPanels[index][0] === y && paintedPanels[index][1] === x) {
                panelAlreadyPainted = true;
            }
        }
        if(!panelAlreadyPainted) {
            paintedPanels.push([y, x]);
        }
            
        robotDirection = (output.shift() === 0) ? robotDirection - 90 : robotDirection + 90;
            
        if(robotDirection === 360) { robotDirection = 0; }
        if(robotDirection < 0) { robotDirection = 360 + robotDirection; }

        switch(robotDirection) {
            case 0:
                y -= 1;
                break;

            case 90:
                x += 1;
                break;

            case 180:
                y += 1;
                break;

            case 270:
                x -= 1;
                break;
        }
    }

    let opcode = input[current];
    let paramModes = [];

    if(opcode > 9) {
        let instruction = opcode;
        opcode = instruction % 100;
        instruction = Math.floor(instruction / 100);

        while(instruction > 0) {
            paramModes.push(instruction % 10);
            instruction = Math.floor(instruction / 10);
        }
    }

    let a = getParameter(paramModes[0], 0, input, relativeBase, current) || 0;
    let b = getParameter(paramModes[1], 1, input, relativeBase, current) || 0;
    let c = getParameter(paramModes[2], 2, input, relativeBase, current) || 0; 

    switch(opcode) {
        case 1:
            input[c] = input[a] + input[b];
            current += 4;
            break;

        case 2:
            input[c] = input[a] * input[b];
            current += 4;
            break;

        case 3:
            input[a] = (grid[y][x] === ".") ? 0 : 1;
            current += 2;
            break;

        case 4:
            //console.log(input[a]);
            output.push(input[a]);
            current += 2;
            break;

        case 5:
            current = (input[a] !== 0) ? input[b] : current + 3;
            break;

        case 6:
            current = (input[a] === 0) ? input[b] : current + 3;
            break;

        case 7:
            input[c] = (input[a] < input[b]) ? 1 : 0;
            current += 4;
            break;

        case 8:
            input[c] = (input[a] === input[b]) ? 1 : 0;
            current += 4;
            break;

        case 9:
            relativeBase += input[a];
            current += 2;
            break;
    }
}

console.log(paintedPanels.length);
grid.forEach(row => {
    console.log(row.join(""));
});