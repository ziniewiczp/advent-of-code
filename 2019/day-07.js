class Amplifier {
    constructor(phase, input, current = 0, phasePassed = false, halted = false) {
        this.phase = phase;
        this.input = input;
        this.current = current;
        this.phasePassed = phasePassed;
        this.halted = halted;
    }
}

const permutator = (inputArr) => {
    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
}

let generalInput = [3,8,1001,8,10,8,105,1,0,0,21,42,51,76,93,110,191,272,353,434,99999,3,9,1002,9,2,9,1001,9,3,9,1002,9,3,9,1001,9,2,9,4,9,99,3,9,1002,9,3,9,4,9,99,3,9,1002,9,4,9,101,5,9,9,1002,9,3,9,1001,9,4,9,1002,9,5,9,4,9,99,3,9,1002,9,5,9,101,3,9,9,102,5,9,9,4,9,99,3,9,1002,9,5,9,101,5,9,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,99];
//let generalInput = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];
//let generalInput = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10];

let sequence = [5,6,7,8,9];
let permutations = permutator(sequence);
let results = [];

permutations.forEach(permutation => {
    let amplifiers = [
        new Amplifier(permutation[0], [...generalInput]),
        new Amplifier(permutation[1], [...generalInput]),
        new Amplifier(permutation[2], [...generalInput]),
        new Amplifier(permutation[3], [...generalInput]),
        new Amplifier(permutation[4], [...generalInput])
    ];

    let output = 0;
    let currentAmplifier = 0;
    
    while(!amplifiers[4].halted) {
        let current = amplifiers[currentAmplifier].current;
        let input = amplifiers[currentAmplifier].input;

        while (input[current] !== 99) {
            let opcode = input[current];
            let paramModes = [];
    
            if(opcode > 8) {
                let instruction = opcode;
                opcode = instruction % 100;
                instruction = Math.floor(instruction / 100);
    
                while(instruction > 0) {
                    paramModes.push(instruction % 10);
                    instruction = Math.floor(instruction / 10);
                }
            }
    
            let a = (paramModes[0] === 1) ? input[current + 1] : input[input[current + 1]];
            let b = (paramModes[1] === 1) ? input[current + 2] : input[input[current + 2]];
    
            switch(opcode) {
                case 1:
                    input[input[current + 3]] = a + b;
                    current += 4;
                    break;
    
                case 2:
                    input[input[current + 3]] = a * b;
                    current += 4;
                    break;
    
                case 3:
                    if(!amplifiers[currentAmplifier].phasePassed) {
                        amplifiers[currentAmplifier].phasePassed = true;
                        input[input[current + 1]] = amplifiers[currentAmplifier].phase;
                    
                    } else {
                        input[input[current + 1]] = output;
                    }
                    current += 2;
                    break;
    
                case 4:
                    //console.log(input[input[current + 1]]);
                    output = input[input[current + 1]];
                    
                    amplifiers[currentAmplifier].current = current + 2;
                    amplifiers[currentAmplifier].input = input;
                    currentAmplifier = (currentAmplifier === amplifiers.length - 1) ? 0 : currentAmplifier + 1;
                    current = amplifiers[currentAmplifier].current;
                    input = amplifiers[currentAmplifier].input;
                    
                    //current += 2;
                    break;
    
                case 5:
                    current = (a !== 0) ? b : current + 3;
                    break;
    
                case 6:
                    current = (a === 0) ? b : current + 3;
                    break;
    
                case 7:
                    input[input[current + 3]] = (a < b) ? 1 : 0;
                    current += 4;
                    break;
    
                case 8:
                    input[input[current + 3]] = (a === b) ? 1 : 0;
                    current += 4;
                    break;
            }
        }

        amplifiers[currentAmplifier].halted = true;
        currentAmplifier = (currentAmplifier === amplifiers.length - 1) ? 0 : currentAmplifier + 1;
    }

    results.push(output);
});

console.log(results);

let max = 0;
results.forEach(item => {
    if(item > max) { max = item; }
});

console.log(max);