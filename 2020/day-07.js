import { inputs } from "./inputs.js";

const containShinyGoldBag = (bags, currentBag) => {
    if(currentBag.has("shiny gold")) {
        return true;
    }

    for(let bag of currentBag.keys()) {
        if(containShinyGoldBag(bags, bags.get(bag))) {
            return true;
        }
    }

    return false;
}

const countBagsInside = (bags, currentBag) => {
    if(currentBag.size === 0) {
        return 0;
    }

    let sum = 0;

    for(let bag of currentBag.keys()) {
        sum += +currentBag.get(bag) + (currentBag.get(bag) * countBagsInside(bags, bags.get(bag)));
    }

    return sum;
}

let bags = new Map();

inputs["day-07"].split("\n").forEach(rule => {
    let splitRule = rule.split(" contain ");
    let key = splitRule[0].replace(/ bags/, "");

    let value = new Map();
    if(splitRule[1] !== "no other bags.") {
        splitRule[1].split(", ").forEach(subRule => {
            let splitSubRule = subRule.split(" ");
            let count = splitSubRule[0];
            let color = splitSubRule[1] + " " + splitSubRule[2];

            value.set(color, count);
        });
    }

    bags.set(key, value);
});

let counter = 0;
bags.forEach(bag => {
    counter += (containShinyGoldBag(bags, bag)) ? 1 : 0;
});

console.log("Part 1: " + counter);
console.log("Part 2: " + countBagsInside(bags, bags.get("shiny gold")));