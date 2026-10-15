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







