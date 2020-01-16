class Cloud {

    constructor() {
        this.r = 40;
        this.h = 40; 
        this.x = width;
        this.y = this.r;
    }

    move() {
        this.x -= 8  ;
    }

    show() {
        image(cImg, this.x, this.y+this.h, width, this.r);
    }

}