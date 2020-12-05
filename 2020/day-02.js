import { inputs } from "./inputs.js";

let counter = 0;
const passwords = inputs["day-02"].split("\n");
passwords.forEach(row => {
    if(row.length > 0) {
        let splitRow = row.replace(/\:/g, "").split(" ");
        let letter = splitRow[1];
        let [min, max] = splitRow[0].split("-");
        min = +min;
        max = +max;
        let password = [...splitRow[2]];

        // part 1:
        // let letterCounter = 0;
        // password.forEach(element => {
        //     letterCounter += (element === letter) ? 1 : 0;
        // });

        // counter += (letterCounter >= min && letterCounter <= max) ? 1 : 0;

        // part 2:
        counter += ((password[min - 1] !== password[max - 1] && (password[min - 1] === letter || password[max - 1] === letter))) ? 1 : 0;
    }
});

console.log(counter);
