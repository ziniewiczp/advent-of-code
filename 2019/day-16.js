const buildPattern = (base, index) => {
    let result = [];
    for(let i = 0; i < base.length; i += 1) {
        for(let j = 0; j < index + 1; j += 1) {
            result.push(base[i]);
        }
    }

    return result;
}

const calculatePhase = (signal, basePattern) => {
    let tempSignal = [];
    for(let i = 0; i < signal.length; i += 1) {
        let current = 0;
        let patternIndex = 1;
        let pattern = buildPattern(basePattern, i);

        for(let j = 0; j < signal.length; j += 1) {
            if(patternIndex === pattern.length) { patternIndex = 0; } 
            current += signal[j] * pattern[patternIndex];
            patternIndex += 1;
        }
        tempSignal.push(Math.abs(current % 10));
    }

    return tempSignal;
}

//let input = "59791911701697178620772166487621926539855976237879300869872931303532122404711706813176657053802481833015214226705058704017099411284046473395211022546662450403964137283487707691563442026697656820695854453826690487611172860358286255850668069507687936410599520475680695180527327076479119764897119494161366645257480353063266653306023935874821274026377407051958316291995144593624792755553923648392169597897222058613725620920233283869036501950753970029182181770358827133737490530431859833065926816798051237510954742209939957376506364926219879150524606056996572743773912030397695613203835011524677640044237824961662635530619875905369208905866913334027160178";
let input = "03036732577212944063491565474664";
let signal = [];

for(let i = 0; i < 10000; i += 1) {
    signal.push(input.split(""));
}

console.log("Initialized input...");

const offset = +input.slice(0, 7);

const basePattern = [0, 1, 0, -1];

for(let i = 0; i < 100; i += 1) {
    signal = calculatePhase(signal, basePattern);
    console.log(`Finalized calculating phase ${i + 1}`);
}

console.log(signal.splice(offset, 8));