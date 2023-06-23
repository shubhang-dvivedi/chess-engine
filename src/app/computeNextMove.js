// functions to be implemented
function isGameOver(position, player){}
function findAllMoves(position, player){}
function evaluatePosition(position){}

function computeNextMove(position, depth, player){
    if (player == 'w'){
        is_white_player = true;
    } else {
        is_white_player = false;
    }
    let alpha = -1e9;
    let beta = 1e9;
    minimax(depth, position, is_white_player, alpha, beta);
}

function minimax(depth, position, white_player, alpha, beta){
    // stopping conditions
    if (isGameOver(position, (white_player)?'w':'b' )){
        if (white_player){
            return -1e9;
        } else {
            return 1e9;
        }
    }
    if (depth == 0){
        return evaluatePosition(position);
    }

    if (white_player){
        max_eval = -1e9;
        let new_positions = findAllMoves(position, white_player);
        for (let new_pos of new_positions){
            let eval = minimax(depth-1, new_pos, false, alpha, beta);
            max_eval = max(max_eval, eval);
            alpha = max(max_eval, eval);
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
            min_eval = min(min_eval, eval);
            beta = min(beta, eval);
            if (beta <= alpha){
                break;
            }
        }
        return min_eval;
    }
}