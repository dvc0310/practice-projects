import { gameBoard, createPlayer, game} from './game/tic-tac-toe2.js';

function mainEvent() {
    const cells = Array.from(document.getElementsByClassName('cell'));
    const resetButton = document.getElementById('reset-button');

    // Create player instances
    let player1 = createPlayer('Player 1', 'X');
    let player2 = createPlayer('Player 2', 'O');

    // Start a new game with the players
    game.startNewGame(player1, player2);

    let currentPlayer = player1; // Start with player 1

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            // Convert index to x and y coordinates
            if (game.isGameOver()) {
                alert('Game over!');
                return;
            }
            const x = index % 3;
            const y = Math.floor(index / 3);

            // Make a move in the game
            const success = game.makeMove(x, y);
            console.log(success);
            if (success) {
                // Update the DOM
                cell.textContent = currentPlayer.getMark();


                // Check if the game is over
                if (game.checkWin()) {
                    alert('Game over!');
                }

                // Switch players
                currentPlayer = currentPlayer === player1 ? player2 : player1;
            }
        });
    });

    // Set up event listener for the reset button
    resetButton.addEventListener('click', () => {
        // Reset the game
        gameBoard.resetBoard();

        // Update the DOM
        cells.forEach(cell => {
            cell.textContent = '';
        });

        // Start with player 1 again
        currentPlayer = player1;
    });
}

document.addEventListener('DOMContentLoaded', () => mainEvent());
