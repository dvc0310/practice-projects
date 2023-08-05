// gameBoard module
export const gameBoard = (() => {
    let board = Array.from({length: 3}, () => Array.from({length: 3}, () => null));

    const getBoard = () => board;
    const setMark = (x, y, mark) => {
        if (board[y][x] === null) {
            board[y][x] = mark;
            console.log(x);
            console.log(y);
            return true;
        }
        return false;
    };
    const resetBoard = () => {
        board = Array.from({length: 3}, () => Array.from({length: 3}, () => null));
    };

    return { getBoard, setMark, resetBoard };
})();

// player factory
export const createPlayer = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
};

// game module
export const game = (() => {
    let player1, player2;
    let currentPlayer;
    let gameOver = false; // Add this line

    const startNewGame = (p1, p2) => {
        player1 = p1;
        player2 = p2;
        currentPlayer = player1;
        gameBoard.resetBoard();
        gameOver = false;
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const makeMove = (x, y) => {
        if (gameBoard.setMark(x, y, currentPlayer.getMark())) {
            if (checkWin()) {
                alert(`${currentPlayer.getName()} has won!`);
                gameOver = true;
            } else {
                switchPlayer();
            }
            return true; // The move was successful
        } else {
            alert("Invalid move");
            return false; // The move was not successful
        }
    };
    

    const checkWin = () => {
        const board = gameBoard.getBoard();
        const currentPlayerMark = currentPlayer.getMark();

        for (let i = 0; i < 3; i++) {
            if (board[i][0] === currentPlayerMark && board[i][1] === currentPlayerMark && board[i][2] === currentPlayerMark) {
                return true;
            }
            if (board[0][i] === currentPlayerMark && board[1][i] === currentPlayerMark && board[2][i] === currentPlayerMark) {
                return true;
            }
        }
    
        if (board[0][0] === currentPlayerMark && board[1][1] === currentPlayerMark && board[2][2] === currentPlayerMark) {
            return true;
        }
        if (board[0][2] === currentPlayerMark && board[1][1] === currentPlayerMark && board[2][0] === currentPlayerMark) {
            return true;
        }
    
        return false;
    };
    

    return { startNewGame, makeMove, checkWin, isGameOver: () => gameOver  };
})();

