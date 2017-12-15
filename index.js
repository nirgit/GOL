const start = () => {
    console.log('========== Game of Life simulation ==========');

    const dimension = 10;
    const board = createBoard(dimension);
    const TOTAL_GENERATIONS = 5;
    let generations = TOTAL_GENERATIONS;
    
    const play = () => {
        if (generations > 0) {
            drawBoard(TOTAL_GENERATIONS - generations, board);
            updateBoard(board);
            generations--;
            setTimeout(play, 1000);
        }
    };
    play();
};

const updateBoard = board => {
    
}

const drawBoard = (generation, board) => {
    console.log('\033[2J');
    console.log('Generation ' + generation);
    for (let i=0; i < board.length; i++) {
        console.log(board[i].join(' ') + '\n');
    }
}

const createBoard = (dimension) => {
    const board = [];
    for (var i=0; i < dimension; i++) {
        board.push(Array(dimension));
    }
    return board;
}

start();
