import { inputs } from "./inputs.js";

const getRegex = (rules, index) => {
    let rule = rules.get(index);

    while(rule.match(/\d+/)) {
        let matches = rule.match(/\d+/);
        rule = rule.replace(matches[0], rules.get(Number(matches[0])));
    }

    return rule;
}

const part1 = (rules, messages) => {
    let regex = new RegExp("^" + getRegex(rules, 0).replaceAll(" ", "") + "$");

    return messages.reduce((counter, message) => {
        let matches = message.match(regex);
        return counter += (matches) ? 1 : 0;
    }, 0);
}

const part2 = (rules, messages) => {
    rules.set(8, "42 | 42 8");  // 42+
    rules.set(11, "42 31 | 42 11 31"); // 42{n} 31{n}

    // rule 0: 8 11 => 42+ 42{n} 31{n} => 42{n+1,} 31{n}

    let regex42 = getRegex(rules, 42).replaceAll(" ", "");
    let regex31 = getRegex(rules, 31).replaceAll(" ", "");

    let regex = new RegExp("^(?<group42>(" + regex42 + ")+)" + "(?<group31>(" +  regex31 + ")+)$");

    return messages.reduce((counter, message) => {
        let isValid = false;

        let matches = message.match(regex);
        if(matches) {
            const { groups } = matches;
            let occurrencesOf42 = groups.group42.match(new RegExp(regex42, "g")).length;
            let occurrencesOf31 = groups.group31.match(new RegExp(regex31, "g")).length;

            isValid = (occurrencesOf42 > occurrencesOf31);
        }

        return counter += (isValid) ? 1 : 0;
    }, 0);
}

const splitInput = inputs["day-19"].split("\n\n");
const messages = splitInput[1].split("\n");

const rules = new Map();
splitInput[0].split("\n").forEach(row => {
    let splitRow = row.split(": ");
    
    let parsedRule = splitRow[1].replaceAll("\"", "");
    if(parsedRule.length > 1) {
        parsedRule = "(" + parsedRule + ")";
    }

    rules.set(Number(splitRow[0]), parsedRule);
});

console.log("Part 1: " + part1(rules, messages));
console.log("Part 2: " + part2(rules, messages));