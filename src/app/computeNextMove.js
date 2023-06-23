// functions to be implemented
function rules(position, piece_coordinate, target_coordinate){}
function evaluatePosition(position){}

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

function findAllMoves(position, player){
    const white_player = (player == 'w') ? true : false;
    const all_moves = [];
    // traverse the board to find all pieces
    // if white to play and piece is white, or black to play and piece is black, check for all possible moves
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            let piece = position[i][j];
            if ((white_player && piece === toUpperCase(piece)) || (!white_player && piece === toLowerCase(piece))){
                for (let m = 0; m < 8; m++){
                    for (let n = 0; n < 8; n++){
                        if (rules(position, [i,j], [m,n])) {
                            let temp = position; // if (piece == 'K' && Math.abs(j-n) == 2){} // CORNER CASE: check for castling since 2 pieaces are moved
                            temp[m][n] = temp[i][j];
                            all_moves.push(temp);
                        }
                    }
                }
            }
        }
    }
    return all_moves;
}

function minimax(depth, position, white_player, alpha, beta){
    // stopping conditions
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
            let eval = minimax(depth-1, new_pos, false, alpha, beta);
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
            let eval = minimax(depth-1, new_pos, true, alpha, beta);
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
// takes INPUT positions, depth of search, player to move and RETURNS position after best possible move
function computeNextMove(position, depth = 2, player){
    let white_player = (player == 'w') ? true : false;
    let alpha = -1e9;
    let beta = 1e9;
    // next_move consists
    const next_move = minimax(depth, position, white_player, alpha, beta);
    return next_move[1];
}