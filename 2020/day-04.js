import { inputs } from "./inputs.js";

let passports = inputs["day-04"].split("\n\n");

passports = passports.map(passport => {
    let temp = new Map();

    passport = passport
        .replace(/\n/g, " ")
        .split(" ")
        .forEach(entry => {
            entry = entry.split(":");
            temp.set(entry[0], entry[1]);
        });
    
    return temp;
});

const requiredFields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid"
];

let counter = 0;

passports.forEach(passport => {
    let isValid = true;

    requiredFields.forEach(field => {
        if(!passport.has(field)) {
            isValid = false;
        
        } else {
            let value = passport.get(field);

            if(field === "byr") {
                if(value.length !== 4 || value < 1920 || value > 2002) {
                    isValid = false;
                }
            }

            if(field === "iyr") {
                if(value.length !== 4 || value < 2010 || value > 2020) {
                    isValid = false;
                }
            }

            if(field === "eyr") {
                if(value.length !== 4 || value < 2020 || value > 2030) {
                    isValid = false;
                }
            }

            if(field === "hgt") {
                if(/^\d+cm$/.test(value)) {
                    if(value.replace(/cm/, "") < 150 || value.replace(/cm/, "") > 193) {
                        isValid = false;
                    }
                
                } else if(/^\d+in$/.test(value)) {
                    if(value.replace(/in/, "") < 59 || value.replace(/in/, "") > 76) {
                        isValid = false;
                    }
                
                } else {
                    isValid = false;
                }
            }

            if(field === "hcl") {
                if(!/^#[0-9a-f]{6}$/.test(value)) {
                    isValid = false;
                }
            }

            if(field === "ecl") {
                let possibleOptions = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
                if(!possibleOptions.includes(value)) {
                    isValid = false;
                }
            }

            if(field === "pid") {
                if(!/^[0-9]{9}$/.test(value)) {
                    isValid = false;
                }
            }
        }
    });

    counter += (isValid) ? 1 : 0;
});

console.log(counter);