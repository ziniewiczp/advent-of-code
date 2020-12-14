import { inputs } from "./inputs.js";

const part1 = (instructions) => {
    const mem = [];
    let mask = "";

    instructions.forEach(instruction => {
        let splitInstruction = instruction.split(" = ");

        if(splitInstruction[0] === "mask") {
            mask = splitInstruction[1];
        
        } else {
            let index = +splitInstruction[0].substring(4).replace(/]/g, "");
            
            let value = +splitInstruction[1];
            let binaryValue = value.toString(2);
            binaryValue = binaryValue.padStart(36, "0").split("");

            mask.split("").forEach((bit, maskIndex) => {
                if(bit !== "X") {
                    binaryValue[maskIndex] = bit;
                }
            });

            mem[index] = parseInt(binaryValue.join(""), 2);
        }
    });

    return mem.reduce((sum, current) => sum += current);
}

const part2 = (instructions) => {
    // using map because maximum size of an array is bound by an unsigned 32-bit integer,
    // and in this part indexes are greater than that because we're using unsigned 36-bit integers.
    const mem = new Map();
    let mask = "";
    
    instructions.forEach(instruction => {
        let splitInstruction = instruction.split(" = ");
    
        if(splitInstruction[0] === "mask") {
            mask = splitInstruction[1];
        
        } else {
            let value = +splitInstruction[1];
    
            let index = +splitInstruction[0].substring(4).replace(/]/g, "");
            let binaryIndex = index.toString(2);
            binaryIndex = binaryIndex.padStart(36, "0").split("");
    
            let floatingBits = [];
            mask.split("").forEach((bit, maskIndex) => {
                if(bit === "1") {
                    binaryIndex[maskIndex] = "1";
    
                } else if(bit === "X") {
                    binaryIndex[maskIndex] = bit;
                    floatingBits.push(maskIndex);
                }
            });
    
            let addresses = [binaryIndex];
            for(let i = 0; i < floatingBits.length; i += 1) {
                let initialAddressesLength = addresses.length;
    
                for(let j = 0; j < initialAddressesLength; j += 1) {
                    let currentAddress = [...addresses[j]];
                    currentAddress[floatingBits[i]] = "0";
                    addresses.push(currentAddress);
    
                    currentAddress = [...addresses[j]];
                    currentAddress[floatingBits[i]] = "1";
                    addresses.push(currentAddress);
                }
            }

            let numberOfCombinations = 2 ** floatingBits.length;
            addresses
                .slice(numberOfCombinations * (-1))
                .forEach(address => {
                    mem.set(parseInt(address.join(""), 2), value);
                });
        }
    });
    
    let sum = 0;
    mem.forEach(value => sum += value);
    
    return sum;
}

const instructions = inputs["day-14"].split("\n");

console.log("Part 1: " + part1(instructions));
console.log("Part 2: " + part2(instructions));