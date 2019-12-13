const $rock = document.querySelector('.player-rock');
const $paper = document.querySelector('.player-paper');
const $scissors = document.querySelector('.player-scissors');
const $startGame = document.querySelector('.start-game');
const $finalScore = document.querySelector("#final-score");
const $results = document.querySelector("#results");
const $container = document.querySelector(".container");
const options = ['rock', 'paper', 'scissors'];
let $numberOfRounds = document.querySelector('input');
let playerScore = 0;
let computerScore = 0;

let round = 0;


function computerPlay(){
    let choice = Math.floor(Math.random() * 3);
    selected('computer' + '-' + options[choice]);
    return options[choice];
}


function selected(item){
    document.getElementsByClassName(item)[0].classList.toggle("selected");
    setTimeout(function(){
        document.getElementsByClassName(item)[0].classList.toggle("selected")}, 1000
    );    
}



function playerPlay(playerSelection){
    selected('player' + '-' + playerSelection);
    game(playerSelection);
}



$rock.addEventListener('click', function(){playerPlay('rock')});
$paper.addEventListener('click', function(){playerPlay('paper')});
$scissors.addEventListener('click', function(){playerPlay('scissors')});



function playRound(playerSelection, computerSelection) {

    if (playerSelection === 'rock' && computerSelection === 'paper'){
        return "You Win! Rock beats Paper";
    }
    else if (playerSelection === 'rock' && computerSelection === 'scissors'){
        return "You Win! Rock beats Scissors";
    }
    else if (playerSelection === 'paper' && computerSelection === 'rock'){
        return "You Win! Paper beats Rock";
    }
	else if (playerSelection === 'paper' && computerSelection === 'scissors'){
        return "You Lose! Scissors beats Paper";
    }
    else if (playerSelection === 'scissors' && computerSelection === 'rock'){
        return "You Lose! Rock beats Scissors";
    }
    else if (playerSelection === 'scissors' && computerSelection === 'paper'){
        return "You Win! Scissors beats Paper";
    }
    else if (playerSelection === 'rock' && computerSelection === 'rock'){
        return "Draw!";
    }
    else if (playerSelection === 'scissors' && computerSelection === 'scissors'){
        return "Draw!";
    }
    else if (playerSelection === 'paper' && computerSelection === 'paper'){
        return "Draw!";
    }
}


function finalScore(playerScore, computerScore){
    if (playerScore > computerScore){
        return `You have won ${playerScore} to ${computerScore}`;
    }
    if (playerScore < computerScore){
        return `You have lost ${computerScore} to ${playerScore}`;
    }
    if (playerScore === computerScore){
        return `You have drawn ${playerScore} to ${computerScore}`;
    }
}


function lock(){
    $container.classList.add("locked");
}


function unlock(){
    $container.classList.remove("locked");
}


function newGame(){
    unlock();
	round = 0;
    playerScore = 0;
    computerScore = 0;
    $finalScore.classList.add("hidden");
    $results.innerText = '';
}


function game(playerSelection){
    let numberOfRounds = Number($numberOfRounds.value);

    if (numberOfRounds <= 0){
        lock();
        return;
    }

    round ++;
    let computerSelection = computerPlay()

    let result = playRound(playerSelection, computerSelection);
    $results.innerText = result;

    if (result.indexOf('Win') != -1){
        playerScore++;
    }
    if (result.indexOf('Lose') != -1){
        computerScore++;
    }
    
	if (round === numberOfRounds){
        $finalScore.classList.remove("hidden");
        let finalResults = finalScore(playerScore, computerScore);
        $finalScore.innerText = finalResults;
		lock();
    }
}


$startGame.onclick = newGame;
