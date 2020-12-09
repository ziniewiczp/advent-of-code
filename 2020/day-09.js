import { inputs } from "./inputs.js";

const checkPreamble = (data, index, preamble) => {    
    for(let i = index - preamble; i < index; i += 1) {
        for(let j = index - preamble; j < index; j += 1) {
            if(i === j) { continue; }
            
            if(data[i] + data[j] === data[index]) {
                return true;
            }
        }
    }

    return false;
}

const part1 = (data) => {
    const preamble = 25;

    let index = preamble;
    while(index < data.length) {
        if(!checkPreamble(data, index, preamble)) {
            return data[index];
        }
        
        index += 1;
    }
}

const part2 = (data, invalidNumber) => {
    let start = 0;
    let end = 0;
    let sum = 0;
    let range = [];

    while(sum !== invalidNumber) {
        end += 1;
        sum += data[end];
        range.push(data[end]);

        if(sum > invalidNumber) {
            start += 1;
            sum = data[start];
            end = start;
            range = [data[start]];
        }
    }

    return Math.min(...range) + Math.max(...range);
}

const data = inputs["day-09"]
    .split("\n")
    .map(element => +element);

const invalidNumber = part1(data)
console.log("Part 1: " + invalidNumber);
console.log("Part 2: " + part2(data, invalidNumber));