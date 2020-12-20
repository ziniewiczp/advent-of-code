import { inputs } from "./inputs.js";

const calculate = (expression) => {
    let regex;
    let matches;

    while(expression.match(/\(|\+|\*|\)/)) {
        regex = /\((\d+)((\*|\+)(\d+))+\)/;
        while(expression.match(regex)) {
            matches = expression.match(regex);
            if(matches) {
                expression = expression.replace(regex, calculate(matches[0].replace("(", "").replace(")", "")));
            }
        }

        regex = /(\d+)(\+)(\d+)/;
        while(expression.match(regex)) {
            matches = expression.match(regex);
            if(matches) {
                expression = expression.replace(regex, Number(matches[1]) + Number(matches[3]));
            }
        }

        regex = /(\d+)(\*)(\d+)/;
        while(expression.match(regex)) {
            matches = expression.match(regex);
            if(matches) {
                expression = expression.replace(regex, Number(matches[1]) * Number(matches[3]));
            }
        }
    }

    return expression;
}

let sum = 0;

inputs["day-18"].split("\n").forEach(expression => {
    sum += Number(calculate(expression.replaceAll(" ", "")));
});

console.log(sum);