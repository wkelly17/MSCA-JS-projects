let root = document.documentElement;
let boardsize = 5; //? how big do you want the gameboard?
let boardPx = 500;
let gridSize = boardPx / boardsize;
const gameboard = document.querySelector('#gameboard');
const messages = document.querySelector('#messages');
let playerPosition = 0;
let computerPosition = 0;
let gameOver = false;
let gameIsRunning = false;

root.style.setProperty(`--boardsize`, boardsize);
root.style.setProperty(`--boardPx`, boardPx);
root.style.setProperty(`--gridSize`, `${gridSize}px`);

for (let i = boardsize * boardsize; i > 0; i--) {
  let tile = document.createElement('div');
  tile.classList.add('tile', `tile${i}`);
  tile.addEventListener('click', setPlayer);
  gameboard.appendChild(tile);
}
// gameboard.addEventListener('click', setPlayer, { once: true });

function setPlayer(event) {
  console.dir(event.target);
  playerPosition = event.target;
  if (confirm('Is this your final choice?')) {
    playerPosition.classList.add('ship');
    let tiles = document.querySelectorAll('.tile');
    computerPosition = tiles[getRandomInt(tiles.length)];

    tiles.forEach((tile) => {
      tile.removeEventListener('click', setPlayer);
      tile.addEventListener('click', playerPlay, { once: true });
    });
  }
}

function playerPlay(event) {
  let player = 'player';
  if (gameOver || gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  let tile = event.target;
  tile.classList.add('shot');
  if (tile == computerPosition) {
    tile.classList.add('deadShip', 'sink');
    tile.classList.remove('shot');
    console.log('you win!');
    gameOver = true;
  } else {
    setTimeout(() => {
      computerPlay();
    }, 350);
  }
  displayMessage(player, gameOver);
}
function computerPlay() {
  let player = 'computer';
  if (gameOver) {
    return;
  }
  let availableTiles = [...document.querySelectorAll('.tile')].filter(
    (tile) => !tile.classList.contains('computer-shot')
  );
  let shot = availableTiles[getRandomInt(availableTiles.length)];
  shot.classList.add('computer-shot');

  if (shot == playerPosition) {
    shot.classList.remove('computer-shot');
    shot.classList.add('deadShip', 'sink');
    computerPosition.classList.add('ship');
    alert('computer wins');
    gameOver = true;
    // displayMessage(player, gameOver);
  }
  displayMessage(player, gameOver);
  gameIsRunning = false;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function displayMessage(player, gameOver) {
  let li = document.createElement('li');
  if (gameOver) {
    li.innerText = `${player} hit and won!!`;
  } else {
    li.innerText = `${player} missed!!`;
  }
  messages.appendChild(li);
}
