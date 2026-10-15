const ROWS = 6;
const COLMUNS = 7 ;
const BOARD_size = ROWS * COLMUNS
const winningLength = 4
const player_colors = {
    RED : 'red' ,
    YELLOW :'yellow'
}
//////////////////////////////////////////////
let board = [] ;
let currentPlayer = player_colors.RED ;
let win_state = false ;
let tie = false ;
let gameOver = false ;
////////////////////////////////////////////
const squares = document.querySelectorAll('.sqr')
const timersbutton = document.querySelectorAll('.timer-container')
const restButton = document.querySelectorAll('#reset')
const SetPlayerName = document.querySelectorAll ('#SetPlayerName')
const playerName =document.querySelectorAll('#playerName')
const boardElement = document.querySelectorAll('.board')
///////////////////////////////////////////////////////////////
function setPlayerName() {
   const name = playerNameInput.value.trim();
   if (!name) {
       playerNameElement.textContent = 'player 1';
       return ;
   }
   playerNameElement.textContent = name ;
   playerNameInput.value ='';
}
function getBoardIndex (row , colmun) {
if ( !Number.isInteger(row) || !Number.isInteger(colmun) || row < 0 || row >= ROWS || colmun < 0 || colmun >= COLMUNS ) {
    return -1
}
return row * COLMUNS + colmun ;
}
function getAvalibleROW (colmun) {
    if (!Number.isInteger(colmun) || colmun < 0 || colmun >= COLUMNS) {
        return -1;
    }
    for ( let row =ROWS ; row >= 0 ; row --) {
      if (board[getBoardIndex(row ,colmun)] === null) {
        return row ;
      }  
    }
 return -1
}








