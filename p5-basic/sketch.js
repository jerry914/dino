var x, y;
var wave;
var wave2;
var button;
var playing = false;

let box, drum, myPart;
let jump,ach,die;
let dindo,hoo;
let boxPat = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,1, 0, 0, 0];
let drumPat = [1, 2, 0, 2, 1, 0, 1, 2, 0, 2, 1, 0, 1, 0,0, 0];
let jumpPat = [1, 3,3, 1, 1, 2, 2, 0, 0, 1, 1, 3, 9, 3,2, 2];
let achPat = [1, 0, 0, 0, 0, 0,  0, 0,1, 1, 1, 1, 0, 0, 1, 0];
let diePat = [1, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
let onePat = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]

let filter = [];
let filterFreq, filterRes;

let analyzer;

let noise;
let noiseLooper;
let zee, fft;

let uImg;
let uImg2;
let tImg;
let dinoJump;
let aniCount=0 ;

let ground = [];
let trees = [];
let bImg;

let dino;

let angle = 0;
particles = [];
let angleValue = 1;
let radderValue = -0.05;
let sizeValue = 200;
let sinValue = -1;
let colorValue = 10;
let axValue = 0;
let ayValue = 0;
let flowerPlaying = false;
let groundPlaying = false;
let dinoPlaying = false;
let zeePlaying = false;

function preload() {
	uImg=loadImage('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/dino1.png');
	uImg2=loadImage('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/dino2.png');
	dinoJump=loadImage('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/dinoJump.png');

	bImg = loadImage('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/ground.png');
	tImg = loadImage('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/tree.png');

	box = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/hanning.mp3');
	drum = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/kick.wav');
	jump = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/jump.mp3');
	ach = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/achieve.wav');
	die = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/demise.wav');

	dindo = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/dindo.mp3');
	hoo = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/hoo.mp3');

	zee = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/zee.mp3');
}


function setup() {
	createCanvas(windowWidth,windowHeight);
	setupOsc(12000, 3334);
	dino = new Dino();
	analyzer = new p5.Amplitude();

	analyzer.setInput(myPart);
	colorMode(HSB, 255);
}

function draw() {
	let rms = analyzer.getLevel();
	if(rms>0.05 && !flowerPlaying)
		background('#FFE9E4');
	else{
		background('#08192D');
	}
		
	if(zeePlaying){
		noFill();
		// fill(255);
		let spectrum = fft.analyze();

		beginShape();
		stroke(255);
		for (i = 0; i < spectrum.length; i++) {
			vertex(map(i,0,spectrum.length,0,width*2), map(spectrum[i], 0, 255, height/2, height/4));
		}
		endShape();
		fill(255,map(rms,0,0.1,0,255));
		rect(0,0,width,height);
	}
	
	for (let g of ground) {
		g.move();
		g.show();
	}
	for (let t of trees) {
		t.move();
		t.show();
		if (dino.hits(t)) {
			playDie();
		}
	}
	if(dinoPlaying){
		dino.show();
		dino.move();
	}
	
	aniCount+=1;

	if(flowerPlaying){
		generateParticle();
	if (angle < PI * 2) {
		angle += angleValue;
	} else
		angle = 0;
	}
}


function toggle() {
	if (!playing) {
		wave = new p5.Oscillator();
		wave.setType('square');
		wave2 = new p5.Oscillator();
		wave2.setType('square');
		wave.start();
		wave.amp(0);
		wave2.start();
		wave2.amp(0);

		
		myPart = new p5.Part();
		myPart.setBPM(60);
		myPart.loop();
		
		for(var i=0;i<5;i++){
			filter[i] = new p5.LowPass();
		}
		
		box.disconnect();
		box.connect(filter[0]);
		drum.disconnect();
		drum.connect(filter[1]);
		jump.disconnect();
		jump.connect(filter[2]);
		ach.disconnect();
		ach.connect(filter[3]);
		die.disconnect();
		die.connect(filter[4]);
		masterVolume(0.3);
		// noise = new p5.Noise('pink');
		// noiseLooper = new p5.SoundLoop(function(timeFromNow){
		// 	noise.start();
		// 	noise.amp(0.3);
		// 	noise.amp(0,0.2);
		// 	background(255 * (noiseLooper.iterations % 2));
		// }, 2);
		// noiseLooper.start();

		playing = true;
	} else {
		wave.amp(0, 1);
		playing = false;
	}
}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
	
	if (address == '/test') {
		x = value[0];
		y = value[1];
	}
	else{
		var storeAdd = address.split('/');
		if (storeAdd[2].search('push')>=0){
			if(value == 0){
				stopNote();
			}
			else if(value == 1){
				if(storeAdd[1]==1){
					playNote(int(storeAdd[2].replace('push',''))+int(-48));
				}
				else{
					playNote(int(storeAdd[2].replace('push','')));
				}
			}
		}
		else if (storeAdd[2].search('toggle')>=0){
			if(int(storeAdd[2].replace('toggle',''))==22){
				if(value == 0){
					zeePlaying = false;
				}
				else{
					zee.play();
					fft = new p5.FFT();
					fft.setInput(zee);
					zeePlaying = true;
				}
			}
			else if(int(storeAdd[2].replace('toggle',''))==23){
				if(value==0){
					for (let g of ground) {
						ground.splice(g,1);
					}
					groundPlaying = false;
				}
				else{
					groundPlaying = true;
					ground.push(new Ground ());
				}
			}
			else if(int(storeAdd[2].replace('toggle',''))==24){
				if(value==0){
					dinoPlaying=false;
				}
				else{
					dinoPlaying=true;
				}
			}
			else if(int(storeAdd[2].replace('toggle',''))==25){
				if(value==0){
					flowerPlaying=false;
				}
				else{
					flowerPlaying=true;
				}
			} 
			else if(int(storeAdd[2].replace('toggle',''))==26){
				if(value==0){
					axValue = 0;
				}
				else{
					axValue = 1;
				}
			}
			
			else{
				if(value == 0){
					stopPhrase(int(storeAdd[2].replace('toggle','')));
				}
				else{
					playPhrase(int(storeAdd[2].replace('toggle','')));
				}
			}
		}
		else if (storeAdd[2].search('fader')>=0){
			if(int(storeAdd[2].replace('fader','')==8)){
				changeVolume(value);
			}
			else if(int(storeAdd[2].replace('fader','')<=5)){
				soundFilter(value,int(storeAdd[2].replace('fader','')));
				switch(int(storeAdd[2].replace('fader',''))){
					case 1:
						angleValue = map(value,0,1,0,0.1);
						break;
					case 2:
						radderValue = map(value,0,1,-0.05,0.05);
						break;
					case 3:
						sizeValue = map(value,0,1,0,400);
						break;
					case 4:
						sinValue = map(value,0,1,-1,1);
						break;
					case 5:
						colorValue = map(value,0,1,0,255);
						break;
					default:
						break;
				}
			}
		}
		else if (storeAdd[2].search('nav')>=0){
			if(int(storeAdd[2].replace('2nav',''))==1){
				angleValue = 1;
			}
			else{
				if(value == 0){
					stopNote();
				}
				else if(value == 1){
					playNote(int(storeAdd[2].replace('2nav','')));
				}
			}
		}
		else if (storeAdd[2].search('rotary')>=0){
			soundPan(value);
		}
	}
	
}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {	
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}