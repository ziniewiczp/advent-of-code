import { inputs } from "./inputs.js";

const checkNumber = (x, ranges) => {
    return (x >= ranges[0] && x <= ranges[1]) || (x >= ranges[2] && x <= ranges[3]); 
}

const removePossibilities = (rulesOrder, possibilitiesToRemove) => {
    let newRulesOrder = new Map();
    rulesOrder.forEach((rule, field) => {
        let possibilities = rule;
        
        [...possibilities].forEach(possibility => {
            if(possibilitiesToRemove.includes(possibility)) {
                possibilities = possibilities.filter(element => element !== possibility);
            }
        });

        newRulesOrder.set(field, possibilities);
    });

    return newRulesOrder;
}

const splitInput = inputs["day-16"].split("\n\n");

const rules = new Map();
splitInput[0].split("\n").forEach(row => {
    let splitRow = row.split(": ");
    let field = splitRow[0];
    
    let splitRule = splitRow[1].split(" or ");
    let firstRange = splitRule[0].split("-");
    let secondRange = splitRule[1].split("-");

    let rule = [+firstRange[0], +firstRange[1], +secondRange[0], +secondRange[1]];

    rules.set(field, rule);
});

const nearbyTickets = splitInput[2].split("\n").filter(row => row !== "nearby tickets:").map(row => {
    return row.split(",").map(element => +element);
});

let validNearbyTickets = [];
let invalidNumbers = [];

nearbyTickets.forEach(ticket => {
    let isTicketValid = true;

    ticket.forEach(number => {
        let isValid = false;
        rules.forEach(rule => {
            if(checkNumber(number, rule)) {
                isValid = true;
            }
        });

        if(!isValid) {
            invalidNumbers.push(number);
            isTicketValid = false;
        }
    });

    if(isTicketValid) {
        validNearbyTickets.push(ticket);
    }
});

console.log("Part 1: " + invalidNumbers.reduce((sum, current) => sum += current));

let rulesOrder = new Map();
let allPossibilities = [];
for(let i = 0; i < validNearbyTickets[0].length; i += 1){
    allPossibilities.push(i);
}

rules.forEach((rule, field) => {
    rulesOrder.set(field, allPossibilities);
});

validNearbyTickets.forEach(ticket => {
    ticket.forEach((number, index) => {
        rules.forEach((rule, field) => {
            if(!checkNumber(number, rule)) {
                let possibilities = rulesOrder.get(field);
                
                if(possibilities.includes(index)) {
                    possibilities = possibilities.filter(element => element != index);
                    rulesOrder.set(field, possibilities);
                }
            }
        });
    });
});


let finalRulesOrder = new Map();
while(finalRulesOrder.size < rulesOrder.size) {
    let possibilitiesToRemove = [];
    
    rulesOrder.forEach((rule, field) => {
        if(rule.length === 1) {
            possibilitiesToRemove.push(rule[0]);
            finalRulesOrder.set(field, rule[0]);
        }
    });

    rulesOrder = removePossibilities(rulesOrder, possibilitiesToRemove);
}

let departureIndexes = [];
finalRulesOrder.forEach((index, field) => {
    if(field.substring(0,9) === "departure") {
        departureIndexes.push(index);
    }
});

let myTicket = [191,139,59,79,149,83,67,73,167,181,173,61,53,137,71,163,179,193,107,197];

let result = 1;
departureIndexes.forEach(index => {
    result *= myTicket[index];
});

console.log("Part 2: " + result);