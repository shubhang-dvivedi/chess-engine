// functions to be implemented
function rules(position, piece_coordinate, target_coordinate){}

// INPUT board position and RETURNS the evaluation of the board
// evaluation parameters: piece points. (add more parameters)
function evaluatePosition(position){
    const piece_points = {'p':100,'P':100,'b':300,'B':300,'n':300,'N':300,'r':500,'R':500,'q':900,'Q':900,'k':0,'K':0};
    let white_points = 0;
    let black_points = 0;
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (position[i][j] != ''){
                let piece = position[i][j];
                if (piece === toUpperCase(piece)){
                    white_points += piece_points[piece];
                } else {
                    black_points += piece_points[piece];
                }
            }
        }
    }
    let eval = white_points - black_points;
    return eval;
}

// INPUTS board position and player to move
// RETURNS true if game is over
function isGameOver(position, player){
    const white_player = (player == 'w') ? true : false;
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            let piece = position[i][j];
            if ((white_player && piece === toUpperCase(piece)) || (!white_player && piece === toLowerCase(piece))){
                for (let m = 0; m < 8; m++){
                    for (let n = 0; n < 8; n++){
                        if (rules(position, [i,j], [m,n])) {
                            return false; // CORNER CASE: check for if the game is draw
                        }
                    }
                }
            }
        }
    }
    return true;
}

// findAllMoves find all possible moves of a certain player given a board position
// INPUT board position and player to move and RETURNS an array of board positions that can be achieved after player has played all possible moves
function findAllMoves(position, player){
    const white_player = (player == 'w') ? true : false;
    const all_moves = [];
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            let piece = position[i][j];
            if ((white_player && piece === toUpperCase(piece)) || (!white_player && piece === toLowerCase(piece))){
                for (let m = 0; m < 8; m++){
                    for (let n = 0; n < 8; n++){
                        if (rules(position, [i,j], [m,n])) {
                            let temp = position;
                            if ((piece === 'K' || piece === 'k') && Math.abs(j-n) == 2){
                                temp[m][n] = temp[i][j];
                                temp[i][j] = '';
                                if (n === 6){
                                    temp[m][5] = temp[i][7];
                                    temp[i][7] = '';
                                } else if (n === 2){
                                    temp[m][3] = temp[i][0];
                                    temp[i][0] = '';
                                }
                            } else{
                                temp[m][n] = temp[i][j];
                                temp[i][j] = '';
                                all_moves.push(temp);
                            }
                        }
                    }
                }
            }
        }
    }
    return all_moves;
}

// nextBestMove uses minimax algo and alpha beta pruning to compute best possible move.
// INPUT search depth, board position, player to move, alpha and beta (parameters for alpha beta pruning)
// RETURNS an array which consists of [position evaluation after search depth if next best move played, board position after next best move]
function nextBestMove(depth, position, player, alpha, beta){
    const white_player = (player == 'w') ? true : false;
    if (isGameOver(position, (white_player)?'w':'b' )){
        if (white_player){
            return [-1e9, position];
        } else {
            return [1e9, position];
        }
    }
    if (depth == 0){
        return [evaluatePosition(position), position];
    }

    if (white_player){
        max_eval = -1e9;
        let new_positions = findAllMoves(position, white_player);
        for (let new_pos of new_positions){
            let eval = nextBestMove(depth-1, new_pos, false, alpha, beta);
            if (eval[0] > max_eval[0]) max_eval = [eval[0], new_pos];
            alpha = max(alpha, eval[0]);
            if (beta <= alpha){
                break;
            }
        }
        return max_eval;
    } else{
        min_eval = 1e9;
        let new_positions = findAllMoves(position, white_player);
        for (let new_pos of new_positions){
            let eval = nextBestMove(depth-1, new_pos, true, alpha, beta);
            if (eval[0] < min_eval[0]) min_eval = [eval[0], new_pos];
            beta = min(beta, eval[0]);
            if (beta <= alpha){
                break;
            }
        }
        return min_eval;
    }
}

// computes the next best move
// takes INPUT positions, depth of search, player to move and RETURNS board position after next move
// the next move generated is currently finding the next best possible move
function computeNextMove(position, depth = 2, player){
    let alpha = -1e9;
    let beta = 1e9;
    const next_move = nextBestMove(depth, position, player, alpha, beta)[1];
    return next_move;
}