// the function takes in fen notation and returns an array consisting of [bool_board, char_board, board_meta_data]
// board_meta_data is an array which consists of [next to move, castleable positions, en passant positions, half moves count, total moves count]
function convertFen(fen_notation){
    const fen_array = fen_notation.trim().split(' ');
    const fen_board = fen_array[0].split('/');
    const board_meta_data = fen_array.slice(1,fen_array.length);
    let row = 0;
    let bool_board  = [];
    let char_board = [];
    let bool_col = [];
    let char_col = [];
    
    while (row != 8){
        bool_col = [];
        char_col = [];
        for (let i = 0; i < fen_board[row].length; i++){
            if (/^\d$/.test(fen_board[row][i])){
                for (let j = 0; j < parseInt(fen_board[row][i]); j++){
                    bool_col.push(false);
                    char_col.push('');
                }
            }
            else{
                bool_col.push(true);
                char_col.push(fen_board[row][i]);
            }
        }
        bool_board.push(bool_col);
        char_board.push(char_col);
        row = row + 1;
    }
    console.log(bool_board);
    console.log(char_board);
    return [bool_board, char_board, board_meta_data];
}
str = "8/8/8/4p1K1/2k1P3/8/8/8 b - - 0 1"
convertFen(str);