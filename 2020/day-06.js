import { inputs } from "./inputs.js";

const part1 = (groups) => {
    return groups
        .map(group => new Set(group.join("").split("")).size)
        .reduce((acc, current) => acc += current, 0);
}

const part2 = (groups) => {
    return groups.map(group => {
        let concatenatedGroup = group.join("");
        let groupQuestions = new Set();
    
        concatenatedGroup.split("").forEach(question => {
            let regex = new RegExp(question, "g");
            let groupOccurrences = concatenatedGroup.match(regex || []).length;

            if(groupOccurrences === group.length) {
                groupQuestions.add(question);
            }
        });
    
        return groupQuestions.size;
    
    }).reduce((acc, current) => acc += current, 0);
}

const groups = inputs["day-06"]
    .split("\n\n")
    .map(group => group.split("\n"));

console.log("Part 1: " + part1(groups));
console.log("Part 2: " + part2(groups));