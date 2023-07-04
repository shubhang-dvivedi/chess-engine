import { evaluateBoard } from './evaluateBoard.js';
import { Chess } from 'chess.js';

// functions to be implemented
function rules(board, piece_position, target_position){}

// INPUTS board and player to move
// RETURNS true if game is over
function isGameOver(board, player){
    const white_player = (player == 'w') ? true : false;
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            let piece = board[i][j];
            if ((white_player && piece === toUpperCase(piece)) || (!white_player && piece === toLowerCase(piece))){
                for (let m = 0; m < 8; m++){
                    for (let n = 0; n < 8; n++){
                        if (rules(board, [i,j], [m,n])) {
                            return false; // CORNER CASE: check if the game is draw
                        }
                    }
                }
            }
        }
    }
    return true;
}

// findAllMoves find all possible moves of a certain player given a board board
// INPUT board and player to move and RETURNS an array of boards that can be achieved after player has played all possible moves
function findAllMoves(board, player){
    const white_player = (player == 'w') ? true : false;
    const all_moves = [];
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            let piece = board[i][j];
            if ((white_player && piece === toUpperCase(piece)) || (!white_player && piece === toLowerCase(piece))){
                for (let m = 0; m < 8; m++){
                    for (let n = 0; n < 8; n++){
                        if (rules(board, [i,j], [m,n])) {
                            let temp = board; // handle edge cases: castling, en passant, pawn promotion
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
// INPUT search depth, board board, player to move, alpha and beta (parameters for alpha beta pruning)
// RETURNS an array which consists of [board evaluation after search depth if next best move played, board board after next best move]
function nextBestMove(depth, fen, player, alpha, beta){
    const white_player = (player == 'w') ? true : false;
    if (isGameOver(fen, player)){
        if (white_player){
            return [-1e9, fen];
        } else {
            return [1e9, fen];
        }
    }
    if (depth == 0){
        return [evaluateBoard(fen), fen];
    }

    if (white_player) {
        max_eval = -1e9;
            let board = new Chess(fen); 

        // let new_boards = findAllMoves(board, white_player);
        // let new_board = 
        for (let new_pos of new_boards){
            let evaluation = nextBestMove(depth-1, new_pos, false, alpha, beta);
            if (evaluation[0] > max_eval[0]) max_eval = [evaluation[0], new_pos];
            alpha = max(alpha, evaluation[0]);
            if (beta <= alpha){
                break;
            }
        }
        return max_eval;
    } else {
        min_eval = 1e9;
        let new_boards = findAllMoves(board, white_player);
        for (let new_pos of new_boards){
            let evaluation = nextBestMove(depth-1, new_pos, true, alpha, beta);
            if (evaluation[0] < min_eval[0]) min_eval = [evaluation[0], new_pos];
            beta = min(beta, evaluation[0]);
            if (beta <= alpha){
                break;
            }
        }
        return min_eval;
    }
}

// computes the next best move
// takes INPUT boards, depth of search, player (either 'w' or 'b') to move and RETURNS board board after next move
// the next move generated is currently finding the next best possible move
export function computeNextMove(fen, depth = 2, player){
    let alpha = -1e9;
    let beta = 1e9;
    const next_move = nextBestMove(depth, fen, player, alpha, beta)[1];
    return next_move;
}