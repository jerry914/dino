// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/147-chrome-dinosaur.html
// https://youtu.be/l0HoJHc-63Q

// Google Chrome Dinosaur Game (Unicorn, run!)
// https://editor.p5js.org/codingtrain/sketches/v3thq2uhk

class Dino {

    constructor() {
    this.r = 100;
    this.x = width/3;
    this.y = height/2;
    this.vy = 0;
    this.gravity = 3;
    this.img=uImg;
    
    }

    jump(key) {
    if (this.y == height/2) {
        this.vy = -(key*2);
    }
    
    }

    hits(train) {
    let x1 = this.x + this.r * 0.5;
    let y1 = this.y + this.r * 0.5;
    let x2 = train.x + train.r * 0.5;
    let y2 = train.y + train.r * 0.5;
    return collideCircleCircle(x1, y1, this.r, x2, y2, train.r);
    }

    move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height/2);
    if(aniCount%6<=2){
        this.img=uImg;
    }
    else{
        this.img=uImg2;
    }
    /*if(aniCount%6==0){
        this.img=uImg;
    }
    else{
        this.img=uImg2;
    }*/
    if(this.y<height/2){
        this.img=dinoJump;
    }
    }

    show() {
    // if(gameOvered==1){
    //     this.img=died;
    //     noLoop();
    // }
    
    image(this.img, this.x, this.y, this.r, this.r);
    // fill(255, 50);
    // ellipseMode(CORNER);
    // ellipse(this.x, this.y, this.r, this.r);  
    }
}