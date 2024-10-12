import { GAME_HEIGHT, GAME_WIDTH, GRAVITY } from "./config.js";

export default class Player {
    constructor() { //constructor is called when object is created
        this.x = 10; //this refers to current calling object
        this.h = 94;
        this.w = 88;
        this.y = GAME_HEIGHT - (this.h + 30);
        this.image = new Image();
        // this.image.src = '../assets/still.png';
        this.runImages = ['../assets/run1.png', '../assets/run2.png'];
        this.index = 0;
        this.image.src = this.runImages[this.index];
        this.isJumping = false;
    }
    // In order to print the image we can create a funciton for this
    jump(){
        if(!this.isJumping){
            this.y = this.y - (GAME_HEIGHT-this.h);
            this.isJumping=true;
        }
    }
    fall(){
        const FLOOR = GAME_HEIGHT - this.h;
        if(this.y >= FLOOR){
            this.isJumping = false;
            return;
        }
        else{
            this.y = this.y + GRAVITY;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.w, this.h);
        this.walkAnimation();
        this.fall();
    }
    walkAnimation(){
        if(this.index >= 2)
        {
            this.index = 0;
        }
        this.image.src = this.runImages[this.index];
        this.index++;
    }
}