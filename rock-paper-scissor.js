let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
    }; //JSON.parse converts JSON or string object to javascript object


updateScore();

let autoPlaying = false;
let intervalID;

function autoPlay(){
    const autoPlayButton = document.querySelector('.js-autoplay-button');

    if (!autoPlaying) {
        intervalID = setInterval(() => {  //Arrow function
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },1000);
        autoPlaying = true;
        autoPlayButton.textContent = 'Stop Playing';
    }
    else {
        clearInterval(intervalID);
        autoPlaying = false;
        autoPlayButton.textContent = 'Auto Play'; 
    }
    
}

document.querySelector('.js-rock-button')
    .addEventListener('click',() => {
        playGame('rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click',() => {
        playGame('paper');
    });

document.querySelector('.js-scissor-button')
    .addEventListener('click',() => {
        playGame('scissors');
    });

document.querySelector('.js-autoplay-button')
    .addEventListener('click', () => {
        autoPlay();
    });

document.querySelector('.js-reset-button')
    .addEventListener('click',() => {
        resetScore();
    });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r')
        playGame('rock')
    else if (event.key === 'p')
        playGame('paper')
    else if (event.key === 's')
        playGame('scissors')
    else if (event.key === 'a') 
        autoPlay();
    else if (event.key === 'Backspace')
        showResetConfirmation();
});

function showResetConfirmation() {
    const confirmationDiv = document.querySelector('.js-reset-confirmation');
    confirmationDiv.style.display = 'block';
}

function hideResetConfirmation() {
    const confirmationDiv = document.querySelector('.js-reset-confirmation');
    confirmationDiv.style.display = 'none';
}

document.querySelector('.js-reset-yes').addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
});

document.querySelector('.js-reset-no').addEventListener('click', () => {
    hideResetConfirmation();
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = ''; 
    if (playerMove === 'rock') {
        if (computerMove === 'rock'){
            result = 'Tie';
        } else if (computerMove === 'paper'){
            result = 'You lose';
        } else if (computerMove === 'scissors'){
            result = 'You win';
        }
    }

    if (playerMove === 'paper') {
        if (computerMove === 'paper'){
            result = 'Tie';
        } else if (computerMove === 'rock'){
            result = 'You win';
        } else if (computerMove === 'scissors'){
            result = 'You lose';
        }
    }

    if (playerMove === 'scissors') {
        if (computerMove === 'paper'){
            result = 'You win';
        } else if (computerMove === 'rock'){
            result = 'You lose';
        } else if (computerMove === 'scissors'){
            result = 'Tie';
        }
    }

    if (result === 'You win'){
        score.wins += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    } else {
        score.losses += 1;
    }
    localStorage.setItem('score',JSON.stringify(score)); //localStorage only supports strings and it is used to store any data which is 
//supposed to be consistent even after the page gets refreshed.
//JSON.stringify converst javascript obj to JSON obj

    updateScore();

    document.querySelector('.js-result')
    .innerHTML = `${result}`;

    document.querySelector('.js-moves')
    .innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;

//  POP up - alert(`You picked rock. Computer picked ${computerMove}. ${result}
// wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`);

} 
function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }                
    return computerMove;
}

function updateScore(){
    document.querySelector('.js-score')
    .innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}
function resetScore(){
    score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    document.querySelector('.js-score')
    .innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}