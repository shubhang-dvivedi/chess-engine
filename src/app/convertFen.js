// the function takes in fen notation and returns an array consisting of [bool_board, char_board, board_meta_data]
// board_meta_data is an array which consists of [next to move, castleable positions, en passant positions, half moves count, total moves count]
function convertFen(fen_notation){
    const fen_array = fen_notation.trim().split(' ');
    const fen_board = fen_array[0].split('/');
    const board_meta_data = fen_array.slice(1,fen_array.length);
    const row = 0;
    const bool_board  = [];
    const char_board = [];

    while (row != 8){
        let bool_col = [];
        let char_col = []
        for (let i = 0; i < fen_board[row].length; i++){
            if (/^\d$/.test(fen_board[row][i])){
                for (let j = 0; j < parseInt(fen_board[row][i]); j++){
                    bool_col.push(false);
                    char_col.push('');
                }
            }
            else{
                bool_col.push(True);
                char_col.push(fen_board[row][i]);
            }
        }
        bool_board.push(bool_col);
        char_board.push(char_col);
        row++;
    }
    return [bool_board, char_board, board_meta_data];
}