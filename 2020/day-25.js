const input = `2959251
4542595`;

const getLoopSize = (publicKey) => {
    let value = 1;
    let loopSize = 0;
    while(value !== publicKey) {
        loopSize += 1;
        value = (value * 7) % 20201227;
    }

    return loopSize;
}

const getEncryptionKey = (publicKey, loopSize) => {
    let encryptionKey = 1;
    for(let i = 0; i < loopSize; i += 1) {
        encryptionKey = (encryptionKey * publicKey) % 20201227;
    }

    return encryptionKey;
}

const [cardPublicKey, doorPublicKey] = input.split("\n");

let cardLoopSize = getLoopSize(Number(cardPublicKey));
let doorLoopSize = getLoopSize(Number(doorPublicKey));

console.log(cardLoopSize);
console.log(doorLoopSize);

console.log(getEncryptionKey(Number(cardPublicKey), doorLoopSize));
console.log(getEncryptionKey(Number(doorPublicKey), cardLoopSize));