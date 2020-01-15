// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/147-chrome-dinosaur.html
// https://youtu.be/l0HoJHc-63Q

// Google Chrome Dinosaur Game (Unicorn, run!)
// https://editor.p5js.org/codingtrain/sketches/v3thq2uhk

class Tree {

    constructor() {
        this.r = 75;
        this.x = width;
        this.y = height/2 + this.r/2;
    }

    move() {
        this.x -= 16;
    }

    show() {
        image(tImg, this.x, this.y, this.r/2, this.r);
    }

}