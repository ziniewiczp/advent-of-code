import { readFileSync } from 'fs';

const getReport = (): Array<string> => {
    return readFileSync('./inputs/day-03.txt', 'utf8')
        .split('\n');
}

const part1 = (report: Array<string>): number => {
    const rowLength: number = report[0].length - 1;
    let gammaRate: string = '';
    let epsilonRate: string = '';

    for(let i: number = 0; i < rowLength; i += 1) {
        let zeroes: number = 0;
        let ones: number = 0;

        for(let j: number = 0; j < report.length; j += 1) {
            if(report[j].charAt(i) === '1') {
                ones += 1;
            
            } else {
                zeroes += 1;
            }
        }

        gammaRate += (ones > zeroes) ? '1' : '0';
        epsilonRate += (ones > zeroes) ? '0' : '1';
    }

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

const checkColumn = (report: Array<string>, columnNumber: number, mode: string): Array<string> => {
    const rowsWithZeroes: Array<string> = [];
    const rowsWithOnes: Array<string> = [];

    for(let i: number = 0; i < report.length; i += 1) {
        if(report[i].charAt(columnNumber) === '1') {
            rowsWithOnes.push(report[i]);
        
        } else {
            rowsWithZeroes.push(report[i]);
        }
    }

    const isMoreOnes = (rowsWithOnes.length >= rowsWithZeroes.length);

    if(mode === 'most common') {
        return (isMoreOnes) ? rowsWithOnes : rowsWithZeroes;

    } else {
        return (isMoreOnes) ? rowsWithZeroes : rowsWithOnes;
    }
}

const part2 = (report: Array<string>): number => {
    const rowLength: number = report[0].length - 1;
    let currentReportOxygen = report;
    let currentReportCO2 = report;

    for(let i: number = 0; i < rowLength; i += 1) {
        if(currentReportOxygen.length > 1) {
            currentReportOxygen = checkColumn(currentReportOxygen, i, 'most common');
        }
        
        if(currentReportCO2.length > 1) {
            currentReportCO2 = checkColumn(currentReportCO2, i, 'least common');
        }
    }

    return parseInt(currentReportOxygen[0], 2) * parseInt(currentReportCO2[0], 2);
}

const report: Array<string> = getReport();

console.log(`Answer for the part 1: ${part1(report)}`);
console.log(`Answer for the part 2: ${part2(report)}`);