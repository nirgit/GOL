const DELAY_BETWEEN_GENERATIONS_IN_MS = 500;
const WHITE_SQUARE = '\u25A1'; 
const LIFE_SYMBOL = WHITE_SQUARE;
const TOTAL_GENERATIONS = -1; // -1 for infinity

const start = (dimension, totalGenerationsToRun) => {
    console.log('========== Game of Life simulation ==========');

    let board = createBoard(dimension);    
    initializeBoardLiveCells(board);

    let generations = isInfiniteGenerations(totalGenerationsToRun) ? 0 : totalGenerationsToRun;
    
    const playGameOfLife = () => {
        if (isInfiniteGenerations(totalGenerationsToRun) || generations > 0) {
            let generationsElapsed = isInfiniteGenerations(totalGenerationsToRun) ? generations : totalGenerationsToRun - generations;
            drawBoard(generationsElapsed, board);
            board = updateBoard(board);
            generations = isInfiniteGenerations(totalGenerationsToRun) ? generations + 1 : generations - 1;
            setTimeout(playGameOfLife, DELAY_BETWEEN_GENERATIONS_IN_MS);
        }
    };

    playGameOfLife();
};

const isInfiniteGenerations = totalGenerationsToRun => totalGenerationsToRun === -1;

const initializeBoardLiveCells = board => {
    board[2][1] = LIFE_SYMBOL;
    board[2][2] = LIFE_SYMBOL;
    board[2][3] = LIFE_SYMBOL;
    board[4][2] = LIFE_SYMBOL;
}

const updateBoard = board => {
    const nextGenBoard = cloneBoard(board);
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            updateCellValue(board, nextGenBoard, rowIndex, colIndex);
        });
    });
    return nextGenBoard;
}

const cloneBoard = board => {
    const clone = [];
    board.forEach(row => {
        clone.push(row.slice());
    });
    return clone;
}

const updateCellValue = (board, nextGenBoard, row, col) => {
    const numberOfLiveNeighbours = getNumberOfLiveNeighbourCells(board, row, col);
    if (isAlive(board[row][col])) {
        switch (numberOfLiveNeighbours) {
            case 0:
            case 1:
                nextGenBoard[row][col] = '';
                break;
            case 2:
            case 3:
                break;
            default:
                nextGenBoard[row][col] = '';
                break;
        }
    } else {
        if (numberOfLiveNeighbours === 3) {
            nextGenBoard[row][col] = LIFE_SYMBOL;
        }
    }
}

const getNumberOfLiveNeighbourCells = (board, row, col) => {
    const neighbourIndexes = getCellNeighbours(row, col);
    return neighbourIndexes
        .filter(neighbour => neighbour[0] !== row || neighbour[1] !== col)
        .reduce((totalNeighbours, neighbour) => {
            const [nRow, nCol] = neighbour;
            if (isCellInsideBoard(board, nRow, nCol)) {
                if (isAlive(board[nRow][nCol])) {
                    return totalNeighbours + 1;
                }
            }
            return totalNeighbours;
        }, 0);
}

const isCellInsideBoard = (board, row, col) => row >= 0 && row < board.length && col >=0 && col < board.length;

const getCellNeighbours = (row, col) => {
    const neighbourIndexes = [];
    [row - 1, row, row + 1].forEach(rowIndex => {
        neighbourIndexes.push([rowIndex, col - 1]);
        neighbourIndexes.push([rowIndex, col]);
        neighbourIndexes.push([rowIndex, col + 1]);
    });
    return neighbourIndexes;
}

const isAlive = val => val === LIFE_SYMBOL;

const drawBoard = (generation, board) => {
    clearScreen();
    console.log(`===== Generation ${generation} =====`);
    board.forEach(drawRow);
}

const clearScreen = () => console.log('\033[2J');
const drawRow = row => console.log(row.join(' ') + '\n');

const createBoard = (dimension) => {
    const board = [];
    for (let i = 0; i < dimension; i++) {
        board.push(Array(dimension).fill(''));
    }
    return board;
}

start(10, TOTAL_GENERATIONS);
