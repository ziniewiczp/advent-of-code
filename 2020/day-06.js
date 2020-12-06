import { inputs } from "./inputs.js";

const part1 = (groups) => {
    const counter = groups.map(group => {
        let groupQuestions = new Set();

        group.forEach(person => {
            person.split("").forEach(question => {
                groupQuestions.add(question);
            });
        });

        return groupQuestions.size;
    });

    return counter.reduce((acc, current) => acc += current, 0);
}

const part2 = (groups) => {
    const counter = groups.map(group => {
        let concatenatedGroup = group.join("");
        let groupQuestions = new Set();
    
        group.forEach(person => {
            person.split("").forEach(question => {
                let regex = new RegExp(question, "g");
                let groupOccurrences = concatenatedGroup.match(regex || []).length;
    
                if(groupOccurrences === group.length) {
                    groupQuestions.add(question);
                }
            });
        });
    
        return groupQuestions.size;
    });
    
    return counter.reduce((acc, current) => acc += current, 0);
}

const groups = inputs["day-06"]
    .split("\n\n")
    .map(group => group.split("\n"));

console.log("Part 1: " + part1(groups));
console.log("Part 2: " + part2(groups));