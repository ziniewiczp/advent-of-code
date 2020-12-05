import { inputs } from "./inputs.js";

const report = inputs["day-01"];

for(let i = 0; i < report.length - 2; i += 1) {
    for(let j = 1; j < report.length - 1; j += 1) {
        for(let k = 2; k < report.length; k += 1) {
            if(report[i] + report[j] + report[k] === 2020) {
                console.log(report[i]);
                console.log(report[j]);
                console.log(report[k]);
                console.log(report[i]*report[j]*report[k]);
                return;
            }
        }
    }
}