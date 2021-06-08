

function bestMove() {
    // AI to make its turn

    let bestScore = -Infinity;
    let move;
    for (var i = 0; i < gameBoard.length; i++) {
        // Is the spot available?
        if (board[i] === '') {
            board[i] = ai;
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = {i};

            }
        } else { }
    }
    AIGame.turns(move.i);
    currentPlayer = human;
}
let scores = {
    X: 10,
    O: -10,
    tie: 0
};




function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== undefined) {
        return scores[result];
    }

    let w = window.innerWidth;



    if (isMaximizing) {
        let bestScore = -Infinity;
        for (var i = 0; i < gameBoard.length; i++) {


            // Is the spot available?
            if (board[i] == '') {
                board[i] = ai;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (var i = 0; i < gameBoard.length; i++) {
            // Is the spot available?
            if (board[i] == '') {
                board[i] = human;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }

        }
        return bestScore;
    }
}




