const playCups = (input, cupsCount, moves) => {
    const inputMax = Math.max(...input);
    const min = 1;
    const max = cupsCount;
    const cups = {};
    
    cups[input[0]] = { value: Number(input[0]) };
    let firstCup = cups[input[0]];
    let previousCup = firstCup;
    
    for(let i = 1; i < cupsCount; i += 1) {
        let currentValue = (i < inputMax)
            ? Number(input[i])
            : i + 1;
    
        cups[currentValue] = { value: currentValue };
        previousCup.next = cups[currentValue];
        previousCup = cups[currentValue];
    }
    
    previousCup.next = firstCup;
    
    let current = firstCup;
    
    for(let i = 0; i < moves; i += 1) {
        let firstToPick = current.next;
        let secondToPick = firstToPick.next;
        let thirdToPick = secondToPick.next;
        current.next = thirdToPick.next;
    
        let pickedUp = new Set([firstToPick.value, secondToPick.value, thirdToPick.value]);
        let destination = current.value;
        do {
            destination = (destination === min)
                ? max
                : destination - 1;
        
        } while(pickedUp.has(cups[destination].value));
    
        let destinationsNext = cups[destination].next;
        cups[destination].next = firstToPick;
        thirdToPick.next = destinationsNext;
    
        current = current.next;
    }

    return cups;
}

const input = `167248359`.split("");

const part1 = playCups(input, 9, 100);
let part1Result = "";
let current = part1[1].next;
while(current !== part1[1]) {
    part1Result += current.value;
    current = current.next;
}
console.log("Part 1: " + part1Result);

const part2 = playCups(input, 1000000, 10000000);
console.log("Part 2: "
    + part2[1].next.value
    + " * "
    + part2[1].next.next.value
    + " = "
    + part2[1].next.value * part2[1].next.next.value);

