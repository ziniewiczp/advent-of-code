function hasDouble(password) {
    password = password.toString(10);
    foundDoubles = [];
    rejectedDoubles = [];
    for(let index = 1; index < password.length; index += 1) {
        if(password[index - 1] === password[index]) {
            if(foundDoubles.includes(password[index])) {
                rejectedDoubles.push(password[index]);
            
            } else {
                foundDoubles.push(password[index]);
            } 
        }
    }

    correctDoubles = [];
    foundDoubles.forEach((item, index) => {
        if(!rejectedDoubles.includes(item)) { correctDoubles.push(item); }
    });

    return (correctDoubles.length) > 0 ? true : false;
}

function isIncreasing(password) {
    password = password.toString(10);
    for(let index = 1; index < password.length; index += 1) {
        if(+password[index - 1] > +password[index]) { return false; }
    }

    return true;
}

const start = 206938;
const end = 679128;

const matchingPasswords = new Array();
for(let current = start; current <= end; current += 1) {
    if(hasDouble(current) && isIncreasing(current)) {
        matchingPasswords.push(current);
    }
}

console.log(matchingPasswords);
console.log(matchingPasswords.length);
