class Particle {

    constructor() {
        this.x = cos(angle)  * sizeValue + windowWidth / 2;
        this.y = sin(angle) * sizeValue + windowHeight / 2;
        this.vx = sin(angle)*(sinValue);
        this.vy = cos(angle);
        // this.ax = (-sin(angle))/100;
        // this.ay = cos(angle)/100;
        this.ax = axValue;
        this.ay = 0;
        // this.vx = (-sin(angle)) / 10;
        // this.vy = cos(angle) / 10;
        // this.ax = random(-0.01, 0.01);
        // this.ay = random(-0.01, 0.01);
        this.radiux = 10;
        this.radder = radderValue;


        this.alpha = 255;

        // this.color = random(0,255);
    }

    finished() {
        return this.alpha < 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx += this.ax;
        this.vy += this.ay;
        this.alpha -= 0.5;
        this.radiux += this.radder;
    }

    show() {
        noStroke();
        fill(random(colorValue, colorValue+50),140 , 200, this.alpha);
        rect(this.x, this.y, this.radiux,this.radiux);
    }

}

function generateParticle() {
    for (let i = 0; i < 1; i++) {
        let p = new Particle();
        particles.push(p);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) {
        particles.splice(i, 1);
        }
    }
}