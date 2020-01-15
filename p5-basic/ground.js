class Ground {

    constructor() {
        this.w = width;
        this.h = 14;
        this.x = width;
        this.y = height-this.h;
    }

    move() {
        this.x -= 16;
        if(this.x==0){
        ground.push(new Ground());
    }
    }

    show() {
        image(bImg, this.x, this.y, this.w, this.h);
    }

}