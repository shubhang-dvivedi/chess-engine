// INPUT fen notation
// RETURN array consisting of [char_board, board_meta_data]
// board_meta_data is an array which consists of [next player, castleable positions, en passant positions, half moves count, total moves count]
function convertFen(fen_notation){
    const fen_array = fen_notation.trim().split(' ');
    const fen_board = fen_array[0].split('/');
    const board_meta_data = fen_array.slice(1,fen_array.length);
    let row = 0;
    let char_board = [];
    let char_col = [];
    
    while (row != 8){
        char_col = [];
        for (let i = 0; i < fen_board[row].length; i++){
            if (/^\d$/.test(fen_board[row][i])){
                for (let j = 0; j < parseInt(fen_board[row][i]); j++){
                    char_col.push('');
                }
            }
            else{
                char_col.push(fen_board[row][i]);
            }
        }
        char_board.push(char_col);
        row = row + 1;
    }
    console.log(char_board);
    return [char_board, board_meta_data];
}
