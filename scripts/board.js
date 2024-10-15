// Game Board
// Player Load, Cactus Load, Floor Load

// 1. Draw a Canvas (Board)
// if not using defer write: window.addEventListener('load', prepareCanvas); and comment out the function call below.
import { FRAME_RATE, GAME_HEIGHT, GAME_WIDTH, MAX, MIN } from "./config.js";
import Player from "./player.js";
import Floor from "./floor.js";
import Cactus from "./cactus.js";

let player;
let floor;
let context;
function gameStart() { //init means initialize, name changed from init to gameStart
    bindEvent();
    prepareCanvas();
    loadSprites();
    gameLoop();
}
function bindEvent() {
    window.addEventListener('keyup', doJump);
}
function doJump() {
    // console.log('Do Jumbp call event', event.code);
    if (event.code === 'Space') {
        player.jump();
    }
}
let cactusArray = [];//this really was a frustrating, becasue if you don't declare this here gamestart will call loadsprites that will call loadcactus so this array won't be declare tehn, therefore it is important to declare array here.
let delay = 0;
gameStart();
function prepareCanvas() {
    const canvas = document.querySelector('#canvas');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    context = canvas.getContext('2d');
    // canvas.style = 'border: 1px solid black'; instead of this use css file
}
// prepareCanvas();
function loadSprites() {
    player = new Player();
    floor = new Floor();
    loadCactus(); //since we want may cactus therefore we'll create a funciton for it (also we wannt it's random generation)
}

function loadCactus() {
    const cactusArr = ['../assets/cactus1.png', '../assets/cactus2.png', '../assets/cactus3.png'];
    let GAP = 1.5;
    for (var c of cactusArr) {
        const cactus = new Cactus(GAME_WIDTH * GAP, GAME_HEIGHT, 48, 100, c);
        GAP++;
        cactusArray.push(cactus);
    }
}
function generateRandomNumber() {
    return Math.floor(Math.random() * MAX - MIN + 1) + MIN;
}
function generateRandomCactus() {
    if (delay >= 70) {
        delay = 0;
        setTimeout(() => {
            loadCactus();
        }, generateRandomNumber());
    }
    delay++;
}
function printCactus(context) {
    // console.log('Cactus array size', cactusArray.length);
    for (let cactus of cactusArray) {
        cactus.draw(context);
    }
}
function removeUnusedCactus() {
    cactusArray = cactusArray.filter(c => !c.isOutOfScreen());
}
function printGameOver() {
    context.font = 'bold 48px serif';
    context.fillStyle = 'grey';
    context.fillText('Game Over', GAME_WIDTH / 3, GAME_HEIGHT / 2);
}

function gameLoop() {
    clearScreen();
    if (isCollisionHappens()) {
        printGameOver();
        player.draw(context);
        floor.draw(context);
        printCactus(context);
        generateRandomCactus();
        removeUnusedCactus();
    }
    else {
        player.draw(context);
        floor.draw(context);
        printCactus(context);
        generateRandomCactus();
        removeUnusedCactus();
        setTimeout(function () {
            requestAnimationFrame(gameLoop);
        }, FRAME_RATE);
    }
}
function clearScreen() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}
function isCollide(cactus) {
    return player.x < cactus.x + cactus.w && player.x + player.w > cactus.x && player.y < cactus.y + cactus.h && player.y + player.h > cactus.y
}
function isCollisionHappens() {
    return cactusArray.some(c=>isCollide(c)); //this single line is equivalent to the above written code.
    // for(let cactus of cactusArray){
    //     if(isCollide(cactus)){
    //         return true;
    //     }
    // }
    // return false;
}