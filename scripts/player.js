import { GAME_HEIGHT, GAME_WIDTH } from "./config.js";

export default class Player {
    constructor() { //constructor is called when object is created
        this.x = 10; //this refers to current calling object
        this.h = 94;
        this.w = 88;
        this.y = GAME_HEIGHT - (this.h + 30);
        this.image = new Image();
        this.image.src = '../assets/still.png';
    }
    // In order to print the image we can create a funciton for this
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
}