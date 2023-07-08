import { convertFen } from './convertFen.js';

function pieceHeatMap(board, piece, position){
    const pawn_map =
    [[0,0,0,0,0,0,0,0],
    [50,50,50,50,50,50,50,50],
    [10,10,20,30,30,20,10,10],
    [5,5,10,25,25,10,5,5],
    [0,0,0,20,20,0,0,0],
    [5,-5,-10,0,0,-10,-5,5],
    [5,10,10,-20,-20,10,10,5],
    [0,0,0,0,0,0,0,0]];

    const knight_map =
    [[-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,0,0,0,0,-20,-40],
    [-30,0,10,15,15,10,0,-30],
    [-30,5,15,20,20,15,5,-30],
    [-30,0,15,20,20,15,0,-30],
    [-30,5,10,15,15,10,5,-30],
    [-40,-20,0,5,5,0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50],];

    const bishop_map =
    [[-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,0,0,0,0,0,0,-10],
    [-10,0,5,10,10,5,0,-10],
    [-10,5,5,10,10,5,5,-10],
    [-10,0,10,10,10,10,0,-10],
    [-10,10,10,10,10,10,10,-10],
    [-10,5,0,0,0,0,5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20]];

    const rook_map =
    [[0,0,0,0,0,0,0,0],
    [5,10,10,10,10,10,10,5],
    [-5,0,0,0,0,0,0,-5],
    [-5,0,0,0,0,0,0,-5],
    [-5,0,0,0,0,0,0,-5],
    [-5,0,0,0,0,0,0,-5],
    [-5,0,0,0,0,0,0,-5],
    [0,0,0,5,5,0,0,0]];

    const queen_map =
    [[-20,-10,-10,-5,-5,-10,-10,-20],
    [-10,0,0,0,0,0,0,-10],
    [-10,0,5,5,5,5,0,-10],
    [-5,0,5,5,5,5,0,-5],
    [0,0,5,5,5,5,0,-5],
    [-10,5,5,5,5,5,0,-10],
    [-10,0,5,0,0,0,0,-10],
    [-20,-10,-10,-5,-5,-10,-10,-20]];

    const king_map =
    [[-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],
    [-10,-20,-20,-20,-20,-20,-20,-10],
    [20,20,0,0,0,0,20,20],
    [20,30,10,0,0,10,30,20]];

    let x = position[0];
    let y = position[1];
    if (piece === piece.toLowerCase()){
        x = 7-x;
    }
    switch(piece.toUpperCase()){
        case 'P':
            return pawn_map[x][y];
        case 'N':
            return knight_map[x][y];
        case 'B':
            return bishop_map[x][y];
        case 'R':
            return rook_map[x][y];
        case 'Q':
            return queen_map[x][y];
        case 'K':
            return king_map[x][y];
        default:
            console.log("Incorrect piece name");
            break;
    }
}

function totalPiecePoints(board){
    const piece_points = {'p':100,'P':100,'b':300,'B':300,'n':300,'N':300,'r':500,'R':500,'q':900,'Q':900,'k':1e9,'K':1e9};
    let white_points = 0;
    let black_points = 0;
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (board[i][j] != ''){
                let piece = board[i][j];
                if (piece === piece.toUpperCase()){
                    white_points += piece_points[piece];
                    white_points += pieceHeatMap(board, piece, [i,j]);
                } else {
                    black_points += piece_points[piece];
                    black_points += pieceHeatMap(board, piece, [i,j]);
                }
            }
        }
    }
    return white_points - black_points;
}

// INPUT board board and RETURNS the evaluation of the board
// evaluation parameters: piece points, board of piece on board (add more parameters)
export function evaluateBoard(fen){
    let board = convertFen(fen)[0];    
    let final_eval = 0;
    final_eval += totalPiecePoints(board);
    return final_eval;
}