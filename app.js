const ROWS = 6;
const COLUMNS = 7;
const BOARD_SIZE = ROWS * COLUMNS;
const time = 20
const dropCoin = new Audio ('drop2.mp3');
const timerClock = new Audio('timer2.mp3')
const victory = new Audio ('victory.mp3')
const counter = new Audio ('counter.mp3')
const  click = new Audio ('click.mp3')
const lobby = new Audio ('fort.mp3')
lobby.loop = true ;
let board = [];
let turn = 'RED';
let winner = false;
let tie = false;
let players = {
    RED: 'Player 1 (Red)',
    YELLOW: 'Player 2 (Yellow)'

};
let timerInit =null ;
let timeStart = time ;
let winningCoins = [];
let gameStart = false ;
const startGame =document.querySelector ('.start-button') ;
const welcomeWebsite = document.querySelector('#welcome-screen') ;
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');
const playerOne = document.querySelector('#player1Input')
const playerTwo = document.querySelector('#player2Input')
const setName = document.querySelector('#setNameBtn')
const nameSet = document.querySelector('#SetPlayerName')
const timerToPlayers = document.querySelector('#timer')
const playersDisplayEl = document.querySelector('#playersDisplay');
const p1DisplayEl = document.querySelector('#p1Display');
const p2DisplayEl = document.querySelector('#p2Display');
const winningCombos = [
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
    [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
    [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
    [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
    [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
    [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
    [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
    [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
    [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
    [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27],
    [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34],
    [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41],
    [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24],
    [10, 16, 22, 28], [11, 17, 23, 29], [12, 18, 24, 30], [13, 19, 25, 31],
    [17, 23, 29, 35], [18, 24, 30, 36], [19, 25, 31, 37], [20, 26, 32, 38]
];
function hideWelcome () {
    welcomeWebsite.classList.add ('hidden')
}
function setNamePlayer() {
    if (click) {
    click.currentTime =1 ;
    click.play();
    lobby.pause () ;
    }
  
    const playerOnename = playerOne ? playerOne.value.trim() : '';
    const playerTwoname = playerTwo ? playerTwo.value.trim() : '';
    if (playerOnename) players.RED = playerOnename;
    if (playerTwoname) players.YELLOW = playerTwoname;

    if (nameSet) nameSet.style.display = 'none';
    if (playersDisplayEl) playersDisplayEl.style.display = 'flex';
    if (p1DisplayEl) p1DisplayEl.textContent = `🔴 ${players.RED}`;
    if (p2DisplayEl) p2DisplayEl.textContent = `🟡 ${players.YELLOW}`;
    let countDown = 3;
    if (messageEl) {
        messageEl.textContent = countDown;
        messageEl.classList.add('players-display')
    }

    const countDownInterval = setInterval(() => {
        countDown--;
        if (countDown > 0) {
            counter.currentTime = 2 ;
            counter.play();
            if (messageEl) 
                messageEl.textContent = countDown;
               
        } else {
            messageEl.classList.remove('warning-countdown')
            clearInterval(countDownInterval);
            gameStart = true;
            render();
            if (!winner && !tie) {
                startTimer();
            }
        }
    }, 1000);
}

function startTimer() {
    if (!gameStart || winner || tie) 
    return;
stopTimer() ;
    timeStart = time;
    updateTime();
    if (timerClock) {
        timerClock.currentTime = 0 ;
        timerClock.play();
    }

    timerInit = setInterval(() => {
        if (winner || tie) {
            stopTimer();
            return;
        }

        timeStart--;
        updateTime();
        if (timeStart <= 0) {
            stopTimer();
            switchPlayerTurn();
            render();
            startTimer();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInit !== null) {
        clearInterval(timerInit);
        timerInit = null;
    }
    if (timerClock) {
        timerClock.pause();
        timerClock.currentTime = 0;
    }
}

function updateTime() {
    if (timerToPlayers) {
        timerToPlayers.textContent = ` ⏱️Time remaining: ${timeStart}s`;
        if (timeStart <=5 && timeStart> 0 ){
            timerToPlayers.classList.add('warning') ;

        } else {
            timerToPlayers.classList.remove('warning')
        }
    } 
}

function init() {
    lobby.currentTime = 0 ;
    stopTimer();
    victory.currentTime = 0 ;
    victory.pause();
    board = Array(BOARD_SIZE).fill('');
    turn = 'RED';
    winner = false;
    tie = false;
    timeStart = time ;
    gameStart = false ;

    players = {
        RED: 'Player 1 (Red)',
        YELLOW: 'Player 2 (Yellow)'
    };

    if (playerOne) playerOne.value = '';
    if (playerTwo) playerTwo.value = '';
    if (nameSet) {
        nameSet.style.display = 'block';
    }
    if (playersDisplayEl) playersDisplayEl.style.display ='none';
    timeStart = time;

    render();
    updateTime ();
    
}
function updateActivePlayer () {
    if (!p1DisplayEl || !p2DisplayEl) return ;
    if (winner) {
    if (turn === 'RED' ) {
        p1DisplayEl.classList.add('active-player');
        p2DisplayEl.classList.remove('active-player');
    } else if (turn === 'YELLOW' ) {
        p2DisplayEl.classList.add('active-player');
        p1DisplayEl.classList.remove('active-player');
} else {
    p1DisplayEl.classList.remove('active-player');
    p2DisplayEl.classList.remove('active-player');
}
return ;
}
    if (turn === 'RED' && gameStart && !tie) {
        p1DisplayEl.classList.add('active-player');
        p2DisplayEl.classList.remove('active-player');
    } else if (turn === 'YELLOW' && gameStart && !tie) {
        p2DisplayEl.classList.add('active-player');
        p1DisplayEl.classList.remove('active-player');
} else {
    p1DisplayEl.classList.remove('active-player');
    p2DisplayEl.classList.remove('active-player');
}
}

function render() {
    updateBoard();
    updateMessage();
    updateActivePlayer ();
}

function updateBoard() {
    board.forEach((cell, index) => {
        if (squareEls[index]) {
            const rowIndex=Math.floor(index/7)
            squareEls[index].classList.toggle('red', cell === 'RED');
            squareEls[index].classList.toggle('yellow', cell === 'YELLOW');
            if (winner && winningCoins.includes(index)) {
                squareEls[index].classList.add('winning-coin') 
            } else {
                squareEls[index].classList.remove('winning-coin')
            }
            if (cell !== '') {
                squareEls[index].classList.add(`row-${rowIndex}`) ;
            } else {
               squareEls[index].classList.remove('row-0', 'row-1', 'row-2', 'row-3', 'row-4', 'row-5') ; 
            }
        }
    });
}

function updateMessage() {
    if (!messageEl) return;

    if (!winner && !tie) {
        messageEl.textContent = "";
        messageEl.classList.remove('win-message')
        return;
    }
      messageEl.classList.add('win-message')
    if (tie) {
        messageEl.textContent = "👏🏻 It's a tie! 👏🏻 ";
        stopTimer();
        return;
    }

    messageEl.textContent = `🎉   ${players[turn]} wins 🎉`;
    stopTimer();
}

function handleClick(index) {
    if (!gameStart || winner || tie || board[index] !== '') return;

    const col = index % 7;
    let targetIndex = -1;

    for (let i = col + 35; i >= 0; i -= 7) {
        if (board[i] === '') {
            targetIndex = i;
            break;
        }
    }

    if (targetIndex !== -1) {
        if (dropCoin) {
            dropCoin.currentTime= 0 ;
            dropCoin.play() ;
        }
        board[targetIndex] = turn;
    }
    checkForWinner();
    checkForTie();

    if (!winner && !tie) {
        switchPlayerTurn();
        render();
        startTimer();
    } else {
        stopTimer();
        if (winner && victory) {
            victory.currentTime = 0 ;
            victory.play();
        }
        render();
    }
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
        const [a, b, c, d] = combo;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c] && board[a] === board[d]) {
            winner = true;
            winningCoins = combo ;
        }

    });
}

function checkForTie() {
    if (winner) return;
    if (!board.includes('')) {
        tie = true;
    }
}

function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'RED' ? 'YELLOW' : 'RED';
}

squareEls.forEach((squareEl, index) => {
    squareEl.addEventListener('click', () => handleClick(index));
});

if (resetBtnEl) {
    resetBtnEl.addEventListener('click', init);
}
if (setName) {
    setName.addEventListener('click', setNamePlayer);
    
}
 startGame.addEventListener ('click' , hideWelcome) ;
 window.addEventListener ('click' , lobby.play() )
 lobby.play () ;
init();