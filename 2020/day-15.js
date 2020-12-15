const solve = (input, lastTurn) => {
    let turn = 1;
    let tracker = new Map();

    for(let i = 0; i < input.length - 1; i += 1) {
        tracker.set(input[i], turn++);
    }

    let lastNumber = input[input.length - 1];
    let lastOccurence;

    while(turn < lastTurn) {
        if(!tracker.has(lastNumber)) {
            tracker.set(lastNumber, turn);
            lastNumber = 0;
            
        } else {
            lastOccurence = tracker.get(lastNumber);
            tracker.set(lastNumber, turn);
            lastNumber = turn - lastOccurence;
        }

        turn += 1;
    }

    return lastNumber;
}

const input = [0,13,1,8,6,15];

console.log("Part 1: " + solve(input, 2020));
console.log("Part 2: " + solve(input, 30000000));