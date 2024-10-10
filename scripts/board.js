// Game Board
// Player Load, Cactus Load, Floor Load

// 1. Draw a Canvas (Board)
// if not using defer write: window.addEventListener('load', prepareCanvas); and comment out the function call below.
import { FRAME_RATE, GAME_HEIGHT, GAME_WIDTH } from "./config.js";
import Player from "./player.js";
import Floor from "./floor.js";
let player;
let floor;
let context;
function gameStart(){ //init means initialize, name changed from init to gameStart
    prepareCanvas();
    loadSprites();
    gameLoop();
}
gameStart();
function prepareCanvas(){
    const canvas = document.querySelector('#canvas');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    context = canvas.getContext('2d');
    // canvas.style = 'border: 1px solid black'; instead of this use css file
}
// prepareCanvas();
function loadSprites(){
    player = new Player();
    floor = new Floor();
}
function gameLoop(){
    clearScreen();
    player.draw(context);
    floor.draw(context);
    setTimeout(function(){
        requestAnimationFrame(gameLoop);
    }, FRAME_RATE);
}
function clearScreen(){
    context.fillStyle = 'white';
    context.fillRect(0,0, GAME_WIDTH, GAME_HEIGHT);
}