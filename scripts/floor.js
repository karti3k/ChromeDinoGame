import { GAME_HEIGHT } from "./config.js";
export default class Floor{
    constructor(){
        this.x = 0;
        this.y = GAME_HEIGHT - 60;
        this.w = 2400;
        this.h = 24;
        this.image = new Image();
        this.image.src = '../assets/floor.png';
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
}