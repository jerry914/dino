class Ground {

    constructor() {
        this.w = width;
        this.h = 44;
        this.x = width;
        this.y = height/2+this.h;
    }

    move() {
        this.x -= 16;
        if(this.x==0 && groundPlaying){
            ground.push(new Ground());
        }
        if (this.x==-this.w) {
            ground.splice(1, 1);
        }
    }

    show() {
        image(bImg, this.x, this.y, this.w, this.h);
    }

}