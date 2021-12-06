import { readFileSync } from 'fs';

const getData = (): Array<string> => {
    return readFileSync('./inputs/day-04.txt', 'utf8')
        .replaceAll('\r', '')
        .split('\n');
}

const getBoards = (data: Array<string>): Array<Array<Array<[number, boolean]>>> => {
    const boards = [];

    for(let i: number = 1; i < data.length; i += 1) {
        if(data[i] === '') {
            boards.push(new Array());
        
        } else {
            const currentRow = new Array();
            for(let j: number = 0; j < 5; j += 1) {
                currentRow[j] = [Number(data[i].substring(j + 2*j, j + 2*j + 2)), false];
            }
    
            boards[boards.length - 1].push(currentRow);
        }
    }

    return boards;
}

const markNumbers = (boards: Array<Array<Array<[number, boolean]>>>, drawnNumber: number): void => {
    boards.forEach(board => {
        board.forEach(row => {
            row.forEach(cell => {
                if(cell[0] === drawnNumber) {
                    cell[1] = true;
                }
            });
        });
    });
}

const checkRows = (board: Array<Array<[number, boolean]>>): boolean => {
    if(board.length === 0) return false;

    for(let i: number = 0; i < board.length; i += 1) {
        let markedNumbers: number = 0;

        for(let j: number = 0; j < board[i].length; j += 1) {
            if(board[i][j][1]) {
                markedNumbers += 1;
            }
        }

        if(markedNumbers === board[0].length) {
            return true;
        }
    }

    return false;
}

const checkColumns = (board: Array<Array<[number, boolean]>>): boolean => {
    if(board.length === 0) return false;

    for(let i: number = 0; i < board[0].length; i += 1) {
        let markedNumbers: number = 0;

        for(let j: number = 0; j < board.length; j += 1) {
            if(board[j][i][1]) {
                markedNumbers += 1;
            }
        }

        if(markedNumbers === board.length) {
            return true;
        }
    }

    return false;
}

const checkResults = (boards: Array<Array<Array<[number, boolean]>>>): Array<number> => {
    const winningBoards: Array<number> = new Array();
    
    for(let i: number = 0; i < boards.length; i += 1) {
        if(checkRows(boards[i]) || checkColumns(boards[i])) {
            winningBoards.push(i);
        }
    }

    return winningBoards;
}

const getScore = (board: Array<Array<[number, boolean]>>, drawnNumber: number): number => {
    let unmarkedNumbersSum = 0;

    board.forEach(row => {
        row.forEach(cell => {
            if(cell[1] === false) {
                unmarkedNumbersSum += cell[0];
            }
        });
    });

    return unmarkedNumbersSum * drawnNumber;
}

const playBingo = (boards: Array<Array<Array<[number, boolean]>>>, drawnNumbers: Array<number>, mode: string): number => {
    let boardsLeft: number = boards.length;

    for(let i: number = 0; i < drawnNumbers.length; i += 1) {
        let drawnNumber: number = drawnNumbers[i];
    
        markNumbers(boards, drawnNumber);
    
        let winningBoards: Array<number> = checkResults(boards);
        if(winningBoards.length > 0) {
            if(mode === 'first to win' || boardsLeft === 1) {
                return getScore(boards[winningBoards[0]], drawnNumbers[i]);
            
            } else {
                winningBoards.forEach((winningBoard: number) => {
                    boardsLeft -= 1;
                    boards[winningBoard] = [];
                })
                
            }
            
        }
    }

    return -1;
}

const data: Array<string> = getData();
const drawnNumbers: Array<number> = data[0].split(',').map(number => Number(number));
let boards: Array<Array<Array<[number, boolean]>>> = getBoards(data);

console.log(`Answer for part 1: ${playBingo(boards, drawnNumbers, 'first to win')}`);

boards = getBoards(data);
console.log(`Answer for part 2: ${playBingo(boards, drawnNumbers, 'last to win')}`);